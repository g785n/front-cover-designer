# Front Cover Designer — Design Direction

## Three Stylistic Approaches

### Theme Name: Editorial Workshop
**Very Brief Intro:** A crisp, tactile creative studio inspired by modern print rooms and editorial art direction. Warm paper tones, ink-black structure, and a vivid vermilion accent make the tool feel capable without becoming intimidating.

**Probability:** 0.047

### Theme Name: Soft Modular Studio
**Very Brief Intro:** A friendly workspace built from pale mineral colours, translucent tool trays, and softly geometric controls. It prioritises calm exploration and a welcoming learning curve.

**Probability:** 0.081

### Theme Name: Precision Blueprint
**Very Brief Intro:** A technical, dark drafting-table interface with fine measurement lines and electric cyan details. It makes exact dimensions and alignment feel central to the product.

**Probability:** 0.026

## Chosen Approach: Editorial Workshop

### Design Movement
Contemporary editorial modernism, drawing from Swiss graphic design, independent magazine studios, and tactile print-production workspaces.

### Core Principles
1. **Canvas first:** The cover itself is always the clearest and most visually dominant object.
2. **Visible structure:** Controls use strong labels, measured spacing, and clear grouping rather than decorative containers everywhere.
3. **Creative warmth:** Off-white paper tones, subtle grain, and energetic accent colour prevent the precision tools from feeling clinical.
4. **Progressive simplicity:** Everyday actions remain obvious while detailed controls appear only when an editable element is selected.

### Color Philosophy
The surrounding workspace uses warm ivory and charcoal to recall paper and printer's ink, keeping long editing sessions comfortable. **Press Vermilion** is the ownable action colour: it marks creation, selection, and export. Deep cobalt is reserved for quiet secondary signals and visual balance. User-selected cover colours remain independent of the application chrome.

### Layout Paradigm
An asymmetric three-part studio: a narrow vertical tool rail, an adaptable properties drawer, and a large recessed pasteboard holding the fixed-ratio cover. The main canvas is visually offset rather than centred in the entire browser, reinforcing the feeling of a real design desk with tools arranged around the work.

### Signature Elements
- Fine crop-mark corners and measurement ticks around the canvas.
- Paper-cut shadows with slight warm edging instead of generic floating cards.
- Compact uppercase tool labels paired with oversized editorial numbers for dimensions and zoom.

### Interaction Philosophy
Interactions should feel direct and physical: add an item, select it on the canvas, then manipulate it in place or from the inspector. Controls respond instantly, selected objects show vermilion outlines, and destructive actions remain clear but unobtrusive.

### Animation
Use 140–220 ms motion with a sharp editorial ease-out. Tool drawers slide a short distance rather than floating dramatically. New canvas elements arrive with a restrained 0.97-to-1 scale and fade. Selection outlines switch instantly. Buttons compress to 0.97 on press. All non-essential movement respects reduced-motion preferences.

### Typography System
Use **DM Sans** for interface copy because its open forms remain readable at compact sizes. Use **Bodoni Moda** selectively for the product wordmark and editorial display moments, creating a deliberate contrast between expressive print culture and functional tooling. Interface hierarchy: 11 px uppercase labels with tracking, 13–14 px controls, 18–22 px panel headings, and 28 px product display type.

### Brand Essence
**A welcoming precision studio for teams who need attractive, upload-ready front covers without specialist design software.** Personality: assured, inventive, considerate.

### Brand Voice
Headlines are concise and art-direction-led; CTAs use plain verbs and name the outcome. Microcopy reassures without overexplaining.

Examples: **“Shape the first impression.”** and **“Download cover PNG.”**

### Wordmark & Logo
The wordmark combines a high-contrast editorial serif for “Cover” with a compact sans-serif “STUDIO”. The symbol is a bold, abstract crop-frame made from two opposing paper corners, with a vermilion centre plane; it must remain recognisable at favicon size and contain no text.

### Signature Brand Color
**Press Vermilion — #F04E30.** A vivid print-inspired orange-red used for primary actions, selected states, and the brand mark.

## Product Decisions

- The exported artwork is always exactly **1,066 × 735 pixels**, regardless of the editor's on-screen scale.
- The first version is entirely browser-based and stores no user uploads remotely.
- The editor creates **background artwork only** because the destination platform adds report titles and other document text automatically.
- Users can add photographs, logos, rectangles, circles, lines, rings, arches, waves, dot fields, and subtle bubble clusters; move, resize, rotate, layer, duplicate, and delete them; choose solid or gradient backgrounds; and export a PNG.
- A small set of image-led, gradient, and geometric starter compositions demonstrates the tool without locking the user into templates.
- Report colour schemes can travel in the URL using `primary`, `positive`, `average`, `negative`, and `accent1` through `accent5`; valid values are inherited into named swatches, gradients, and element colouring while missing or invalid values fall back safely. Legacy `contrast` values are ignored.

## Style Decisions

Measurement language is a recurring brand motif: fine crop corners, ruler ticks, and dimension numerals appear around the canvas and export-related areas rather than as generic decoration. **Bodoni Moda** is reserved for the wordmark, section headlines, and oversized editorial numerals, while **DM Sans** owns controls, labels, microcopy, and dense interface text. Utility language sounds like a calm production studio and uses short, outcome-specific phrases such as “Export cover PNG,” “Start with a layout,” and “Edit on the cover.”

## Boardforms Brand Adaptation

The product is branded **Cover Studio by Boardforms**. The supplied official Boardforms wordmark is used without altering its proportions. The product should feel like a focused workspace within the wider Boardforms suite rather than a separate editorial brand.

The Boardforms homepage establishes **Instrument Sans** as the main product and interface typeface and **Instrument Serif Italic** for selective, human editorial emphasis. Its key colours are a deep governance navy (`oklch(0.24 0.045 250)`), a very pale blue-mist background (`oklch(0.975 0.018 235)`), a medium report blue (`oklch(0.55 0.1 230)`), and a fresh green primary accent (`oklch(0.52 0.14 161)`). Surfaces are high-key, slightly translucent, and softly rounded where they contain important actions; dense utility controls remain precise and compact.

For Cover Studio, Boardforms navy replaces charcoal as the structural colour, blue mist replaces warm ivory as the surrounding workspace, and green replaces vermilion as the main action and selected-state colour. The existing production rulers and exact-output language remain because they support the tool’s purpose. Instrument Serif is reserved for section headings and the word “Studio” in the product lockup; Instrument Sans owns all editor controls.

The header lockup reads **Cover Studio** with **by** followed by the Boardforms wordmark. The official black wordmark is used on light surfaces and the official white wordmark is available for dark Boardforms navy surfaces. Brand voice remains concise and evidence-led: “Report-ready background artwork” and “Built for Boardforms reporting.”

### Boardforms Production-Desk Amendments

Utility panels use editorial rules, measured labels, sharper grouping, and restrained corners; softly rounded containers are reserved for primary actions, connection status, and meaningful previews. Starter compositions prioritize abstract, palette-aware Boardforms report backgrounds before editorial image options. The Cover Studio name carries a small green crop-frame motif as its ownable product signature, while the official Boardforms wordmark remains unmodified.

## Report Overlay Placement Model

The supplied report-cover examples resolve into a predictable **3 × 3 title-placement system**: top-left, top-centre, top-right, middle-left, middle-centre, middle-right, bottom-left, bottom-centre, and bottom-right. The safe rectangle changes position and alignment but remains a guide only. The established default is middle-left, approximately `x 5% / y 40% / width 40% / height 20%`.

Date handling is a separate setting with three modes: **within title**, **bottom-left**, and **hidden**. When within title, the main guide reads “TITLE + DATE.” When bottom-left, the main title guide excludes the date and a compact date-safe marker appears at approximately `x 5% / y 89%`. This mirrors the supplied separated-date example and prevents the date from becoming coupled to title alignment.

The URL contract uses `titlePosition` with one of the nine named values and `datePosition=title|bottom-left|hidden`. Invalid values safely fall back to `middle-left` and `title`. If either valid overlay parameter is present, the title-safe preview opens automatically; all overlay guides remain editor-only and are stripped from PNG export.

## Boardforms Save Workflow

When the launch URL contains a valid Bubble UID in `company`, Cover Studio becomes a connected report workflow rather than a standalone exporter. The header shows a discreet connected-company status and a navy **Save to Boardforms** action beside the green local export action. Both actions render through the same clean, exact-size PNG pipeline, ensuring title guides, selection handles, rulers, and grid overlays are excluded. The first integration targets the verified Bubble development workflow; live routing remains a deliberate later activation step.

### Connected-Workflow Style Decisions

Boardforms green remains concentrated in the connected-company indicator, the selected placement marker, crop-frame signature, and primary export action. Structural labels and panel rules use governance navy. Palette and recipe choices share continuous editorial rules rather than reading as collections of floating SaaS cards, while the canvas remains the strongest object on screen. The background summary and workspace label repeat restrained crop-corner cues so the production-desk identity extends beyond the artboard without becoming decorative noise.

### Bubble Environment Contract

The integration URL uses `bubbleEnv=test|live`, with **test** as the safe fallback for missing, invalid, or `dev` values. Test routes to Bubble’s `version-test` workflow; live routes to the deployed workflow. Both the connected-company status and save button show the active environment, and copied integration URLs preserve it. Live writes are never exercised during automated verification without separate user confirmation.

## Palette-Aware Image Treatments

Images retain their original source and can receive a non-destructive report treatment. **Brand tint** layers one named report colour over photography, **Duotone** maps image shadows and highlights to two named report colours, and **Gradient wash** applies a two-colour palette gradient. Because each treatment refers to a palette role rather than a fixed hex value, changing report colours in the URL recalibrates treated imagery without modifying the source image. The original setting remains one click away, and all treatment layers stay inside the exported SVG composition. The report contract intentionally contains only primary, three rating colours, and five chart accents; text contrast is not required for background artwork.
