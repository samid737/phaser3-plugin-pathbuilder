(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PathBuilder", [], factory);
	else if(typeof exports === 'object')
		exports["PathBuilder"] = factory();
	else
		root["PathBuilder"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function Element(superclass) {
    return function (_superclass) {
        _inherits(_class, _superclass);

        function _class(ui, x, y) {
            var _ret;

            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, ui, x, y));

            Object.assign(_this.prototype, Element.prototype);

            _this.ui = ui;
            _this.scene = ui.scene;
            _this.x = x;
            _this.y = y;
            _this.ui.elements.push(_this);

            _this.scene.cameras.main.ignore(_this);
            var l = 1 << _this.scene.cameras.cameras.length - 1;
            _this.cameraFilter = l & ~_this.ui.camera._id;

            return _ret = _this, _possibleConstructorReturn(_this, _ret);
        }

        _createClass(_class, [{
            key: "update",
            value: function update() {}
        }, {
            key: "toggle",
            value: function toggle() {
                this.visible = !this.visible;
            }
        }, {
            key: "click",
            value: function click() {
                var callbackcontext = this.callbackcontext;
                var args = this.args;

                if (this.callbacks instanceof Array) {
                    this.callbacks.forEach(function (callback, index) {
                        callback.apply(callbackcontext[index], args);
                    });
                } else {
                    this.callbacks.apply(this.callbackcontext, this.args);
                }
            }
        }, {
            key: "hover",
            value: function hover() {}
        }, {
            key: "out",
            value: function out() {}
        }]);

        return _class;
    }(superclass);
};

exports.default = Element;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Element = __webpack_require__(10);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Point = function (_Phaser$GameObjects$I) {
    _inherits(Point, _Phaser$GameObjects$I);

    function Point(ui, vector, curve, key, mapping) {
        var _ret;

        _classCallCheck(this, Point);

        var _this2 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, ui.scene, vector.x, vector.y, key));

        _Element2.default.call(_this2, ui, vector.x, vector.y);

        _this2.setInteractive();
        _this2.scene.input.setDraggable(_this2);

        _this2.setData('vector', vector);
        _this2.scene.vectors.push(vector);

        //TODO: abstract from point to A custom curve class.
        if (curve !== null) {
            _this2.curve = curve;
            _this2.curve.controlpoints.push(_this2);
        }

        if (mapping) {
            _this2.mapping = mapping;
        }

        _this2.on('pointerout', function (pointer, gameObject) {
            this.scene.pointer.switchCursor();

            this.scene.pointer.lbl.visible = true;
        });

        _this2.on('drag', function (pointer, gameObject) {
            game.canvas.style.cursor = "pointer";

            this.x = this.scene.pointer.x + this.scene.drawpanel.camera.scrollX;
            this.y = this.scene.pointer.y + this.scene.drawpanel.camera.scrollY;

            this.scene.pointer.lbl.visible = false;

            this.data.get('vector').set(this.x, this.y);

            if (this.mapping) {
                var m = this.mapping;
                var _this = this;

                for (var t in m.data) {
                    m.src[m.data[t].property] = m.data[t].operator(m.src, _this[t]);
                }
            }

            this.scene.graphics.clear();
            this.scene.draw();
        });

        _this2.lbl = _this2.ui.add.label(_this2.x + 10, _this2.y + 10, "").setFontStyle(PathBuilder.UI.fonts["Point"]);

        return _ret = _this2, _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Point, [{
        key: 'update',
        value: function update() {
            this.lbl.x = this.x + 10;
            this.lbl.y = this.y + 10;
            this.lbl.setText("x: " + this.x + " y: " + this.y);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            //this.scene.drawpanel.elements.pop();
            this.lbl.destroy();
            _get(Point.prototype.__proto__ || Object.getPrototypeOf(Point.prototype), 'destroy', this).call(this);
        }
    }]);

    return Point;
}(Phaser.GameObjects.Image);

exports.default = Point;

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scene = __webpack_require__(52);

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import Phaser from '../dev';


var PathBuilder = function (_Phaser$Plugins$Scene) {
    _inherits(PathBuilder, _Phaser$Plugins$Scene);

    function PathBuilder(scene, pluginManager) {
        _classCallCheck(this, PathBuilder);

        var _this = _possibleConstructorReturn(this, (PathBuilder.__proto__ || Object.getPrototypeOf(PathBuilder)).call(this, scene, pluginManager));

        _this.scene = scene;
        _this.systems = scene.sys;
        return _this;
    }

    _createClass(PathBuilder, [{
        key: 'boot',
        value: function boot() {
            var eventEmitter = this.systems.events;

            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);

            //TODO: rewrite according API
            this.systems.scenePlugin.add('UI', _Scene2.default, true);
        }

        //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.

    }, {
        key: 'shutdown',
        value: function shutdown() {}

        //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.

    }, {
        key: 'destroy',
        value: function destroy() {
            this.shutdown();

            this.scene = undefined;
        }
    }]);

    return PathBuilder;
}(Phaser.Plugins.ScenePlugin);

exports.default = PathBuilder;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Scene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UI = __webpack_require__(53);

var _UI2 = _interopRequireDefault(_UI);

var _Pointer = __webpack_require__(59);

var _Pointer2 = _interopRequireDefault(_Pointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = exports.Scene = function (_Phaser$Scene) {
    _inherits(Scene, _Phaser$Scene);

    function Scene(config) {
        _classCallCheck(this, Scene);

        var _this2 = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, config));

        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', _this2.scroll, false);
            window.onmousewheel = _this2.scroll.bind(_this2);
        }

        return _this2;
    }

    _createClass(Scene, [{
        key: "preload",
        value: function preload() {}
    }, {
        key: "create",
        value: function create() {
            this.tool = { "normal": null, "draw": this.place };
            this.mode = "normal";
            this.cursors = { "normal": "default", "draw": "copy", "select": "default", "hand": "move" };
            this.curves = { "Line": Phaser.Curves.Line, "Ellipse": Phaser.Curves.Ellipse, "QuadraticBezier": Phaser.Curves.QuadraticBezier, "CubicBezier": Phaser.Curves.CubicBezier, "Spline": Phaser.Curves.Spline };

            this.events.emit('switchmode', this.mode);

            this.input.mouse.disableContextMenu();

            this.W = this.cameras.main.width;
            this.H = this.cameras.main.height;
            this.drawmode = "CubicBezier";

            //TODO: seperate class  
            this.vectors = [];

            //reserved for spline building
            this.spline = null;
            this.path = this.add.path();
            this.path.segments = 32;
            this.graphics = this.add.graphics();

            this.drawpanel = new _UI2.default(this);
            this.middle = new _UI2.default(this);
            this.top = new _UI2.default(this);

            //this.drawpanel.elements.push(this.graphics);
            this.graphics.fillStyle(0xff0000, 1);
            this.graphics.fillCircle(10, 10, 8);
            this.graphics.generateTexture('endpoint', 32, 32);
            this.graphics.fillStyle(0x00ff00, 1);
            this.graphics.fillCircle(10, 10, 8);
            this.graphics.generateTexture('controlpoint', 32, 32);
            this.graphics.clear();

            //TODO: rewrite callback implementation
            //TODO: adjust to game size
            this.hidebutton = this.top.add.text(10, 300, 'hide', null, null, null, [this.drawpanel.hide, this.middle.hide], [], [this.drawpanel, this.middle]);
            this.showbutton = this.top.add.text(10, 350, 'show', null, null, null, [this.drawpanel.show, this.middle.show], [], [this.drawpanel, this.middle]);
            this.viewbutton = this.top.add.text(this.W - 100, this.H * 0.1, 'reset view', null, null, null, this.resetView, [], this);

            this.drawbutton = this.middle.add.text(10, 200, 'draw', null, null, null, this.switchmode, ["draw"], this);
            this.clearbutton = this.middle.add.text(10, 100, 'clear', null, null, null, this.clear, [], this);
            this.undobutton = this.middle.add.text(10, 50, 'undo', null, null, null, this.undo, [], this);

            this.importbutton = this.middle.add.text(this.W - 100, this.H - 200, 'import', null, null, null, this.import, [], this);
            this.exportbutton = this.middle.add.text(this.W - 100, this.H - 100, 'export', null, null, null, this.export, [], this);

            this.pausebutton = this.middle.add.text(10, this.H - 200, 'pause', null, null, null, this.freeze, [], this);
            this.resumebutton = this.middle.add.text(10, this.H - 150, 'resume', null, null, null, this.unfreeze, [], this);

            this.previewbutton = this.middle.add.text(10, this.H - 100, 'preview', null, null, null, this.preview, [], this);

            this.modelabel = this.middle.add.label(100, 20, 'mode: ', null, null, null, null, this);
            this.drawmodelabel = this.middle.add.label(400, 20, 'curve: ' + this.drawmode, null, null, null, null, this);

            this.pointer = new _Pointer2.default(this.middle, 100, 100, 'controlpoint');

            this.setCameras();

            this.drawpanel.hide();
            this.middle.hide();

            //TODO: debug internal, remove in prod
            // var gui = new dat.GUI({
            //     width: 200
            // });

            // gui.add(this.drawpanel, 'hide');
            // gui.add(this.drawpanel, 'show');
            // gui.add(this.pointer, 'snap', 1, 100, 2);
        }
    }, {
        key: "update",
        value: function update() {
            this.drawpanel.update();
            this.pointer.update();
            //this.drawpanel.camera.setZoom(Math.sin(this.time.now/100000)+1);
            //this.cameras.main.setZoom(Math.sin(this.time.now/100000)+1);
            //this.middle.camera.setZoom(Math.sin(this.time.now/100000)+1);
            //this.top.camera.setZoom(Math.sin(this.time.now/100000)+1);
        }
    }, {
        key: "setCameras",
        value: function setCameras() {
            this.drawpanel.camera.ignore(this.middle.elements);
            this.drawpanel.camera.ignore(this.top.elements);

            this.middle.camera.ignore(this.graphics);
            this.middle.camera.ignore(this.drawpanel.elements);
            this.middle.camera.ignore(this.top.elements);

            this.top.camera.ignore(this.graphics);
            this.top.camera.ignore(this.middle.elements);
            this.top.camera.ignore(this.drawpanel.elements);

            this.cameras.main.ignore(this.children.list);

            //TODO: move/ rewrite
            this.supercamera = this.sys.game.scene.scenes[0].cameras.main;
        }
    }, {
        key: "switchmode",
        value: function switchmode(mode) {
            this.mode = mode;
            this.modelabel.setText("mode: " + this.mode);
            this.pointer.switchCursor();
            this.events.emit('switchmode', this.mode);
        }
    }, {
        key: "clear",
        value: function clear() {
            var _this = this;
            this.path.curves.forEach(function (curve) {
                _this.undo();
            });
            this.drawpanel.elements.forEach(function (element) {
                element.destroy();
            });
            this.vectors = [];
            this.drawpanel.elements = [];
            this.path.curves = [];
            this.spline = null;

            this.graphics.clear();
        }
    }, {
        key: "undo",
        value: function undo() {
            //TODO: extend curve class  
            if (this.vectors.length > 1) {
                var _this = this;
                var lastcurve = this.path.curves[this.path.curves.length - 1];
                lastcurve.controlpoints.forEach(function (point) {
                    point.destroy();_this.vectors.pop();
                });

                this.path.curves.pop();
                this.spline = null;

                this.graphics.clear();
                this.draw();
            }
        }
    }, {
        key: "place",
        value: function place(ui, x, y) {
            //TODO: extend A curve class for each case, add A factory entry for curves.

            var vector = new Phaser.Math.Vector2(x, y);

            if (this.vectors.length == 0) {
                this.point = ui.add.endpoint(vector, null, 'endpoint');
                return;
            }

            if (this.drawmode == "Line") {

                this.spline = null;

                var previous = this.vectors[this.vectors.length - 1];

                if (this.vectors.length > 0) {
                    var c = new this.curves[this.drawmode](previous, vector);

                    this.path.add(c);
                    c.controlpoints = [];
                }

                this.point = ui.add.endpoint(vector, c, 'endpoint');
            }

            if (this.drawmode == "QuadraticBezier") {

                this.spline = null;

                var control = new Phaser.Math.Vector2(x, y);

                var previous = this.vectors[this.vectors.length - 1];

                control = control.add(previous);
                control = control.divide(new Phaser.Math.Vector2(2, 2));

                var c = new this.curves[this.drawmode](previous, control, vector);

                this.path.add(c);
                c.controlpoints = [];

                this.point = ui.add.controlpoint(control, c, 'controlpoint');

                this.point = ui.add.endpoint(vector, c, 'endpoint');
            }

            if (this.drawmode == "CubicBezier") {

                this.spline = null;

                var control1 = new Phaser.Math.Vector2(x, y);
                var control2 = new Phaser.Math.Vector2(x, y);

                var previous = this.vectors[this.vectors.length - 1];

                control1.x = previous.x + (x - previous.x) * 0.25;
                control1.y = previous.y + (y - previous.y) * 0.25;

                control2.x = previous.x + (x - previous.x) * 0.75;
                control2.y = previous.y + (y - previous.y) * 0.75;

                var c = new this.curves[this.drawmode](previous, control1, control2, vector);

                this.path.add(c);
                c.controlpoints = [];

                this.point = ui.add.controlpoint(control1, c, 'controlpoint');
                this.point = ui.add.controlpoint(control2, c, 'controlpoint');

                this.point = ui.add.endpoint(vector, c, 'endpoint');
            }

            if (this.drawmode == "Spline") {

                var previous = this.vectors[this.vectors.length - 1];

                if (this.spline == null) {
                    var c = new this.curves[this.drawmode]([previous.x, previous.y, vector.x, vector.y]);
                    this.spline = c;

                    this.path.add(c);
                    c.controlpoints = [];
                }

                this.path.segments += 8;

                if (this.vectors.length == 1) {

                    this.point = ui.add.controlpoint(vector, this.spline, 'controlpoint');
                } else {

                    this.point = ui.add.controlpoint(vector, this.spline, 'controlpoint');

                    this.spline.addPoints([vector.x, vector.y]);
                }

                this.spline.points[this.spline.points.length - 1] = vector;
                this.spline.points[this.spline.points.length - 2] = previous;
            }

            if (this.drawmode == "Ellipse") {

                this.spline = null;

                var previous = this.vectors[this.vectors.length - 1];

                var c = new this.curves[this.drawmode](vector.x, vector.y, 100, 100);

                this.path.add(c);
                c.controlpoints = [];

                c.p0 = vector;

                var dist = new Phaser.Math.Vector2(vector.x + 100, vector.y + 100);

                //map control point coordinates to radii
                this.point = ui.add.endpoint(vector, c, 'endpoint');

                this.point = ui.add.controlpoint(dist, c, 'controlpoint', {
                    "src": c,
                    "data": {
                        "x": { "property": "xRadius", "operator": function operator(src, x) {
                                return src.p0.x - x;
                            } },
                        "y": { "property": "yRadius", "operator": function operator(src, y) {
                                return src.p0.y - y;
                            } }
                    }
                });

                var anglevec = new Phaser.Math.Vector2(c.p0.x, c.p0.y + c.yRadius);
            }

            this.draw();

            this.setCameras();
        }
    }, {
        key: "move",
        value: function move(graphics, vector) {}
    }, {
        key: "draw",
        value: function draw() {
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xffffff, 1);
            this.graphics.fillStyle(0xffffff, 1);
            this.path.draw(this.graphics, this.path.segments);
        }
    }, {
        key: "look",
        value: function look(camera) {
            camera.scrollY = this.pointer.lastY - this.input.activePointer.y;
            camera.scrollX = this.pointer.lastX - this.input.activePointer.x;
        }
    }, {
        key: "scroll",
        value: function scroll(event) {
            var delta = 0;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }
            // TODO: move to pointer 
            if (delta > 0) {
                game.canvas.style.cursor = "zoom-in";
            }
            if (delta < 0) {
                game.canvas.style.cursor = "zoom-out";
            }

            this.time.delayedCall(250, this.pointer.switchCursor, [], this.pointer);

            this.drawpanel.camera.zoom += delta * 0.1;
            this.supercamera.zoom += delta * 0.1;

            return delta;
        }
    }, {
        key: "resetView",
        value: function resetView() {
            this.drawpanel.camera.zoom = 1;
            this.supercamera.zoom = 1;
            this.drawpanel.camera.setScroll(0, 0);
            this.supercamera.setScroll(0, 0);
        }
    }, {
        key: "freeze",
        value: function freeze() {
            this.scene.manager.scenes[0].scene.pause();
        }
    }, {
        key: "unfreeze",
        value: function unfreeze() {
            this.scene.manager.scenes[0].scene.resume();
        }
    }, {
        key: "importJSON",
        value: function importJSON() {
            var data = this.cache.json.get('data');
            this.path = this.path.fromJSON(data);
            this.draw();
        }
    }, {
        key: "exportJON",
        value: function exportJON() {
            var data = JSON.stringify(this.path.toJSON());
            console.log(data);
            var file = new Blob([data], ["data.json"]);
            var url = URL.createObjectURL(file);
            var link = document.createElement('a');
            link.href = url;
            link.download = "data.json";
            link.click();
        }
    }, {
        key: "preview",
        value: function preview() {
            if (this.path.curves.length !== 0) {
                var follower = this.add.follower(this.path, 0, 0, 'dude');

                this.cameras.main.ignore(follower);
                this.middle.camera.ignore(follower);
                this.top.camera.ignore(follower);

                follower.startFollow({
                    duration: 2000,
                    rotateToPath: true,
                    yoyo: true,
                    onComplete: function onComplete(t, s, w) {
                        w.destroy();
                    },
                    onCompleteParams: [follower],
                    ease: 'Cubic.easeInOut'
                });
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {}
    }]);

    return Scene;
}(Phaser.Scene);

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Menu = __webpack_require__(54);

var _Menu2 = _interopRequireDefault(_Menu);

var _Button = __webpack_require__(55);

var _Button2 = _interopRequireDefault(_Button);

var _Point = __webpack_require__(23);

var _Point2 = _interopRequireDefault(_Point);

var _EndPoint = __webpack_require__(56);

var _EndPoint2 = _interopRequireDefault(_EndPoint);

var _ControlPoint = __webpack_require__(57);

var _ControlPoint2 = _interopRequireDefault(_ControlPoint);

var _Label = __webpack_require__(58);

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//TODO: find sol
var _fonts = {
    "Button": { fontFamily: 'Arial', fontSize: 16, color: '#00ff00' },
    "Point": { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' },
    "EndPoint": { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' },
    "ControlPoint": { fontFamily: 'Arial', fontSize: 10, color: '#00ff00' },
    "Label": { fontFamily: 'Arial', fontSize: 16, color: '#ffff00' }
};

var UI = function () {
    function UI(scene) {
        _classCallCheck(this, UI);

        this.scene = scene;
        this.elements = [];

        this.add = {
            menu: function menu(x, y) {
                var m = new _Menu2.default(this.ui, x, y);
                this.ui.scene.add.existing(m);
                return m;
            },
            text: function text(x, y, _text, key, frame, target, callback, args, context) {
                var tb = new _Button2.default(this.ui, x, y, _text, key, frame, target, callback, args, context);
                this.ui.scene.add.existing(tb);
                return tb;
            },
            point: function point(vector, curve, key, mapping) {
                var p = new _Point2.default(this.ui, vector, curve, key, mapping);
                this.ui.scene.add.existing(p);
                return p;
            },
            endpoint: function endpoint(vector, curve, key, mapping) {
                var p = new _EndPoint2.default(this.ui, vector, curve, key, mapping);
                this.ui.scene.add.existing(p);
                return p;
            },
            controlpoint: function controlpoint(vector, curve, key, mapping) {
                var p = new _ControlPoint2.default(this.ui, vector, curve, key, mapping);
                this.ui.scene.add.existing(p);
                return p;
            },
            label: function label(x, y, text, target, callback, args, context) {
                var l = new _Label2.default(this.ui, x, y, text, target, callback, args, context);
                this.ui.scene.add.existing(l);
                return l;
            }
            // image: function (x, y, key, frame) {
            //     var i = new Image(this.ui, x, y, key, frame);
            //     this.ui.scene.add.existing(i);
            //     return i;
            // }
        };
        this.add.ui = this;
        this.camera = this.scene.cameras.add();
    }

    _createClass(UI, [{
        key: "hide",
        value: function hide() {
            this.elements.forEach(function (element) {
                element.visible = false;
            });
            this.scene.switchmode("normal");
            this.translate(0, this.scene.cameras.main.height, 400, this.scene.unfreeze);
        }
    }, {
        key: "show",
        value: function show() {
            this.elements.forEach(function (element) {
                element.visible = true;
            });
            this.scene.switchmode("normal");
            this.translate(0, 0, 400, this.scene.freeze);
        }
    }, {
        key: "translate",
        value: function translate(x, y, speed, callback) {
            this.scene.tweens.add({
                targets: this.camera,
                scrollX: x,
                scrollY: y,
                duration: speed,
                ease: "Cubic.easeOut"
            });
            this.scene.time.delayedCall(speed, callback, [], this.scene);
        }
    }, {
        key: "update",
        value: function update() {
            this.elements.forEach(function (element) {
                element.update();
            });
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.elements.forEach(function (element) {
                element.destroy();
            });
        }
    }], [{
        key: "fonts",
        get: function get() {
            return _fonts;
        }
    }]);

    return UI;
}();

exports.default = UI;

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = __webpack_require__(10);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$GameObjects$C) {
    _inherits(Menu, _Phaser$GameObjects$C);

    function Menu(ui, x, y) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, ui.scene, x, y));

        _Element2.default.call(_this, ui, x, y);
        return _this;
    }

    _createClass(Menu, [{
        key: "add",
        value: function add(x, y, item, callback, args, context) {
            this[item] = this.ui.add.text(x, y, item, null, null, null, callback, args, context).setFontStyle(PathBuilder.UI.fonts["Button"]);
            Phaser.GameObjects.Container.prototype.add.call(this, this[item]);
            return this[item];
        }
    }, {
        key: "update",
        value: function update() {}
    }, {
        key: "hide",
        value: function hide() {
            this.list.forEach(function (element) {
                element.setVisible(false);
            });
        }
    }, {
        key: "show",
        value: function show() {
            this.list.forEach(function (element) {
                element.setVisible(true);
            });
        }
    }, {
        key: "divide",
        value: function divide() {}
    }]);

    return Menu;
}(Phaser.GameObjects.Container);

exports.default = Menu;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = __webpack_require__(10);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Phaser$GameObjects$T) {
    _inherits(Button, _Phaser$GameObjects$T);

    function Button(ui, x, y, text, key, frame, target, callbacks, args, context) {
        var _ret;

        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, ui.scene, x, y, text, PathBuilder.UI.fonts["Button"]));

        _Element2.default.call(_this, ui, x, y);

        _this.target = target;
        _this.callbacks = callbacks;
        _this.args = args;
        _this.callbackcontext = context;
        _this.tween = null;

        _this.setInteractive();

        _this.on('pointerdown', function (pointer, gameObject) {
            this.click();
        });
        _this.on('pointerover', function (pointer, gameObject) {
            this.hover();
        });
        _this.on('pointerout', function (pointer, gameObject) {
            this.out();
        });

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Button, [{
        key: "click",
        value: function click() {
            _Element2.default.prototype.click.call(this);
            this.tween = this.scene.tweens.add({ targets: this, scaleX: 1.2, scaleY: 1.2, duration: 100, ease: 'Linear', yoyo: true });
        }
    }, {
        key: "hover",
        value: function hover() {
            game.canvas.style.cursor = "pointer";
            _Element2.default.prototype.hover.call(this);
            this.setScale(1.1, 1.1);
        }
    }, {
        key: "out",
        value: function out() {
            this.scene.pointer.switchCursor();
            _Element2.default.prototype.out.call(this);
            this.setScale(1, 1);
        }
    }]);

    return Button;
}(Phaser.GameObjects.Text);

exports.default = Button;

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Point2 = __webpack_require__(23);

var _Point3 = _interopRequireDefault(_Point2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndPoint = function (_Point) {
    _inherits(EndPoint, _Point);

    function EndPoint(ui, vector, curve, key, mapping) {
        _classCallCheck(this, EndPoint);

        var _this = _possibleConstructorReturn(this, (EndPoint.__proto__ || Object.getPrototypeOf(EndPoint)).call(this, ui, vector, curve, key, mapping));

        _this.lbl.setFontStyle(PathBuilder.UI.fonts["EndPoint"]);
        return _this;
    }

    return EndPoint;
}(_Point3.default);

exports.default = EndPoint;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Point2 = __webpack_require__(23);

var _Point3 = _interopRequireDefault(_Point2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlPoint = function (_Point) {
    _inherits(ControlPoint, _Point);

    function ControlPoint(ui, vector, curve, key, mapping) {
        _classCallCheck(this, ControlPoint);

        var _this = _possibleConstructorReturn(this, (ControlPoint.__proto__ || Object.getPrototypeOf(ControlPoint)).call(this, ui, vector, curve, key, mapping));

        _this.setScale(0.75, 0.75);

        _this.lbl.setFontStyle(PathBuilder.UI.fonts["ControlPoint"]);
        _this.lbl.visible = false;

        _this.on('pointermove', function (pointer, gameObject) {
            this.lbl.visible = true;
        });

        _this.on('pointerout', function (pointer, gameObject) {
            this.lbl.visible = false;
        });

        _this.on('dragend', function (pointer, gameObject) {
            this.lbl.visible = false;
        });
        return _this;
    }

    return ControlPoint;
}(_Point3.default);

exports.default = ControlPoint;

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Element = __webpack_require__(10);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Label = function (_Phaser$GameObjects$T) {
    _inherits(Label, _Phaser$GameObjects$T);

    function Label(ui, x, y, text, target, callbacks, args, context) {
        var _ret;

        _classCallCheck(this, Label);

        var _this = _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this, ui.scene, x, y, text, PathBuilder.UI.fonts["Label"]));

        _Element2.default.call(_this, ui, x, y);

        _this.target = target;
        _this.callbacks = callbacks;
        _this.callbackcontext = context;
        _this.args = args;
        _this.tween = null;

        _this.setInteractive();

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    return Label;
}(Phaser.GameObjects.Text);

exports.default = Label;

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = __webpack_require__(10);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pointer = function (_Phaser$GameObjects$I) {
    _inherits(Pointer, _Phaser$GameObjects$I);

    function Pointer(ui, x, y, key, frame) {
        _classCallCheck(this, Pointer);

        var _this = _possibleConstructorReturn(this, (Pointer.__proto__ || Object.getPrototypeOf(Pointer)).call(this, ui.scene, x, y, key));

        _Element2.default.call(_this, ui, x, y);

        _this.alpha = 0.5;

        _this.snap = 50;

        //global input listener 

        _this.scene.input.on('pointerdown', function (pointer, gameObject) {

            if (this.scene.mode == "draw" && pointer.dragState == 0 && pointer.leftButtonDown()) {
                if (gameObject.length == 0 && pointer.x > 50 && pointer.x < this.scene.W - 100) {

                    var _dx = this.scene.drawpanel.camera.scrollX;
                    var _dy = this.scene.drawpanel.camera.scrollY;

                    this.scene.place(this.scene.drawpanel, this.x + _dx, this.y + _dy);
                }
            }

            if (pointer.rightButtonDown() && pointer.dragState == 0) {
                this.lockX = pointer.x;
                this.lockY = pointer.y;

                this.scene.switchmode("select");
            }

            if (pointer.middleButtonDown()) {
                this.lastX = pointer.x + this.scene.drawpanel.camera.scrollX;
                this.lastY = pointer.y + this.scene.drawpanel.camera.scrollY;

                this.scene.switchmode("hand");
            }
        }, _this);

        _this.scene.input.on('pointerup', function (pointer, gameObject) {
            if (pointer.middleButtonDown()) {
                this.scene.switchmode("normal");
            }
        }, _this);

        _this.snapkey = _this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        _this.lbl = _this.ui.add.label(x + 20, y + 20, "").setFontStyle(PathBuilder.UI.fonts["Label"]);

        _this.menu = _this.ui.add.menu(x, y);

        _this.menu.add(-50, -50, "Line", _this.switchdrawmode, ["Line"], _this);
        _this.menu.add(0, -50, "Quadratic", _this.switchdrawmode, ["Quadratic"], _this);
        _this.menu.add(50, -50, "Cubic", _this.switchdrawmode, ["Cubic"], _this);
        _this.menu.add(-50, 50, "Spline", _this.switchdrawmode, ["Spline"], _this);
        _this.menu.add(0, 50, "Ellipse", _this.switchdrawmode, ["Ellipse"], _this);

        _this.scene.events.on('switchmode', _this.switchmode, _this);

        _this.scene.add.existing(_this);

        return _this;
    }

    _createClass(Pointer, [{
        key: "switchmode",
        value: function switchmode(mode) {

            if (mode == "draw") {
                // TODO: abstraction

                this.setVisible(true);
                this.lbl.setVisible(true);
                this.menu.hide();
            }
            if (mode == "normal") {

                this.setVisible(false);
                this.menu.hide();
            }
            if (mode == "select") {
                this.setVisible(false);

                this.menu.setPosition(this.x, this.y);
                this.menu.show();
            }
            if (mode == "hand") {
                game.canvas.style.cursor = "grab";

                this.setVisible(true);
                this.lbl.setVisible(true);
            }
        }
    }, {
        key: "switchCursor",
        value: function switchCursor() {
            game.canvas.style.cursor = this.scene.cursors[this.scene.mode];
        }
    }, {
        key: "switchdrawmode",
        value: function switchdrawmode(mode) {
            this.scene.drawmode = mode;
            this.scene.drawmodelabel.setText("curve: " + mode);
            this.menu.hide();
            this.scene.switchmode("draw");
        }
    }, {
        key: "update",
        value: function update() {

            this.x = this.scene.input.activePointer.x;
            this.y = this.scene.input.activePointer.y;

            if (this.scene.mode == "hand") {
                this.scene.look(this.scene.drawpanel.camera);
                this.scene.look(this.scene.supercamera);
            }

            if (this.scene.mode == "select") {
                if (Phaser.Math.Distance.Between(this.x, this.y, this.lockX, this.lockY) > 150) {
                    this.scene.switchmode("draw");
                }
            }

            if (this.scene.mode !== "select") {

                if (this.snapkey.isDown) {
                    this.x = Math.round(this.x / this.snap) * this.snap;
                    this.y = Math.round(this.y / this.snap) * this.snap;
                }
                this.lbl.setPosition(this.x + 20, this.y + 20);
                this.lbl.setText("x: " + this.x + " y: " + this.y);
            }
        }
    }]);

    return Pointer;
}(Phaser.GameObjects.Image);

exports.default = Pointer;

/***/ })

/******/ });
});