// Verifies the built site (dist/) for the canonical-source consolidation.
//
//   node scripts/verify-consolidation.mjs [--dist dist] [--baseline <dir>]
//
// --baseline points at a build of the pre-consolidation commit (cfd1d4d). When
// given, every text node of each original page must still occur at least as
// often as before, apart from the removed assessment form and the <title>. Without it the content
// comparison is reported as SKIPPED and the run fails.
//
// Intentionally absent: /thank-you/ (there is no form to land from).
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const DIST = arg("--dist", "dist");
const BASELINE = arg("--baseline", null);

const ORIGIN = "https://microscope-environmental-cleaning.vercel.app";
const TEL = "tel:+12395656557";
const MAILTO = "mailto:info@microscopeenvironmental.com";

const BASE_ROUTES = [
  "/", "/about/", "/blog/", "/blog/what-is-cirs/", "/blog/what-is-ermi/", "/contact/",
  "/healthcare-professionals/", "/service-areas/", "/services/",
  "/services/environmental-cleaning/", "/services/cirs-cleaning/", "/services/ermi-cleaning/",
  "/services/post-remediation-verification/", "/services/air-sampling/",
  "/services/moisture-investigation/", "/services/mold-remediation/",
  "/services/water-flood-damage/", "/services/hurricane-storm-cleanup/",
];
const NEW_ROUTES = [
  "/privacy/", "/service-areas/fort-myers-fl/", "/service-areas/naples-fl/",
  "/service-areas/bonita-springs-fl/", "/service-areas/sarasota-fl/",
];
const FORM_ROUTES = BASE_ROUTES.filter(
  (r) => r === "/contact/" || r === "/healthcare-professionals/" || /^\/services\/.+/.test(r),
);

// Text that existed only inside the removed assessment form.
const REMOVED_FORM_TEXT = new Set([
  "Full name", "Phone", "Email", "Property city / area", "What brings you here? (optional)",
  "CIRS / mold illness", "Physician-directed protocol", "Elevated ERMI / HERTSMI-2",
  "Post-remediation verification", "Water damage", "Not sure yet",
  "Do you have lab reports or a physician order? (optional)", "Select one",
  "Yes — I have lab reports (ERMI/EMMA/HERTSMI-2)", "Yes — I have a physician order", "Both",
  "No / not yet", "How can we help?", "Request my assessment", "Prefer to talk? Call",
  ". We respond to every request personally.",
]);

// Forbidden in every built text file.
const FORBIDDEN_ANYWHERE = [
  [/formspree/i, "Formspree endpoint"],
  [/REPLACE_WITH/, "placeholder endpoint"],
  [/\{\{[A-Z_]+\}\}/, "unfilled template token"],
  [/relay\.brandhyve\.com|formRelayUrl|ghlWebhook/i, "relay/webhook endpoint"],
  [/data-cms|\/admin\//, "retired CMS reference"],
  [/https?:\/\/(www\.)?microscopeenvironmental\.com/i, "assumed customer domain"],
  [/fonts\.(googleapis|gstatic)\.com/, "third-party font CDN"],
];
// Forbidden in pages and public text files (too generic to scan in JS/CSS).
const FORBIDDEN_CONTENT = [
  [/123 Professional/i, "fabricated street"],
  [/\b33901\b/, "fabricated zip"],
  [/26\.6406|81\.8723|GeoCoordinates|"latitude"|"longitude"/, "fabricated geo"],
  [/aggregateRating|ratingValue|reviewCount/, "fabricated rating"],
  [/PLACEHOLDER|cid=0|placeid=|gbpPlaceId/, "placeholder GBP"],
  [/team-placeholder|Microscope Team/, "placeholder team"],
  [/streetAddress|postalCode/, "street-level address"],
];

const failures = [];
const fail = (msg) => failures.push(msg);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const routeFile = (root, route) =>
  route === "/404" ? join(root, "404.html") : join(root, route, "index.html");
const decode = (t) =>
  t.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ");
const norm = (t) => decode(t).replace(/\s+/g, " ").trim();
const stripNonContent = (html) =>
  html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");
const bodyOf = (html) => stripNonContent(html.slice(html.search(/<body\b/i)));
const textNodes = (html) => bodyOf(html).split(/<[^>]+>/).map(norm).filter(Boolean);
// Tags become "\u0001" so a phrase can never match across an element boundary.
const flatText = (html) => norm(bodyOf(html).replace(/<[^>]+>/g, "\u0001"));
const count = (haystack, needle) => haystack.split(needle).length - 1;
const attrs = (html, re) => [...html.matchAll(re)].map((m) => decode(m[1]));

if (!existsSync(DIST)) {
  console.error(`FAIL: ${DIST} not found — run the build first.`);
  process.exit(1);
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const rel = (f) => relative(DIST, f).replace(/\\/g, "/");

// 1. Routes
for (const r of [...BASE_ROUTES, ...NEW_ROUTES, "/404"]) {
  if (!existsSync(routeFile(DIST, r))) fail(`missing route ${r}`);
}
if (existsSync(join(DIST, "thank-you"))) fail("unexpected /thank-you/ route");
const expectedHtml = BASE_ROUTES.length + NEW_ROUTES.length + 1;
if (htmlFiles.length !== expectedHtml) {
  fail(`expected ${expectedHtml} HTML files, found ${htmlFiles.length}: ${htmlFiles.map(rel).join(", ")}`);
}

// 2. Per-page checks
const indexing = [];
const externalHosts = new Set();
let telCount = 0;
let mailtoCount = 0;
let localRefs = 0;
for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8");
  const page = rel(f);

  for (const tag of ["form", "input", "textarea", "select", "option", "fieldset"]) {
    if (new RegExp(`<${tag}\\b`, "i").test(html)) fail(`${page}: <${tag}> element present`);
  }
  if (/type\s*=\s*["']?submit/i.test(html)) fail(`${page}: submit control present`);
  if (/\b(action|formaction)\s*=/i.test(html)) fail(`${page}: action attribute present`);
  if (/\b(fetch|XMLHttpRequest|sendBeacon)\b/.test(html)) fail(`${page}: script sender present`);

  const hrefs = attrs(html, /\bhref\s*=\s*"([^"]*)"/gi);
  const srcs = attrs(html, /\bsrc\s*=\s*"([^"]*)"/gi);
  for (const h of hrefs) {
    if (/^tel:/i.test(h)) {
      telCount++;
      if (h !== TEL) fail(`${page}: invalid tel href ${h}`);
    } else if (/^mailto:/i.test(h)) {
      mailtoCount++;
      if (h !== MAILTO) fail(`${page}: unexpected mailto ${h}`);
    }
  }
  for (const ref of [...hrefs, ...srcs]) {
    if (/^https?:\/\//i.test(ref)) {
      if (!ref.startsWith(ORIGIN)) externalHosts.add(new URL(ref).host);
      continue;
    }
    if (!ref.startsWith("/")) continue; // tel:, mailto:, #fragment
    localRefs++;
    const path = decodeURI(ref.split(/[?#]/)[0]);
    const target = join(DIST, path);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, "index.html")));
    if (!ok) fail(`${page}: broken local reference ${ref}`);
  }

  const canon = attrs(html, /<link\s+rel="canonical"\s+href="([^"]*)"/gi);
  if (canon.length !== 1 || !canon[0].startsWith(`${ORIGIN}/`)) fail(`${page}: canonical ${JSON.stringify(canon)}`);
  for (const u of attrs(html, /<meta\s+property="og:(?:url|image)"\s+content="([^"]*)"/gi)) {
    if (!u.startsWith(`${ORIGIN}/`)) fail(`${page}: og url off review origin ${u}`);
  }
  const robots = attrs(html, /<meta\s+name="robots"\s+content="([^"]*)"/gi);
  indexing.push(`${page}: robots=${robots[0] ?? "(none — indexable)"} canonical=${canon[0]}`);

  if (!flatText(html).includes("(239) 565-6557")) fail(`${page}: visible phone missing`);
}
if (externalHosts.size) fail(`external resource/link hosts: ${[...externalHosts].join(", ")}`);

// 3. Replacement panel on every former form page
for (const r of FORM_ROUTES) {
  const f = routeFile(DIST, r);
  if (!existsSync(f)) continue;
  const html = readFileSync(f, "utf8");
  const text = flatText(html);
  for (const needle of [
    "Online assessment requests are not available on this website.",
    "Call (239) 565-6557",
    "Email info@microscopeenvironmental.com",
    "Please do not send medical records",
  ]) {
    if (!text.includes(needle)) fail(`${r}: contact panel text missing: ${needle}`);
  }
  if (!html.includes(`href="${TEL}"`) || !html.includes(`href="${MAILTO}"`)) fail(`${r}: contact panel links missing`);
  if (/\b(secure|encrypted|HIPAA|confidential)\b/i.test(text.replace(/not a secure way/gi, ""))) {
    fail(`${r}: wording implies a secure/compliant channel`);
  }
}

// 4. Forbidden artifacts
const TEXT_EXT = new Set([".html", ".txt", ".xml", ".json", ".webmanifest", ".js", ".css", ".svg"]);
const CONTENT_EXT = new Set([".html", ".txt", ".xml", ".json", ".webmanifest"]);
for (const f of files) {
  const ext = extname(f);
  if (!TEXT_EXT.has(ext)) continue;
  const body = readFileSync(f, "utf8");
  const rules = CONTENT_EXT.has(ext) ? [...FORBIDDEN_ANYWHERE, ...FORBIDDEN_CONTENT] : FORBIDDEN_ANYWHERE;
  for (const [re, label] of rules) {
    const m = body.match(re);
    if (m) fail(`${rel(f)}: ${label} (${m[0]})`);
  }
}

// 5. Sitemap, robots, manifest
const sitemapLocs = [];
for (const f of files.filter((x) => /sitemap.*\.xml$/.test(x))) {
  for (const loc of attrs(readFileSync(f, "utf8"), /<loc>([^<]*)<\/loc>/g)) {
    sitemapLocs.push(loc);
    if (!loc.startsWith(`${ORIGIN}/`)) fail(`${rel(f)}: sitemap loc off review origin ${loc}`);
  }
}
if (!sitemapLocs.length) fail("no sitemap locs found");
for (const r of [...BASE_ROUTES, ...NEW_ROUTES]) {
  if (!sitemapLocs.includes(`${ORIGIN}${r}`)) fail(`sitemap missing ${r}`);
}
const robotsPath = join(DIST, "robots.txt");
if (!existsSync(robotsPath)) fail("robots.txt missing");
else {
  const sm = readFileSync(robotsPath, "utf8").match(/^Sitemap:\s*(\S+)/m);
  if (!sm || sm[1] !== `${ORIGIN}/sitemap-index.xml`) fail(`robots.txt sitemap line: ${sm?.[1]}`);
}
for (const f of ["llms.txt", "site.webmanifest", "favicon.svg", "logo.svg"]) {
  if (!existsSync(join(DIST, f))) fail(`${f} missing`);
}
if (existsSync(join(DIST, "site.webmanifest"))) {
  const manifest = JSON.parse(readFileSync(join(DIST, "site.webmanifest"), "utf8"));
  for (const icon of manifest.icons ?? []) {
    if (!existsSync(join(DIST, icon.src))) fail(`manifest icon missing ${icon.src}`);
  }
}

// 6. Original page content preserved
let compared = 0;
const expectedLosses = new Map();
if (!BASELINE) {
  fail("content comparison SKIPPED — pass --baseline <build of cfd1d4d>");
} else {
  for (const r of BASE_ROUTES) {
    const basePath = routeFile(BASELINE, r);
    const newPath = routeFile(DIST, r);
    if (!existsSync(basePath)) { fail(`baseline missing ${r}`); continue; }
    if (!existsSync(newPath)) continue;
    const baseHtml = readFileSync(basePath, "utf8");
    const after = flatText(readFileSync(newPath, "utf8"));
    compared++;
    // The removed form is judged on its own so its labels cannot mask, or be
    // mistaken for, a loss elsewhere on the page.
    const forms = baseHtml.match(/<form\b[\s\S]*?<\/form>/gi) ?? [];
    if (forms.length !== (FORM_ROUTES.includes(r) ? 1 : 0)) fail(`${r}: baseline has ${forms.length} forms`);
    for (const node of new Set(forms.flatMap((f) => textNodes(`<body>${f}`)))) {
      if (REMOVED_FORM_TEXT.has(node)) expectedLosses.set(node, (expectedLosses.get(node) ?? 0) + 1);
      else if (!after.includes(node)) fail(`${r}: unlisted form text lost: ${JSON.stringify(node)}`);
    }
    const outsideForm = forms.reduce((html, f) => html.replace(f, () => "<hr>"), baseHtml);
    const before = flatText(outsideForm);
    for (const node of new Set(textNodes(outsideForm))) {
      if (count(after, node) < count(before, node)) fail(`${r}: original text lost: ${JSON.stringify(node)}`);
    }
  }
  if (compared !== BASE_ROUTES.length) fail(`compared ${compared}/${BASE_ROUTES.length} original pages`);
}

console.log(`HTML files: ${htmlFiles.length} | local refs checked: ${localRefs} | tel links: ${telCount} | mailto links: ${mailtoCount} | sitemap locs: ${sitemapLocs.length}`);
console.log(`Original pages compared against baseline: ${compared}/${BASE_ROUTES.length}`);
console.log(`Expected losses (removed form only): ${expectedLosses.size} distinct strings`);
for (const [node, n] of expectedLosses) console.log(`  - ${JSON.stringify(node)} x${n}`);
console.log("Indexing / canonical per page:");
for (const line of indexing.sort()) console.log(`  ${line}`);
if (failures.length) {
  console.log(`\nFAIL (${failures.length})`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log("\nPASS");
