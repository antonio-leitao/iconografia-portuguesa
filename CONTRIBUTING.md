# Types of Iconography

<a href="https://simpleicons.org"><img src="https://img.shields.io/badge/dynamic/json?color=informational&label=icons&prefix=%20&logo=simpleicons&query=%24.icons.length&url=https%3A%2F%2Fraw.githubusercontent.com%2Fantonio-leitao%2Ficonografia-portuguesa%2Fmaster%2Fdata%2Ficonography.json" alt="Number of icons currently in the library"/></a>

Motif: Has no symmetry
Frize: 1D Symmetry (infinite),
Tile: 2D symmetry
Ensemble: composition of motiffs.

Symmetries are considered planar and without rotations.

# 1. Tracing the SVG

Trace it, add it to a canavas of 248 by 248, at least two sides touching the edges.

1. Motif -> has no symmetry.
2. If it is a frize add only the repeatable motif, no symmetry or rotation necessary.(example).
3. If it is a tile add only tileable motiff.

# 2. Cleaning the SVG.

1. Use SVGOMG to copy and paste the file clean it.
2. Run `node scripts\add.js path/to.svg --type=motiff|frize|pattern|composition`.
   The previous command will hash the svg file add the icon and index it automatically.
   It will also attempt to optimize the svg code. The command will overwrite and rename the input file. If it does not happen it measn that an icon exactly like it already exists in the database.

# 3. Meta Data

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
