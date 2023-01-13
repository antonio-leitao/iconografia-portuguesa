# Contributing to the Iconography

# 1. Tracing guidelines

Monocromatic
no stroke (only fill)
hints(use photoshop/gimp to remove prespective).

Trace it, add it to a canvas of 248 by 248, at least two sides touching the edges.

### Types

Motif: Has no symmetry
Frize: 1D Symmetry
Tile: 2D symmetry
Composition: composition of motiffs.

Symmetries are considered planar and without rotations.

# 2. Adding an svg

Add the svg to the iconography either by creating an issue with the svg directly or creating a pull request.

### A. Create issue

1. Trace the svg (check guidelines) for how.
2. Add tag new_icon.
3. Add svg and original image, if possible with location.
4. Issue will be closed if svg added.

### B. Create Pull Request

1. Trace the svg (check guidelines) for how.
2. Use SVGOMG to copy and paste the file clean it.
3. Add svg to iconography; Run `node scripts\add.js path/to.svg --type=motiff|frize|pattern|composition`. (path to svg?)
   The previous command will hash the svg file add the icon and index it automatically.
   It will also attempt to optimize the svg code. The command will overwrite and rename the input file. If it does not happen it measn that an icon exactly like it already exists in the database.

# Meta Data

```json
{
  "hash": "{svghash}",
  "complexity": 42,
  "scale": "thinnest part of svg",
  "type": "motiff | frize | tile | ensemble",
  "extra": {
    "location": "Street, City, Country",
    "photo": "Link to real world image"
  }
}
```
