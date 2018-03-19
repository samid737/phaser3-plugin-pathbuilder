# Phaser 3 Plugin Path Builder

A tool to build paths used for tweens and Pathfollowers. Draw and edit Lines, Bezier Curves, Splines and Ellipses during runtime and export them to Phaser. [Demo](https://samid737.github.io/pathbuilder/). 

## Description

* Path Builder is A useful tool for editing and building tween paths. 
* Draw your path in-game during runtime.
* Export path as JSON Data.
* Load them into Phaser and create awesome animations.

## Usage

```
function preload ()
{
    this.load.plugin('PathBuilder', 'path/to/PathBuilder.js');
}
```
Then: 
```

function create ()
{
    this.sys.install('PathBuilder');
}
```

* UI:

1. Click show to display main panel.
2. Click draw to enter draw mode. 
3. Click anywhere add points, default draw mode is Cubic Bezier (which is pretty common to use).
4. Hold mouse button 0.5s to select different curves. 
5. Hold S to snap while drawing.

## Requirements:

* Phaser 3

## Dev notes
Run `npm install` and then `npm run build` to build the plugin.
The plugin is in active development and features will be added over time. Ideas, contributions, optimizations, suggestions are very welcome. All changes are found in the [Changelog](https://github.com/samid737/phaser3-plugin-pathbuilder/blob/master/CHANGELOG.md);

