(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vTranslit"] = factory();
	else
		root["vTranslit"] = factory();
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
exports.vTranslit = undefined;

var _makeSchemeTree = __webpack_require__(1);

var _getTokenDetails = __webpack_require__(2);

var _manageSchemes = __webpack_require__(3);

var _prepareOptions = __webpack_require__(8);

var _processTokens2 = __webpack_require__(9);

var _translitTokens = __webpack_require__(10);

var _vtokenize = __webpack_require__(11);

var init = function init(getScheme) {
  return function (fromSchemeCode, toSchemeCode, userOptions) {

    if (fromSchemeCode === toSchemeCode) {

      return function (inStr) {
        return inStr;
      };
    }

    var options = (0, _prepareOptions.prepareOptions)(userOptions);

    var fromScheme = getScheme(fromSchemeCode);
    var toScheme = getScheme(toSchemeCode);

    var _makeFromSchemeTree = (0, _makeSchemeTree.makeFromSchemeTree)(fromScheme),
        fromSchemeTree = _makeFromSchemeTree.fromSchemeTree,
        maxTokenLength = _makeFromSchemeTree.maxTokenLength;

    var toSchemeTree = (0, _makeSchemeTree.makeToSchemeTree)(toScheme);

    return function (inStr) {

      var tokens = (0, _vtokenize.vTokenize)(inStr, maxTokenLength, (0, _getTokenDetails.getTokenDetails)(fromSchemeTree, options));

      var _processTokens = (0, _processTokens2.processTokens)(tokens, fromSchemeTree, toScheme),
          processedTokens = _processTokens.processedTokens,
          tokensType = _processTokens.tokensType;

      var outStr = (0, _translitTokens.translitTokens)(processedTokens, tokensType, toSchemeTree, options);

      return outStr.join('');
    };
  };
};

var vTranslit = exports.vTranslit = function vTranslit() {
  var schemes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


  if (!schemes.length) {

    throw new Error('Function vTranslit requires vtranslit schemes in an array format.');
  }

  var schemesManager = (0, _manageSchemes.manageSchemes)(schemes);

  return {

    find: schemesManager.find,
    init: init(schemesManager.get),
    list: schemesManager.list

  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAkshara = function getAkshara(akshara) {
  return Array.isArray(akshara) ? akshara[0] : akshara;
};

var makeFromSchemeLeaf = function makeFromSchemeLeaf(akshara, aksharaIndex, alternateIndex, schemeBranch, schemeSubset, tokenLengths) {

  if (akshara) {

    schemeBranch[akshara] = {

      aksharaIndex: schemeSubset + '#' + aksharaIndex,
      alternateIndex: alternateIndex,
      char: akshara,
      type: schemeSubset

    };

    tokenLengths.push(akshara.length);
  }
};

var makeToSchemeLeaf = function makeToSchemeLeaf(akshara, aksharaIndex, scheme, schemeBranch, schemeSubset, addSchemeSubset) {

  var charDetails = {
    char: {},
    type: schemeSubset
  };

  if (addSchemeSubset) {

    var addAkshara = scheme.data[addSchemeSubset][aksharaIndex];

    charDetails.char[addSchemeSubset] = getAkshara(addAkshara);
  }

  charDetails.char[schemeSubset] = getAkshara(akshara);

  schemeBranch[schemeSubset + '#' + aksharaIndex] = charDetails;
};

// returns a branch for fromSchemeTree.
var makeFromSchemeBranch = function makeFromSchemeBranch(scheme, schemeSubset, tokenLengths) {

  var schemeBranch = {};

  if (scheme.about.type === 'roman' && schemeSubset === 'consonants') {

    return schemeBranch;
  };

  scheme.data[schemeSubset].forEach(function (akshara, aksharaIndex) {

    if (!Array.isArray(akshara)) {

      makeFromSchemeLeaf(akshara, aksharaIndex, 0, schemeBranch, schemeSubset, tokenLengths);

      return;
    }

    akshara.forEach(function (alternateAkshara, alternateIndex) {

      makeFromSchemeLeaf(alternateAkshara, aksharaIndex, alternateIndex, schemeBranch, schemeSubset, tokenLengths);
    });
  });

  return schemeBranch;
};

// Returns a branch for toSchemeTree.
var makeToSchemeBranch = function makeToSchemeBranch(scheme, schemeSubset) {
  var addSchemeSubset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';


  var schemeBranch = {};

  scheme.data[schemeSubset].forEach(function (akshara, aksharaIndex) {

    makeToSchemeLeaf(akshara, aksharaIndex, scheme, schemeBranch, schemeSubset, addSchemeSubset);
  });

  return schemeBranch;
};

//Returns a scheme tree nade with given 'fromScheme'.
var makeFromSchemeTree = exports.makeFromSchemeTree = function makeFromSchemeTree(fromScheme) {

  var tokenLengths = [];

  var maxTokenLength = 0;

  var fromSchemeTree = Object.assign({}, makeFromSchemeBranch(fromScheme, 'deadConsonants', tokenLengths), makeFromSchemeBranch(fromScheme, 'consonants', tokenLengths), makeFromSchemeBranch(fromScheme, 'vowels', tokenLengths), makeFromSchemeBranch(fromScheme, 'vowelMarks', tokenLengths), makeFromSchemeBranch(fromScheme, 'ayogavaha', tokenLengths), makeFromSchemeBranch(fromScheme, 'symbols', tokenLengths));

  maxTokenLength = Math.max.apply(Math, tokenLengths);

  return { fromSchemeTree: fromSchemeTree, maxTokenLength: maxTokenLength };
};

//Returns a scheme tree nade with given 'toScheme'.
var makeToSchemeTree = exports.makeToSchemeTree = function makeToSchemeTree(toScheme) {

  var toSchemeTree = {};

  toSchemeTree = Object.assign({}, toSchemeTree, makeToSchemeBranch(toScheme, 'deadConsonants', 'consonants'), makeToSchemeBranch(toScheme, 'consonants', 'deadConsonants'), makeToSchemeBranch(toScheme, 'vowels', 'vowelMarks'), makeToSchemeBranch(toScheme, 'vowelMarks', 'vowels'), makeToSchemeBranch(toScheme, 'ayogavaha'), makeToSchemeBranch(toScheme, 'symbols'));

  return toSchemeTree;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var reservedCharsList = {

  ' ': {
    type: 'pause'
  },

  '_': {
    type: 'skip'
  }

};

var markers = {

  '#{': {
    type: 'marker-open-toggle-mode'
  },

  '}#': {
    type: 'marker-close-toggle-mode'
  }

};

var findInReservedTokens = function findInReservedTokens(char, reservedChars) {

  var reservedChar = reservedChars[char];

  return reservedChar ? Object.assign({}, reservedChar, { char: char }) : null;
};

var initReservedTokens = function initReservedTokens(options) {
  return options.translitMode > 0 ? Object.assign({}, reservedCharsList, markers) : reservedCharsList;
};

var getTokenDetails = exports.getTokenDetails = function getTokenDetails(fromSchemeTree, options) {
  return function (token) {

    var reservedTokens = initReservedTokens(options);

    var tokenInReservedTokens = findInReservedTokens(token, reservedTokens);
    var tokenInFromSchemeTree = fromSchemeTree[token];

    var unknownTokenDetails = {
      char: token,
      type: 'unknown'
    };

    if (tokenInReservedTokens) {

      return tokenInReservedTokens;
    } else if (tokenInFromSchemeTree) {

      return tokenInFromSchemeTree;
    }

    return unknownTokenDetails;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manageSchemes = undefined;

var _findScheme = __webpack_require__(4);

var _getScheme = __webpack_require__(6);

var _listAvailableSchemes = __webpack_require__(7);

var manageSchemes = exports.manageSchemes = function manageSchemes(schemes) {
  return {

    find: (0, _findScheme.findScheme)(schemes),
    get: (0, _getScheme.getScheme)(schemes),
    list: (0, _listAvailableSchemes.listAvailableSchemes)(schemes)

  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findScheme = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = __webpack_require__(5);

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

    if (!str || typeof str !== 'string') {

      throw new Error('Function requires a string to find its scheme');
    }

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
/* 5 */
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
/* 6 */
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var listAvailableSchemes = exports.listAvailableSchemes = function listAvailableSchemes(schemes) {
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultOptions = {

  translitMode: 0

};

var prepareOptions = exports.prepareOptions = function prepareOptions(userOptions) {
  return Object.assign({}, defaultOptions, userOptions);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable complexity */

var processTokens = exports.processTokens = function processTokens(Tokens, fromSchemeTree, toScheme) {

  var tokens = Tokens.slice();

  var tokensType = [];

  for (var index = 0; index < tokens.length; index += 1) {

    var token = tokens[index];

    var nextToken = index < tokens.length - 1 ? tokens[index + 1] : { type: 'strEnd' };

    var prevToken = index > 0 ? tokens[index - 1] : { type: 'strStart' };

    var tokenType = token.type;

    if (toScheme.about.type === 'brahmic') {

      if (tokenType === 'deadConsonants' && nextToken.type === 'vowelMarks') {

        tokenType = 'consonants';
      } else if (tokenType === 'vowels' && prevToken.type === 'deadConsonants') {

        tokenType = 'vowelMarks';
      } else if (tokenType === 'vowelMarks' && prevToken.type !== 'deadConsonants') {

        tokenType = 'vowels';
      }
    } else if (toScheme.about.type === 'roman') {

      if (tokenType === 'consonants' && nextToken.type === 'vowelMarks') {

        tokenType = 'deadConsonants';
      }
    }

    tokensType.push(tokenType);
  }

  return { processedTokens: tokens, tokensType: tokensType };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable complexity */

var canTranslitForOpenMarker = function canTranslitForOpenMarker(translitMode) {

  if (translitMode === 1) {

    return false;
  } else if (translitMode === 2) {

    return true;
  }

  return true;
};

var canTranslitForCloseMarker = function canTranslitForCloseMarker(translitMode) {

  if (translitMode === 1) {

    return true;
  } else if (translitMode === 2) {

    return false;
  }

  return true;
};

var translitTokens = exports.translitTokens = function translitTokens(tokens, tokensType, toSchemeTree, options) {

  var outStr = [];

  var canTranslit = true;

  if (options.translitMode === 2) {

    canTranslit = false;
  }

  tokens.forEach(function (token, index) {

    var tokenType = tokensType[index];

    if (tokenType === 'unknown' || tokenType === 'pause') {

      outStr.push(token.char);
    } else if (tokenType === 'skip') {

      outStr.push('');
    } else if (tokenType === 'marker-open-toggle-mode') {

      canTranslit = canTranslitForOpenMarker(options.translitMode);
    } else if (tokenType === 'marker-close-toggle-mode') {

      canTranslit = canTranslitForCloseMarker(options.translitMode);
    } else {

      if (canTranslit) {

        outStr.push(toSchemeTree[token.aksharaIndex].char[tokenType]);
      } else {

        outStr.push(token.char);
      }
    }
  });

  return outStr;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vTokenize"] = factory();
	else
		root["vTokenize"] = factory();
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
var cannotSeek = function cannotSeek(seeked, maxSeek, inStr, i) {
  return seeked === maxSeek || i === inStr.length - 1;
};

var getTokenDetails = function getTokenDetails(tempSliceDetails, foundIndex) {
  return foundIndex > -1 ? {

    foundIndex: foundIndex,
    token: tempSliceDetails[foundIndex]

  } : {

    foundIndex: 0,
    token: tempSliceDetails[0]

  };
};

var isTokenFound = function isTokenFound(sliceDetails) {
  return sliceDetails.type !== 'unknown' ? true : false;
};

var vTokenize = exports.vTokenize = function vTokenize(str, maxTokenLength, getSliceDetails) {

  var inStr = str.slice(0, str.length);
  var maxSeek = maxTokenLength;

  var tokens = [];

  var seeked = 0,
      strSlice = '',
      tempSliceDetails = [],
      tokenFound = [];

  for (var i = 0, l = inStr.length; i < l; i += 1) {

    seeked += 1;

    strSlice += inStr[i];

    var sliceDetails = getSliceDetails(strSlice);

    tempSliceDetails.push(sliceDetails);

    tokenFound.push(isTokenFound(sliceDetails));

    if (cannotSeek(seeked, maxSeek, inStr, i)) {

      var foundIndex = tokenFound.lastIndexOf(true);

      var tokenDetails = getTokenDetails(tempSliceDetails, foundIndex);

      foundIndex = tokenDetails.foundIndex;

      tokens.push(tokenDetails.token);

      // resetting the 'i' to pick up the next untokenized char.
      i -= seeked - 1 - foundIndex;

      // reset variables
      seeked = 0;
      strSlice = '';
      tempSliceDetails = [];
      tokenFound = [];
    }
  }

  return tokens;
};

/***/ })
/******/ ]);
});

/***/ })
/******/ ]);
});