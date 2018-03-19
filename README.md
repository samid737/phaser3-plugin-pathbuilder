# Phaser 3 Plugin Path Builder

A tool to build paths used for tweens and Pathfollowers. Draw and edit Lines, Bezier Curves, Splines and Ellipses during runtime and export them to Phaser.

## Description

* Curve Builder is A useful tool for editing and building tween paths. 
* Draw your path in-game during runtime.
* Export path as JSON Data.
* Load them into Phaser and create the most awesome [tween]()!

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

UI:

1. Click show to display main panel.
2. Click on draw to enter draw mode. 
3. Click to add points, default draw mode is Cubic Bezier.
4. Hold mouse button 0.5 to switch to to different curves. 
5. Hold S to snap during drawing.


## Requirements:

* Phaser 3

##Dev notes
Run `npm install` and then `npm run build` to build the plugin.
The plugin is in active development and features will be added over time. Ideas, contributions, optimizations, suggestions are very welcome. All changes are found in the [Changelog]();

