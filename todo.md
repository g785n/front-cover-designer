# Scrolling Fix

- [x] Confirm which nested grid and flex elements are preventing the layouts drawer from receiving a constrained height.
- [x] Add the required `min-height: 0`, height, and overflow rules so the tool drawer and inspector scroll independently.
- [x] Verify that the final layout card can be reached by scrolling the drawer while the artboard and inspector remain fixed at a compact viewport height.
- [x] Run the production build and save a corrected checkpoint.

# Background Artwork Revision

- [x] Remove text creation, text inspector controls, and text layers from every starter composition.
- [x] Extend the document model to support solid, linear-gradient, and radial-gradient backgrounds.
- [x] Add intuitive colour-stop and gradient-angle controls with useful preset combinations.
- [x] Expand the element library with arcs, rings, soft bubbles, dot clusters, and waves.
- [x] Ensure decorative presets are editable and layer-aware, ready for exact-size PNG export verification.
- [x] Verify the revised workflow visually and functionally, then save a new checkpoint.

# Report Palette URL Integration

- [x] Define concise URL parameters for primary, contrast, positive, average, negative, and five chart accent colours.
- [x] Parse and validate hexadecimal colours safely, supporting encoded `#`, plain six-digit, and three-digit forms.
- [x] Display the inherited report palette in the Colours drawer with named quick-use swatches.
- [x] Add palette-aware gradient recipes and one-click application to selected geometric elements.
- [x] Provide a copyable example URL and clear fallback behaviour when parameters are missing or invalid.
- [x] Verify a fully parameterised URL, editor usage, and exact-size PNG export before saving a checkpoint.

# Boardforms Rebrand

- [x] Inspect the supplied white PNG and black SVG wordmarks and prepare deployable asset URLs without altering their proportions.
- [x] Review the Boardforms homepage for authoritative colour, typography, layout, iconography, and brand-voice cues.
- [x] Define how “Cover Studio by Boardforms” should appear in the header, browser metadata, favicon, and supporting interface copy.
- [x] Replace the provisional product identity while preserving editor layout, URL palettes, uploads, geometry, and PNG export.
- [x] Verify desktop and compact layouts, a parameterised report palette URL, and exact-size export after rebranding.
- [x] Run the production build and save a new checkpoint.

# Colours-First Startup

- [x] Open the editor on the Colours panel by default.
- [x] Place Colours first and Backgrounds last in the left tool rail.
- [x] Start without template artwork or geometric layers on a clean blank canvas.
- [x] Preserve automatic primary-to-accent gradient initialization when valid URL colours are supplied.
- [x] Verify plain and parameterised URLs, compact layout, panel scrolling, and exact-size PNG export.
- [x] Run the production build and save a new checkpoint.

# Report Overlay Placement Guides

- [x] Inspect all supplied report-cover screenshots and identify the supported title alignments, title-zone geometry, and date treatments.
- [x] Define concise URL parameters for title position and date placement with safe validated fallbacks.
- [x] Make the title-safe guide follow the URL-selected title position and expose the current placement in the editor.
- [x] Add an optional bottom-left date-safe marker for reports where the date is separated from the title.
- [x] Add placement controls that update the URL-compatible preview state without adding text to exported artwork.
- [x] Ensure all overlay previews and guides are excluded from exported PNGs.
- [x] Verify representative title/date combinations, compact rendering, exact-size export, and production build.
- [x] Save a new project checkpoint.

# Save to Boardforms

- [x] Read and validate the Bubble Company UID from a `company` URL parameter.
- [x] Reuse the exact-size clean PNG renderer for both local export and Bubble saving.
- [x] Add a Save to Boardforms action only when a valid Company UID is available.
- [x] Send the PNG as a Bubble image payload to the verified development workflow.
- [x] Provide saving, success, missing-ID, and workflow-error states without affecting local PNG export.
- [x] Verify the browser request updates the intended Bubble development Company.
- [x] Recheck title/date guides are excluded, local export remains 1,066 × 735 px, and the production build passes.
- [x] Save a new project checkpoint.

# Bubble Environment Routing

- [x] Parse `bubbleEnv=test|live` with `test` as the safe fallback.
- [x] Route Boardforms saves to the `version-test` workflow for test and the production workflow for live.
- [x] Preserve the selected environment in copied integration URLs.
- [x] Display the active Bubble environment next to the connected Company state and on the save action.
- [x] Verify a real test save, validate live routing without performing an unconfirmed live database write, and recheck exact-size local export.
- [x] Run the production build and save a new checkpoint.

# Bubble Image Persistence Fix

- [x] Compare the working image-URL request with Cover Studio’s raw image payload and the current Bubble expression.
- [x] Confirm whether `:saved to Bubble Storage` is incorrectly reprocessing an image already uploaded by the Workflow API.
- [x] Retest with `ImagefontCover = Request Data's cover` directly before changing the browser payload architecture.
- [x] Confirm Bubble stores the raw nested payload as `[object Object]` rather than a valid image.
- [x] Upgrade Cover Studio with server-side file storage for generated cover PNGs.
- [x] Upload the clean PNG first and receive a stable HTTPS image URL.
- [x] Send Bubble a flat `{ company, cover: imageUrl }` payload matching the successful original test.
- [x] Keep `ImagefontCover = Request Data's cover` without `:saved to Bubble Storage`.
- [x] Verify the actual Company image field contains the new cover, not merely that the workflow returns HTTP 200.
- [x] Recheck test/live routing, local export, and production build before saving a checkpoint.

# Bubble-Owned Cover Storage

- [x] Configure Bubble to set `ImagefontCover = Request Data's cover:saved to Bubble Storage` now that `cover` is a valid HTTPS URL.
- [x] Run an authorised test save for Company `1689248118661x735818826526228500` through the URL-first workflow.
- [x] Confirm Bubble’s action completes with the flat image URL and invokes the Bubble storage-copy expression.
- [x] Confirm `ImagefontCover` renders the cover and references Bubble storage rather than `[object Object]` or a broken image.
- [x] Re-run automated tests, production build, and exact-size local export before checkpointing.

# Publication Readiness

- [x] Record user confirmation that Bubble successfully copies and serves the saved cover from its own storage.
- [x] Re-run the automated test suite and production build after the final storage-copy test.
- [x] Review the complete checklist and save a release checkpoint for user-initiated publication.

# Palette-Aware Image Treatments

- [x] Inspect the image layer data model and SVG rendering path for export-safe filter and overlay support.
- [x] Add non-destructive brand tint, duotone, and gradient-wash treatments driven by the report palette.
- [x] Provide understandable treatment, colour-source, and strength controls for selected image layers.
- [x] Keep original image uploads intact and allow treatment removal in one action.
- [x] Verify starter imagery and local exact-size PNG export preserve the treatment.
- [ ] Verify user-uploaded imagery and Bubble saving preserve the treatment.
- [x] Run the automated tests and production build after the initial treatment implementation.

# Native Palette Illustration Library

- [x] Define reusable SVG illustration presets that bind every visual region to named report palette roles.
- [x] Add an Illustration library distinct from uploaded images and retain the existing upload treatment controls.
- [x] Add one-click palette-aware compositions covering organic bubbles, data ribbons, framed geometry, and orbiting forms.
- [x] Allow users to switch each illustration preset while keeping URL palette changes reactive.
- [x] Verify palette-driven native artwork uses direct SVG fills and strokes rather than filters or raster colour manipulation.
- [ ] Verify local 1,066 × 735 PNG export and Bubble saving preserve the reactive SVG artwork.
- [ ] Run the automated tests and production build, then save a new checkpoint.

# Palette-Reactive Architectural Scenes

- [ ] Translate the supplied reference into an editorial composition system of paper planes, curved sails, discs, shadow wedges, and title-safe negative space.
- [ ] Replace the first abstract SVG presets with four architectural scene variants built entirely from palette-bound SVG regions.
- [ ] Map scene shadows, paper/light planes, focal discs, structural forms, and accent edges to named report palette roles.
- [ ] Preserve the existing Illustration library, layer selection, switching controls, local export, and Bubble-save compatibility.
- [ ] Verify a default and URL-provided palette redraw the same scene into an on-brand composition.
- [ ] Verify local 1,066 × 735 PNG export and Bubble saving, then run tests and production build.
- [ ] Save a new checkpoint.

# Editorial Palette Scene Library

- [ ] Define colour-role mappings and title-safe composition rules for an architectural sail, botanical ribbon, and coastal divide scene.
- [ ] Replace generic illustration presets with the three reference-led SVG scene families plus a complementary abstract option.
- [ ] Use palette roles for the paper/light plane, focal accent, structural dark, organic/coastal form, and shadow depth in every scene.
- [ ] Preserve direct SVG rendering, selectable layers, local export, and Bubble storage-copy compatibility.
- [ ] Verify default and supplied URL palettes redraw all scene families while protecting title-safe space.
- [ ] Verify clean 1,066 × 735 export and a Bubble test save, then run tests and production build.
- [ ] Save a new checkpoint.

# Remove Native Illustrations

- [x] Remove the Illustrations tool-rail entry, library drawer, SVG layer model, scene renderer, and inspector controls.
- [x] Remove unused illustration tests, styling, presets, and product copy while retaining report-palette image treatments.
- [x] Confirm the streamlined tool order is Colours, Images, Elements, and Backgrounds.
- [x] Verify the retained photo treatment and title/date guides after the removal.
- [x] Verify local exact-size export and the Bubble save route remain intact after illustration removal.
- [x] Run tests and production build after removal.

# Remove Text Contrast

- [x] Remove text contrast from the report palette model, defaults, labels, parsers, and copied URL builder.
- [x] Remove the text-contrast swatch and any palette treatment controls that expose it.
- [x] Keep `contrast` backward-compatible as an ignored legacy URL parameter.
- [x] Update palette recipes and supporting copy to use the remaining primary, rating, and chart colour roles.
- [x] Verify URL parsing, default palette, image treatment selectors, local export, automated tests, and production build.
- [x] Save a new checkpoint.
