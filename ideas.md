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
- Users can add text, photographs, logos, rectangles, circles, and decorative lines; move, resize, rotate, layer, duplicate, and delete them; choose canvas colours; and export a PNG.
- A small set of starter compositions demonstrates the tool without locking the user into templates.

## Style Decisions

Measurement language is a recurring brand motif: fine crop corners, ruler ticks, and dimension numerals appear around the canvas and export-related areas rather than as generic decoration. **Bodoni Moda** is reserved for the wordmark, section headlines, and oversized editorial numerals, while **DM Sans** owns controls, labels, microcopy, and dense interface text. Utility language sounds like a calm production studio and uses short, outcome-specific phrases such as “Export cover PNG,” “Start with a layout,” and “Edit on the cover.”
