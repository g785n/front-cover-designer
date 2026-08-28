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
