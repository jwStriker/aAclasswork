/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n    COLOR: \"#60c9dd\",\n    RADIUS: 30,\n    SPEED: 4\n};\n\nfunction Asteroid(options) {\n    options = options || {};\n    options.color = DEFAULTS.COLOR;\n    options.radius = DEFAULTS.RADIUS;\n    options.pos = 0;\n    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n\n    MovingObject.call(this,options);\n};\n\n// Asteroid.prototype.randPosition = function randPosition() {\n//     return [\n//         1000 * Math.random(),\n//         600 * Math.random()\n//     ];\n// };\n\nAsteroid.prototype.collideWith = function collideWith(otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n        return true;\n    }\n    return false;\n};\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nfunction Game() {\n    this.asteroids = [];\n    this.addAsteroids();\n    this.ships = [];\n    this.addShip();\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 1;\nGame.BG_COLOR = '#9d9d9d';\n\nGame.prototype.addShip = function addShip() {\n    const ship = new Ship ({\n        pos: this.randomPosition(),\n        game: this\n    });\n    ship.game = this;\n    this.ships.push(ship);\n    return ship;\n};\n\nGame.prototype.draw = function draw(ctx) {\n    ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n    for (let i = 0; i < this.asteroids.length; i++) {\n        this.asteroids[i].draw(ctx);\n    };\n    \n    this.ships[0].draw(ctx);\n\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n        for (let j = 0; j < allObjects.length; j++) {\n           const obj1 = allObjects[i];\n            const obj2 = allObjects[j];\n            \n            if (obj1.isCollidedWith(obj2)) {\n                console.log(\"made it here\")\n                const collision = obj1.collideWith(obj2);\n                if (collision) return;\n            }\n        }\n    }\n};\n\nGame.prototype.step = function step() {\n    this.moveObjects();\n    this.checkCollisions();\n};\n\nGame.prototype.addAsteroids = function addAsteroids() {\n    // debugger;\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n        const stroid = new Asteroid();\n        stroid.pos = [\n            Math.floor(1000 * Math.random()),\n            Math.floor(600 * Math.random())\n        ];\n        stroid.game = this;\n        this.asteroids.push(stroid);\n    }\n};\n\nGame.prototype.moveObjects = function moveObjects() {\n    this.asteroids.forEach(function (asteroid) {\n        asteroid.move();\n    });\n};\n\nGame.prototype.wrap = function wrap(pos) {\n    return [\n        Util.wrap(pos[0], 1000), Util.wrap(pos[1], 600)\n    ];\n};\n\nGame.prototype.remove = function remove(object) {\n    this.asteroids.splice(this.asteroids.indexOf(object), 1);\n}\n\nGame.prototype.randomPosition = function randomPosition() {\n    this.pos = [Math.floor(Math.random * Game.DIM_X), Math.floor(Math.random * Game.DIM_Y)];\n    // return this.pos;\n};\n\nGame.prototype.allObjects = function allObjects() {\n    allObjs = [];\n    this.asteroids.forEach( asteroid => allObjs.push(asteroid));\n    allObjs.push(this.ships[0]);\n\n    return allObjs;\n}\n\n\nmodule.exports = Game;\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction GameView(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n}\n\nGameView.prototype.start = function start() {\n    setInterval(function() {\n        this.game.draw(ctx);\n        this.game.step();\n    }, 20);\n};\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvasElement = document.getElementById(\"game-canvas\");\n    canvasElement.width = 1000;\n    canvasElement.height = 600;\n\n    const ctx = canvasElement.getContext(\"2d\");\n    window.ctx = ctx;\n    // const game = new Game();\n});\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\nwindow.GameView = GameView;\nwindow.Ship = Ship;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\")\n\nfunction MovingObject(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n    ctx.fill();\n}\n\nMovingObject.prototype.move = function() {\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n\n    this.pos = this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n    const centerDistance = Util.dist(this.pos, otherObject.pos);    \n    return centerDistance < (this.radius + otherObject.radius - 6);\n};\n\nMovingObject.prototype.collideWith = function collideWith(otherObject) {\n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Ship(options) {\n    options.radius = 15;\n    options.color = \"#fdf6e3\";\n    options.vel = options.vel || [0,0];\n    options.pos = options.pos || [500,300];\n\n    MovingObject.call(this, options)\n}\n\nShip.prototype.relocate = function relocate() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n};\n\nUtil.inherits(Ship, MovingObject);\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n\n    inherits(ChildClass, ParentClass) {\n        ChildClass.prototype = Object.create(ParentClass.prototype);\n        ChildClass.prototype.constructor = ChildClass;\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    dist(pos1, pos2) {\n        return Math.sqrt(\n            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n        );\n    },  \n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];        \n    },\n    wrap(xory, max) {\n        if (xory < 0 ) {\n            return max - (xory % max);\n        } else if (xory > max) {\n            return xory % max;\n        } else {\n           return xory;\n        }\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });