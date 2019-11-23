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

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\nconst CONSTANTS = {\n    GRAVITY: 0.8,\n    FLAP_SPEED: 8,\n    TERMINAL_VEL: 12,\n    BIRD_WIDTH: 40,\n    BIRD_HEIGHT: 30\n};\nclass Bird {\n\nconstructor(dimensions) {\n    this.dimensions = dimensions;\n    this.x = dimensions.width / 3;\n    this.y = dimensions.height / 2;\n    this.velocity = 0;\n}\n\nanimate(ctx){\n    this.moveBird();\n    this.drawBird(ctx);\n}\n\nmoveBird() {\n    this.y += this.velocity;\n    this.velocity += CONSTANTS.GRAVITY;\n}\n\nflap() {\n    this.velocity = -1 * CONSTANTS.FLAP_SPEED;\n}\n\n\ndrawBird(ctx){\n    ctx.fillStyle = \"yellow\";\n    ctx.fillRect(this.x,this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n}\n\n\n}\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlappyBird; });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nclass FlappyBird {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.registerEvents();\n    this.restart();\n  }\n\n  play(){\n    this.running = true;\n    this.animate();\n  }\n\n  registerEvents(){\n    this.clickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.clickHandler);\n  }\n\n  click(e) {\n    if (!this.running) {\n      this.play()\n    }\n    this.bird.flap();\n  }\n\n  restart() {\n    this.running = false;\n    this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n\n    this.animate();\n  }\n\n  animate() {\n    this.level.animate(this.ctx);\n    this.bird.animate(this.ctx);\n\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('bird-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n  PIPE_SPACING: 220,\n  GAP_HEIGHT: 150,\n  PIPE_WIDTH: 50,\n  EDGE_BUFFER: 50\n}\n\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n\n    const firstPipe = this.dimensions.width + 100;\n\n    this.pipes = [\n      this.newPipe(firstPipe),\n      this.newPipe(firstPipe + CONSTANTS.PIPE_SPACING),\n      this.newPipe(firstPipe + (2 * CONSTANTS.PIPE_SPACING))\n    ];\n  }\n\n  newPipe(x) {\n    const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;\n    const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n    const pipe = {\n      topPipe: {\n        left: x,\n        right: CONSTANTS.PIPE_WIDTH + x,\n        top: 0,\n        bottom: gapTop\n      },\n        bottomPipe: {\n          left: x,\n          right: CONSTANTS.PIPE_WIDTH + x,\n          top: gapTop + CONSTANTS.GAP_HEIGHT,\n          bottom: this.dimensions.height\n      }\n    };\n    return pipe;\n  }\n\n  movePipes(ctx){\n    this.eachPipe(function(pipe) {\n      pipe.topPipe.left -= 2;\n      pipe.topPipe.right -= 2;\n      pipe.bottomPipe.left -= 2;\n      pipe.bottomPipe.right -= 2;\n    });\n\n    if (this.pipes[0].topPipe.right <= 0) {\n      this.pipes.shift();\n      const newX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACING;\n      this.pipes.push(this.newPipe(newX));\n    }\n  }\n\n  drawPipes(ctx){\n    this.eachPipe(function(pipe) {\n      ctx.fillStyle = \"green\";\n\n      ctx.fillRect(\n        pipe.topPipe.left,\n        pipe.topPipe.top,\n        CONSTANTS.PIPE_WIDTH,\n        pipe.topPipe.bottom - pipe.topPipe.top\n      );\n\n      ctx.fillRect(\n        pipe.bottomPipe.left,\n        pipe.bottomPipe.top,\n        CONSTANTS.PIPE_WIDTH,\n        pipe.bottomPipe.bottom - pipe.bottomPipe.top\n      );\n    });\n  }\n\n  eachPipe(callback){\n    this.pipes.forEach(callback.bind(this));\n  }\n\n\n  drawBackground(ctx) {\n    ctx.fillStyle = \"skyblue\";\n    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  animate(ctx){\n    this.drawBackground(ctx);\n    this.movePipes();\n    this.drawPipes(ctx);\n  }\n\n\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });