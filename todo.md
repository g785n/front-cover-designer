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
