# Phaser 3 Plugin Path Builder

NOTE: I notice there is not much activity on issues and can imagine issues exist. Should you encounter issues, please do submit them and I will look into it! Also any suggestions or feature requests that you would like to see, feel free to submit them via issues. Much appreciated.

A tool to build paths for [Pathfollowers](https://labs.phaser.io/index.html?dir=paths/followers/) and path [tweens](https://labs.phaser.io/index.html?dir=paths/). Draw and edit Lines, Bezier Curves, Splines and Ellipses during runtime and export them to Phaser. [Demo](https://samid737.github.io/pathbuilder/). 

![](https://media.giphy.com/media/p3AwdolG7NFjTGTE3P/giphy.gif)

## Description

* Draw your path in-game.
* Pause, resume and explore your scene while drawing paths.
* Export created path to JSON.
* Import existing paths from JSON.
* Load path into Phaser and create awesome animations.
* 90% Phaser API code.

## Usage

1. Grab the `PathBuilder.js` or `PathBuilder.min.js` file inside the `dist` folder.

2. Load it in Phaser.
```
function preload ()
{
    this.load.plugin({key:'PathBuilder', url:"<pathtoplugin>/PathBuilder.js",mapping:'PathBuilder'});
    //or if using minified:
    //this.load.plugin({key:'PathBuilder.min', url:"<pathtoplugin>/PathBuilder.min.js",mapping:'PathBuilder'});
}
```
* UI:

    * Controls: 
        * Use left mouse to draw.
        * Zoom and move trough scene using middle mouse and mousewheel.
        * Use right mouse to select different curves.
        
    * Buttons:
        * Undo          : Undo the previous path draw.
        * Clear         : Clear the entire path.
        * Draw          : Enter draw mode.
        * Hide          : Hide Plugin.
        * Show          : Show Plugin.
        * Pause         : Pause main scene.
        * Resume        : Resume main scene.
        * Reset view    : Reset the camera.
        * Snap          : Snap mouse to a fixed grid.
        * Import        : Import existing path (JSON).
        * Export        : Save the current path as JSON file.  

### Having questions or problems with usage, suggest a feature? Please submit an [Issue](https://github.com/samid737/phaser3-plugin-pathbuilder/issues/new).

## Requirements:

* Phaser 3, latest recommended to guarantee matching API.     
* Mouse with middle mouse button if you want to explore A scene.
* Chrome browser recommended.

## Dev notes

Run `npm install` and then `npm run build` to build the plugin. Use `npm run dev` to run webpack-dev-server on port 8000. 

There is an existing ES5 branch, but it is no longer maintained since v.1.6.1:

https://github.com/samid737/phaser3-plugin-pathbuilder/tree/ES5

Contributions, optimizations, suggestions are very welcome. All changes are found in the [Changelog](https://github.com/samid737/phaser3-plugin-pathbuilder/blob/master/CHANGELOG.md);

[Phaser 3](https://github.com/photonstorm/phaser). 

