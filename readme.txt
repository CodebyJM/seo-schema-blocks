=== SEO Schema Blocks ===
Contributors: codebyjm
Tags: gutenberg, blocks, schema, json-ld, seo
Requires at least: 6.3
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==
Create search-friendly structured data right inside the block editor. SEO Schema Blocks ships a growing suite of schema-focused blocks so editors can add Local Business, Aggregate Rating, and FAQ JSON-LD without touching code.

= Features =
* **SEO Local Business Schema block** – Collects business details in the editor and outputs LocalBusiness JSON-LD via a render callback.
* **SEO Rating Schema block** – Adds AggregateRating JSON-LD for any product, business, or service.
* **SEO FAQ Schema block** – Provides an accessible accordion on the front end plus matching FAQPage JSON-LD. Includes editor styling controls (accent/background/border colors).
* **Request Center** – A lightweight Settings page in wp-admin where site owners can submit feature ideas or support notes. Entries are stored locally and emailed to the developer for follow-up.
* Built with block.json metadata, `@wordpress/scripts`, and WordPress coding standards so it is ready for the plugin directory.

== Installation ==
1. Upload the `seo-schema-blocks` folder to the `/wp-content/plugins/` directory or install via the Plugins screen.
2. Activate the plugin through the "Plugins" screen in WordPress.
3. Run `npm install && npm run build` before packaging if you are building from source.
4. Insert the SEO schema blocks from the block inserter and configure their settings. Structured data is injected automatically on the front end.

== Blocks ==
* **SEO Local Business Schema** (`gsb/local-business`) – Dynamic block that outputs LocalBusiness JSON-LD.
* **SEO Rating Schema** (`gsb/rating-schema`) – Dynamic block that outputs AggregateRating JSON-LD.
* **SEO FAQ Schema** (`gsb/faq-schema`) – Accordion-style FAQ markup plus FAQPage JSON-LD.

== Frequently Asked Questions ==

= Do these blocks output anything visually on the front end? =
The Local Business and Rating blocks only output JSON-LD `<script>` tags. The FAQ block outputs both an accessible accordion and the matching JSON-LD.

= Where do feedback requests go? =
Requests submitted via Settings → SEO Schema Blocks are stored locally (in the `gsb_requests` option) and emailed to codebyjm@gmail.com for follow-up.

= Can I customize the FAQ styling? =
Yes. In the block sidebar you can pick accent, background, and border colors. The accordion adopts those colors both in the editor and on the front end.

== Changelog ==
= 0.1.0 =
* Initial release with Local Business, Rating, and FAQ schema blocks plus the request settings page.
