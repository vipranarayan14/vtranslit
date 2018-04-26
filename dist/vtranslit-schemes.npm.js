(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vTranslitSchemes"] = factory();
	else
		root["vTranslitSchemes"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vTranslitSchemes = undefined;

var _findScheme = __webpack_require__(1);

var _getAvailableSchemes = __webpack_require__(3);

var _getScheme = __webpack_require__(4);

var vTranslitSchemes = exports.vTranslitSchemes = function vTranslitSchemes(schemes) {
  return {

    findScheme: (0, _findScheme.findScheme)(schemes),
    getAvailableSchemes: (0, _getAvailableSchemes.getAvailableSchemes)(schemes),
    getScheme: (0, _getScheme.getScheme)(schemes)

  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findScheme = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = __webpack_require__(2);

var findSchemeForChar = function findSchemeForChar(schemes) {
  return function (char) {
    return schemes.find(function (scheme) {

      var unicodeBlock = scheme.about.unicodeBlock;

      var _unicodeBlock$split$m = unicodeBlock.split('-').map(function (limit) {
        return parseInt(limit, 16);
      }),
          _unicodeBlock$split$m2 = _slicedToArray(_unicodeBlock$split$m, 2),
          lowerLimit = _unicodeBlock$split$m2[0],
          upperLimit = _unicodeBlock$split$m2[1];

      var charCode = char.charCodeAt(0);

      return charCode >= lowerLimit && charCode <= upperLimit;
    });
  };
};

var findScheme = exports.findScheme = function findScheme(schemes) {
  return function (str) {

    var maxSampleSize = 10;
    var sampleStr = str.slice(0, maxSampleSize);

    var schemeForChars = [];

    sampleStr.split('').forEach(function (char) {

      var schemeForChar = findSchemeForChar(schemes)(char);

      if (schemeForChar) {

        schemeForChars.push(schemeForChar.about.code);
      }
    });

    return (0, _utils.maxOcurrance)(schemeForChars);
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var maxOcurrance = exports.maxOcurrance = function maxOcurrance(array) {

  var counts = {};

  var compare = 0,
      mostOccured = null;

  array.forEach(function (word) {

    if (counts[word] === undefined) {

      counts[word] = 1;
    } else {

      counts[word] += 1;
    }

    if (counts[word] > compare) {

      compare = counts[word];
      mostOccured = word;
    }
  });

  return mostOccured;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAvailableSchemes = exports.getAvailableSchemes = function getAvailableSchemes(schemes) {
  return function () {

    var availableSchemes = [];

    schemes.forEach(function (scheme) {

      availableSchemes.push({
        code: scheme.about.code,
        name: scheme.about.name
      });
    });

    return availableSchemes;
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getScheme = exports.getScheme = function getScheme(schemes) {
  return function (schemeCode) {

    var scheme = schemes.find(function (_scheme) {
      return _scheme.about.code === schemeCode;
    });

    if (scheme) {

      return scheme;
    }

    throw new Error("No Scheme found with the given schemeCode: '" + schemeCode + "'");
  };
};

/***/ })
/******/ ])["vTranslitSchemes"];
});