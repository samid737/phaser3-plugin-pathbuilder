# Phaser 3 Plugin Path Builder

A tool to build paths for [Pathfollowers](https://labs.phaser.io/index.html?dir=paths/followers/) and path [tweens](https://labs.phaser.io/index.html?dir=paths/). Draw and edit Lines, Bezier Curves, Splines and Ellipses during runtime and export them to Phaser. [Demo](https://samid737.github.io/pathbuilder/). 

![](http://www.html5gamedevs.com/uploads/monthly_2018_03/Y90fuqTin8.gif.2170746140c892ed279d26dfa2afeb84.gif)

## Description

* Path Builder is A useful tool for editing and building paths. 
* Draw your path in-game during runtime.
* Export path as JSON Data.
* Load them into Phaser and create awesome animations.
* 90% Phaser API code.

## Usage

1. Grab the `PathBuilder.js` or `PathBuilder.min.js` file inside the `dist` folder.

2. Load it in Phaser.
```
function preload ()
{
    this.load.plugin('PathBuilder', 'path/to/PathBuilder.js');
}
```
3.
```

function create ()
{
    this.sys.install('PathBuilder');
}
```

* UI:

    * Controls: 
        * Use left mouse to draw.
        * Zoom and move trough scene using middle mouse and mousewheel.
        * Use right mouse to select different curves.

        * S key: Snap the mouse to fixed distance.
        
    * Buttons:
        * Undo          : Undo the previous path draw.
        * Clear         : Clear the entire path.
        * Draw          : Enter draw mode.
        * Hide          : Hide Plugin.
        * Show          : Show Plugin.
        * Pause         : Pause main scene.
        * Resume        : Resume main scene.
        * Reset view    : Reset the camera.
        * Import        : Import existing path (JSON).
        * Export        : Save the current path as JSON file.  



### Having problems with usage? Please submit an [Issue](https://github.com/samid737/phaser3-plugin-pathbuilder/issues/new).

## Requirements:

* Phaser 3 (at least 3.3.0).
* Mouse with middle mouse button click.
* Chrome browser recommended.

## Dev notes

Run `npm install` and then `npm run build` to build the plugin.
The plugin is in active development and features will be added over time. Contributions, optimizations, suggestions are very welcome. All changes are found in the [Changelog](https://github.com/samid737/phaser3-plugin-pathbuilder/blob/master/CHANGELOG.md);

Honour the [Phaser Code](https://github.com/photonstorm/phaser). 

