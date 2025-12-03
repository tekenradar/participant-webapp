# News Feature Documentation

## Overview

The news feature allows you to create and manage news articles (nieuws) for the Tekenradar participant webapp. Articles are written in MDX format and stored in the `content/{locale}/nieuws/` directory. The system automatically processes these files and displays them on the news pages and landing page (top 3).

## File Structure

News articles should be placed in:

```
content/{locale}/nieuws/{date}-{slug}.mdx
```

Where:

- `{locale}` is the language code (e.g., `nl` for Dutch)
- `{date}` is the publication date in `YYYY-MM-DD` format
- `{slug}` is a descriptive name for the article (optional, but recommended)

Though the file name could be anything, it is recommended to use the above pattern to ensure consistency and ease of use.

**Example:**

```
content/nl/nieuws/2025-07-03-tick-bites-increase.mdx
```

## Front Matter Options

All news articles must include front matter at the top of the file, enclosed by `---`. Here are all available options:

### Required Fields

#### `title` (string, max 99 characters)

The title of the news article. This will be displayed as the main heading on the article page and in listings.

```yaml
title: Aantal tekenbeten blijft verhoogd na sterke toename Hemelvaart
```

#### `date` (ISO date string)

The publication date of the article. Must be in ISO 8601 format. Articles with future dates are treated as drafts and won't be displayed unless draft mode is enabled.

```yaml
date: 2025-07-03T07:00:00.000Z
```

**Note:** The date determines:

- Whether the article is published (only shown if date < current date, unless draft mode is enabled)
- The sorting order (newest first)
- The year grouping on the news overview page

### Optional Fields

#### `teaserText` (string)

A short summary or excerpt of the article. This is displayed on the news overview page and in article listings. If omitted, no teaser text will be shown.

```yaml
teaserText: Vanaf het Hemelvaartweekend nam het aantal tekenbeetmeldingen dat via Tekenradar.nl werd doorgegeven sterk toe.
```

#### `teaserImage` (image path)

A relative path to an image file that will be used as the teaser image. This image appears in article listings and on the news overview page.

```yaml
teaserImage: ./images/20250702-teaser.jpg
```

**Note:** Image paths are relative to the MDX file location. Images are automatically processed and optimized by Velite.

#### `teaserImagePlacement` (enum: `'top'` | `'left'`)

Controls the placement of the teaser image in article listings:

- `'top'`: Image appears above the text (typically used for the first article)
- `'left'`: Image appears to the left of the text (default for subsequent articles)

```yaml
teaserImagePlacement: top
```

**Note:** If not specified, the system defaults to `'top'` for the first article and `'left'` for others. If defined, the image placement will always be used also for the most recent article of a year.

#### `teaserImageCredits` (string)

Credits or attribution for the teaser image. Displayed alongside the image.

```yaml
teaserImageCredits: © John Doe
```

#### `cover` (image path)

A full-width cover image displayed at the top of the article page. This is optional and if omitted, no cover image will be shown.

```yaml
cover: ./images/article-cover.jpg
```

#### `coverCredits` (string)

Credits or attribution for the cover image. Displayed alongside the cover image.

```yaml
coverCredits: Photo by Jane Smith
```

#### `coverImageYPosition` (string)

Controls the vertical positioning of the cover image when it's cropped. Accepts CSS percentage values (e.g., `"30%"`, `"center"`, `"top"`, `"bottom"`).

```yaml
coverImageYPosition: 30%
```

## Complete Front Matter Example

```yaml
---
title: Aantal tekenbeten blijft verhoogd na sterke toename Hemelvaart
date: 2025-07-03T07:00:00.000Z
teaserImage: ./images/20250702-teaser.jpg
teaserText: Vanaf het Hemelvaartweekend nam het aantal tekenbeetmeldingen dat via Tekenradar.nl werd doorgegeven sterk toe. Ook in de weken erna lag het aantal tekenbeten ruim boven het niveau van de afgelopen twee jaar.
teaserImagePlacement: top
teaserImageCredits: Photo by Tekenradar
cover: ./images/article-cover.jpg
coverCredits: Photo by Tekenradar
coverImageYPosition: 30%
---
```

## Content

After the front matter, you can write your article content using standard Markdown and MDX syntax. The content supports:

- Standard Markdown formatting (headers, lists, links, etc.)
- MDX components (React components)
- Images with relative paths
- HTML elements where needed

**Example:**

```markdown
*3 juli 2025, bericht van Wageningen University*

**Vanaf het Hemelvaartweekend nam het aantal tekenbeetmeldingen...**

## Section Header

Your article content here.

<figure className="article-figure">
  <img
    src="./images/figure-1.jpg"
    alt="Description of the figure"
   />
  <figcaption>Figure caption text</figcaption>
</figure>
```

## How Articles Are Displayed

### News Overview Page (`/nieuws`)

- Articles are grouped by year (2020 to current year)
- Each article is displayed as an `ImageLinkCard` with:
  - Title
  - Teaser text (if provided)
  - Teaser image (if provided)
  - Publication date
  - "Read more" button
- Articles are sorted by date (newest first)
- Only published articles are shown (unless draft mode is enabled)

### Article Detail Page (`/nieuws/{slug}`)

- Full article content is displayed
- Cover image (if provided) appears at the top
- Related articles navigation (previous/next) is shown at the bottom
- Sidebar includes the ReportCard component

### Homepage Latest News Section

- The three most recent articles are displayed
- First article uses `imagePlacement: 'top'`
- Subsequent articles use `imagePlacement: 'left'`

## Draft Mode

Articles with a future date are treated as drafts. To enable draft mode, set the environment variable:

```bash
NEXT_DRAFT_MODE=true
```

When draft mode is enabled, draft articles will be visible in the application.

## File Naming Convention

While not strictly required, it's recommended to name your files using the pattern:

```
{date}-{descriptive-slug}.mdx
```

**Examples:**

- `2025-07-03-tick-bites-increase.mdx`
- `2025-04-03-tbe-reporting-requirement.mdx`

The date prefix helps with organization and makes it clear when the article was created.

## Image Handling

- All images referenced in front matter or content should use relative paths
- Images are automatically processed by Velite
- Processed images are stored in `public/static/content-assets/`
- Use the `./images/` directory relative to your MDX file for article images

## Related Pages Navigation

Each article page automatically includes navigation to:

- **Previous article**: The chronologically previous article
- **Next article**: The chronologically next article
- **Overview page**: Link back to the main news page

These are generated automatically based on the article's date and position in the sorted list.

## Technical Details

- Articles are processed by Velite (configured in `velite.config.ts`)
- The `newsPages` collection pattern matches: `*/nieuws/**/*.mdx`
- Articles are sorted using `getSortedNewsArticles()` utility function
- The slug is automatically generated from the file path
- Locale is extracted from the first segment of the slug path

## Best Practices

1. **Always include a teaser text** - This improves the appearance of article listings
2. **Use descriptive file names** - Makes it easier to find and manage articles
3. **Provide image credits** - Important for attribution and legal compliance
4. **Set appropriate dates** - Use the actual publication date, not the creation date
5. **Keep titles concise** - Maximum 99 characters, but shorter is better for display
6. **Use relative image paths** - Keeps images organized with their articles
7. **Test draft articles** - Use draft mode to preview articles before publication
