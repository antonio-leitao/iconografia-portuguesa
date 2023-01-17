# Contributing to the Iconography

There are mainly three ways in which you can contribute to this Iconography:

1. [**Adding new SVGs**](#adding-new-svgs).
2. [**Correcting exsiting SVGs**](#2-correcting-an-existing-svg).
3. **Pointing out missing patterns**: if you are not familiar with SVGs or github you are still welcome to contribute by supplying patterns that you would like to see added. Open an issue with a picture and some explanantion on how to

> **Note**
> For any contributions start by opening an issue about it.

# Adding new SVGs.

If you would like to contribute with a new entry to the iconography, below are the guidelines for assuring a consistent database.

1. Fork this repository.
2. Create a new branch.
3. Add your contribution.
4. Commit and push to the new branch.
5. Make a pull request.

### A. Identify the type.

Each icon in the database is categorized into one of 4 types: `motiff`,`frize`, `tile` and `composition`.

- `motiff`: Has no symmetry.
- `frize`: has 1D symmetry (tileable horizontaly).
- `tile`: has 2D symmetry (tileable both horizontaly and verticallly).
- `composition`: composition of motiffs.

Symmetries are considered planar and without rotations.

```
Insert example of motiff, frize, pattern, composition
```

While `frize` adn `tile` are intuitive to categorize, in general it is not an exact science and difficult situations are handled case-by-case. As a rule of thumb start by assuming it is a composition. If you notice obvious planar symmetries divide it and add both the complete composition and the separated symmetries as motiffs.

> **Note**
> Both `frize` adn `tile` must be reduced to their tileable form which more often than not, **might not correspond to their repeatable pattern**

```
Insert example tileable != repeatable
```

### B. Tracing Guidelines

The second step is to trace the SVG. Below are some formatting rules.

- Start with a 248 x 248 canvas.
- The svg must be monocchromatic with no stroke only fill. The "fillable" part of the SVG must correspond to the black part in the original iconograhy.

> **Warning**
> Patterns of type `frize` and `tile`, in order to be tileable, must be reduced to their bounding box as to be properly tileable with at least two sides must be touching the edges of the 248 x 248 canvas.

### C. Adding the SVG

Run the command:

```shell
npm run add <path_to_svg>.svg
```

Which will clean the svg, hash it and add it to the iconography if it doesn't already exist. After submit a pull request with your changes.

# Correcting an existing SVG.

1.  Delete the previous wrong submission.
2.  Add the corrected submission, refer to [tracing guidelines](#b-tracing-guidelines).
3.  Create pull request

<!--

# Iconography

```json
{
  "hash": "{svghash}",
  "complexity": 42,
  "type": "motiff | frize | tile | ensemble",
  "meta": {
    "location": "Street, City, Country",
    "photo_url": "Link to real world image"
  }
}
```
-->
