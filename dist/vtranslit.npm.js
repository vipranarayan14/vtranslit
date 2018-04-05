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

var _getScheme = __webpack_require__(1);

var _makeSchemeTree = __webpack_require__(7);

var _processTokens2 = __webpack_require__(8);

var _tokenize = __webpack_require__(9);

var _translitTokens = __webpack_require__(11);

var init = function init(fromSchemeCode, toSchemeCode) {

  var fromScheme = (0, _getScheme.getScheme)(fromSchemeCode);
  var toScheme = (0, _getScheme.getScheme)(toSchemeCode);

  var _makeFromSchemeTree = (0, _makeSchemeTree.makeFromSchemeTree)(fromScheme),
      fromSchemeTree = _makeFromSchemeTree.fromSchemeTree,
      maxTokenLength = _makeFromSchemeTree.maxTokenLength;

  var toSchemeTree = (0, _makeSchemeTree.makeToSchemeTree)(toScheme);

  return function (inStr) {

    var tokens = (0, _tokenize.tokenize)(inStr, fromSchemeTree, maxTokenLength);

    var _processTokens = (0, _processTokens2.processTokens)(tokens, fromSchemeTree, toScheme),
        processedTokens = _processTokens.processedTokens,
        tokensType = _processTokens.tokensType;

    var outStr = (0, _translitTokens.translitTokens)(processedTokens, tokensType, toSchemeTree);

    return outStr.join('');
  };
};

var vTranslit = exports.vTranslit = {
  getAvailableSchemes: _getScheme.getAvailableSchemes,
  init: init
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScheme = exports.getAvailableSchemes = undefined;

var _vtranslitDevaScheme = __webpack_require__(2);

var _vtranslitItrnScheme = __webpack_require__(3);

var _vtranslitKndaScheme = __webpack_require__(4);

var _vtranslitTamlScheme = __webpack_require__(5);

var _vtranslitTeluScheme = __webpack_require__(6);

var schemes = [_vtranslitItrnScheme.itransScheme, _vtranslitDevaScheme.devanagariScheme, _vtranslitKndaScheme.kannadaScheme, _vtranslitTamlScheme.tamilScheme, _vtranslitTeluScheme.teluguScheme];

var getAvailableSchemes = exports.getAvailableSchemes = function getAvailableSchemes() {

  var availableSchemes = [];

  schemes.forEach(function (scheme) {

    availableSchemes.push({
      code: scheme.about.schemeCode,
      name: scheme.about.schemeName
    });
  });

  return availableSchemes;
};

var getScheme = exports.getScheme = function getScheme(schemeCode) {
  return schemes.find(function (scheme) {
    return scheme.about.schemeCode === schemeCode;
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var devanagariScheme = exports.devanagariScheme = {
  'about': {
    'schemeCode': 'Deva',
    'schemeName': 'Devanagari',
    'type': 'brahmic'
  },
  'data': {
    'consonants': ['\u0915', '\u0916', '\u0917', '\u0918', '\u0919', '\u091A', '\u091B', '\u091C', '\u091D', '\u091E', '\u091F', '\u0920', '\u0921', '\u0922', '\u0923', '\u0924', '\u0925', '\u0926', '\u0927', '\u0928', '', '\u092A', '\u092B', '\u092C', '\u092D', '\u092E', '\u092F', '\u0930', '', '\u0932', '\u0933', '', '\u0935', '\u0936', '\u0937', '\u0938', '\u0939'],
    'deadConsonants': ['\u0915\u094D', '\u0916\u094D', '\u0917\u094D', '\u0918\u094D', '\u0919\u094D', '\u091A\u094D', '\u091B\u094D', '\u091C\u094D', '\u091D\u094D', '\u091E\u094D', '\u091F\u094D', '\u0920\u094D', '\u0921\u094D', '\u0922\u094D', '\u0923\u094D', '\u0924\u094D', '\u0925\u094D', '\u0926\u094D', '\u0927\u094D', '\u0928\u094D', '', '\u092A\u094D', '\u092B\u094D', '\u092C\u094D', '\u092D\u094D', '\u092E\u094D', '\u092F\u094D', '\u0930\u094D', '', '\u0932\u094D', '\u0933\u094D', '', '\u0935\u094D', '\u0936\u094D', '\u0937\u094D', '\u0938\u094D', '\u0939\u094D'],
    'symbols': ['\u0966', '\u0967', '\u0968', '\u0969', '\u096A', '\u096B', '\u096C', '\u096D', '\u096E', '\u096F', '\u0964', '\u0965', '\u0950', '\u093D', '\u0902', '\u0903', '\u0901'],
    'virama': ['\u094D'],
    'vowelMarks': ['', '\u093E', '\u093F', '\u0940', '\u0941', '\u0942', '\u0943', '\u0944', '\u0962', '\u0963', '\u0947', '', '\u0948', '\u094B', '', '\u094C'],
    'vowels': ['\u0905', '\u0906', '\u0907', '\u0908', '\u0909', '\u090A', '\u090B', '\u0960', '\u090C', '\u0961', '\u090F', '', '\u0910', '\u0913', '', '\u0914']
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var itransScheme = exports.itransScheme = {
  'about': {
    'schemeCode': 'Itrn',
    'schemeName': 'ITRANS',
    'type': 'roman'
  },
  'data': {
    'consonants': ['ka', 'kha', 'ga', 'gha', ['~Na', 'N^a'], 'cha', 'Cha', 'ja', 'jha', ['~na', 'JNa'], 'Ta', 'Tha', 'Da', 'Dha', 'Na', 'ta', 'tha', 'da', 'dha', 'na', '^na', 'pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'Ra', 'la', 'La', 'zha', ['va', 'wa'], 'sha', ['Sha', 'Sa', 'shha'], 'sa', 'ha'],
    'deadConsonants': ['k', 'kh', 'g', 'gh', ['~N', 'N^'], 'ch', 'Ch', 'j', 'jh', ['~n', 'JN'], 'T', 'Th', 'D', 'Dh', 'N', 't', 'th', 'd', 'dh', 'n', '^n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'R', 'l', 'L', 'zh', ['v', 'w'], 'sh', ['Sh', 'S', 'shh'], 's', 'h'],
    'symbols': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '|', '||', ['OM', 'AUM'], '.a', ['M', '.m'], ['H', '.h'], '.N'],
    'virama': [';;'],
    'vowelMarks': ['a', ['A', 'aa'], 'i', ['I', 'ii'], 'u', ['U', 'uu'], ['RRi', 'R^i'], ['RRI', 'R^I'], ['LLi', 'L^i'], ['LLI', 'L^I'], 'e', 'E', 'ai', 'o', 'O', 'au'],
    'vowels': ['a', ['A', 'aa'], 'i', ['I', 'ii'], 'u', ['U', 'uu'], ['RRi', 'R^i'], ['RRI', 'R^I'], ['LLi', 'L^i'], ['LLI', 'L^I'], 'e', 'E', 'ai', 'o', 'O', 'au']
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var kannadaScheme = exports.kannadaScheme = {
  'about': {
    'schemeCode': 'Knda',
    'schemeName': 'Kannada',
    'type': 'brahmic'
  },
  'data': {
    'consonants': ['\u0C95', '\u0C96', '\u0C97', '\u0C98', '\u0C99', '\u0C9A', '\u0C9B', '\u0C9C', '\u0C9D', '\u0C9E', '\u0C9F', '\u0CA0', '\u0CA1', '\u0CA2', '\u0CA3', '\u0CA4', '\u0CA5', '\u0CA6', '\u0CA7', '\u0CA8', '', '\u0CAA', '\u0CAB', '\u0CAC', '\u0CAD', '\u0CAE', '\u0CAF', '\u0CB0', '\u0CB1', '\u0CB2', '\u0CB3', '', '\u0CB5', '\u0CB6', '\u0CB7', '\u0CB8', '\u0CB9'],
    'deadConsonants': ['\u0C95\u0CCD', '\u0C96\u0CCD', '\u0C97\u0CCD', '\u0C98\u0CCD', '\u0C99\u0CCD', '\u0C9A\u0CCD', '\u0C9B\u0CCD', '\u0C9C\u0CCD', '\u0C9D\u0CCD', '\u0C9E\u0CCD', '\u0C9F\u0CCD', '\u0CA0\u0CCD', '\u0CA1\u0CCD', '\u0CA2\u0CCD', '\u0CA3\u0CCD', '\u0CA4\u0CCD', '\u0CA5\u0CCD', '\u0CA6\u0CCD', '\u0CA7\u0CCD', '\u0CA8\u0CCD', '', '\u0CAA\u0CCD', '\u0CAB\u0CCD', '\u0CAC\u0CCD', '\u0CAD\u0CCD', '\u0CAE\u0CCD', '\u0CAF\u0CCD', '\u0CB0\u0CCD', '\u0CB1\u0CCD', '\u0CB2\u0CCD', '\u0CB3\u0CCD', '', '\u0CB5\u0CCD', '\u0CB6\u0CCD', '\u0CB7\u0CCD', '\u0CB8\u0CCD', '\u0CB9\u0CCD'],
    'symbols': ['\u0CE6', '\u0CE7', '\u0CE8', '\u0CE9', '\u0CEA', '\u0CEB', '\u0CEC', '\u0CED', '\u0CEE', '\u0CEF', '।', '॥', '', '\u0CBD', '\u0C82', '\u0C83', '\u0C81'],
    'virama': ['\u0CCD'],
    'vowelMarks': ['', '\u0CBE', '\u0CBF', '\u0CC0', '\u0CC1', '\u0CC2', '\u0CC3', '\u0CC4', '', '', '\u0CC6', '\u0CC7', '\u0CC8', '\u0CCA', '\u0CCB', '\u0CCC'],
    'vowels': ['\u0C85', '\u0C86', '\u0C87', '\u0C88', '\u0C89', '\u0C8A', '\u0C8B', '', '\u0C8C', '', '\u0C8E', '\u0C8F', '\u0C90', '\u0C92', '\u0C93', '\u0C94']
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tamilScheme = exports.tamilScheme = {
  'about': { 'schemeCode': 'Taml', 'schemeName': 'Tamil', 'type': 'brahmic' },
  'data': {
    'consonants': ['\u0B95', '', '', '', '\u0B99', '\u0B9A', '', '\u0B9C', '', '\u0B9E', '\u0B9F', '', '', '', '\u0BA3', '\u0BA4', '', '', '', '\u0BA8', '\u0BA9', '\u0BAA', '', '', '', '\u0BAE', '\u0BAF', '\u0BB0', '\u0BB1', '\u0BB2', '\u0BB3', '\u0BB4', '\u0BB5', '\u0BB6', '\u0BB7', '\u0BB8', '\u0BB9'],
    'deadConsonants': ['\u0B95\u0BCD', '', '', '', '\u0B99\u0BCD', '\u0B9A\u0BCD', '', '\u0B9C\u0BCD', '', '\u0B9E\u0BCD', '\u0B9F\u0BCD', '', '', '', '\u0BA3\u0BCD', '\u0BA4\u0BCD', '', '', '', '\u0BA8\u0BCD', '\u0BA9\u0BCD', '\u0BAA\u0BCD', '', '', '', '\u0BAE\u0BCD', '\u0BAF\u0BCD', '\u0BB0\u0BCD', '\u0BB1\u0BCD', '\u0BB2\u0BCD', '\u0BB3\u0BCD', '\u0BB4\u0BCD', '\u0BB5\u0BCD', '\u0BB6\u0BCD', '\u0BB7\u0BCD', '\u0BB8\u0BCD', '\u0BB9\u0BCD'],
    'symbols': ['\u0BE6', '\u0BE7', '\u0BE8', '\u0BE9', '\u0BEA', '\u0BEB', '\u0BEC', '\u0BED', '\u0BEE', '\u0BEF', '', '', '\u0BD0', '', '\u0B82', '\u0B83', ''],
    'virama': ['\u0BCD'],
    'vowelMarks': ['', '\u0BBE', '\u0BBF', '\u0BC0', '\u0BC1', '\u0BC2', '', '', '', '', '\u0BC6', '\u0BC7', '\u0BC8', '\u0BCA', '\u0BCB', '\u0BCC'],
    'vowels': ['\u0B85', '\u0B86', '\u0B87', '\u0B88', '\u0B89', '\u0B8A', '', '', '', '', '\u0B8E', '\u0B8F', '\u0B90', '\u0B92', '\u0B93', '\u0B94']
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var teluguScheme = exports.teluguScheme = {
  'about': {
    'schemeCode': 'Telu',
    'schemeName': 'Telugu',
    'type': 'brahmic'
  },
  'data': {
    'consonants': ['\u0C15', '\u0C16', '\u0C17', '\u0C18', '\u0C19', '\u0C1A', '\u0C13', '\u0C1C', '\u0C1D', '\u0C1E', '\u0C1F', '\u0C20', '\u0C21', '\u0C22', '\u0C23', '\u0C24', '\u0C25', '\u0C26', '\u0C27', '\u0C28', '', '\u0C22', '\u0C23', '\u0C2C', '\u0C2D', '\u0C2E', '\u0C2F', '\u0C30', '\u0C31', '\u0C32', '\u0C33', '', '\u0C35', '\u0C36', '\u0C37', '\u0C38', '\u0C39'],
    'deadConsonants': ['\u0C15\u0C4D', '\u0C16\u0C4D', '\u0C17\u0C4D', '\u0C18\u0C4D', '\u0C19\u0C4D', '\u0C1A\u0C4D', '\u0C13\u0C4D', '\u0C1C\u0C4D', '\u0C1D\u0C4D', '\u0C1E\u0C4D', '\u0C1F\u0C4D', '\u0C20\u0C4D', '\u0C21\u0C4D', '\u0C22\u0C4D', '\u0C23\u0C4D', '\u0C24\u0C4D', '\u0C25\u0C4D', '\u0C26\u0C4D', '\u0C27\u0C4D', '\u0C28\u0C4D', '', '\u0C2A\u0C4D', '\u0C23\u0C4D', '\u0C2C\u0C4D', '\u0C2D\u0C4D', '\u0C2E\u0C4D', '\u0C2F\u0C4D', '\u0C30\u0C4D', '\u0C31\u0C4D', '\u0C32\u0C4D', '\u0C33\u0C4D', '', '\u0C35\u0C4D', '\u0C36\u0C4D', '\u0C37\u0C4D', '\u0C38\u0C4D', '\u0C39\u0C4D'],
    'symbols': ['\u0C66', '\u0C67', '\u0C68', '\u0C69', '\u0C6A', '\u0C63', '\u0C6C', '\u0C6D', '\u0C66', '\u0C6F', '।', '॥', '', '\u0C3D', '\u0C02', '\u0C03', '\u0C01'],
    'virama': ['\u0C4D'],
    'vowelMarks': ['', '\u0C3E', '\u0C3F', '\u0C40', '\u0C41', '\u0C42', '\u0C43', '\u0C44', '', '', '\u0C46', '\u0C47', '\u0C48', '\u0C4A', '\u0C43', '\u0C4C'],
    'vowels': ['\u0C05', '\u0C06', '\u0C07', '\u0C00', '\u0C09', '\u0C0A', '\u0C03', '', '\u0C0C', '', '\u0C0E', '\u0C0F', '\u0C10', '\u0C12', '\u0C13', '\u0C14']
  }
};

/***/ }),
/* 7 */
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

  var fromSchemeTree = Object.assign({}, makeFromSchemeBranch(fromScheme, 'deadConsonants', tokenLengths), makeFromSchemeBranch(fromScheme, 'consonants', tokenLengths), makeFromSchemeBranch(fromScheme, 'vowels', tokenLengths), makeFromSchemeBranch(fromScheme, 'vowelMarks', tokenLengths), makeFromSchemeBranch(fromScheme, 'symbols', tokenLengths));

  maxTokenLength = Math.max.apply(Math, tokenLengths);

  return { fromSchemeTree: fromSchemeTree, maxTokenLength: maxTokenLength };
};

//Returns a scheme tree nade with given 'toScheme'.
var makeToSchemeTree = exports.makeToSchemeTree = function makeToSchemeTree(toScheme) {

  var toSchemeTree = {};

  toSchemeTree = Object.assign({}, toSchemeTree, makeToSchemeBranch(toScheme, 'deadConsonants', 'consonants'), makeToSchemeBranch(toScheme, 'consonants', 'deadConsonants'), makeToSchemeBranch(toScheme, 'vowels', 'vowelMarks'), makeToSchemeBranch(toScheme, 'vowelMarks', 'vowels'), makeToSchemeBranch(toScheme, 'symbols'));

  return toSchemeTree;
};

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = undefined;

var _provideCharDetails = __webpack_require__(10);

/* eslint-disable complexity */
var tokenize = exports.tokenize = function tokenize(str, fromSchemeTree, maxTokenLength) {

  var inStr = str.slice(0, str.length);
  var maxSeek = maxTokenLength;

  var tokens = [];

  var seeked = 0,
      strSlice = '',
      tempCharDetails = [],
      tokenFound = [];

  for (var i = 0, l = inStr.length; i < l; i += 1) {

    seeked += 1;

    strSlice += inStr[i];
    var charDetails = (0, _provideCharDetails.getCharDetails)(strSlice, fromSchemeTree);

    tempCharDetails.push(charDetails);

    if (charDetails.type !== 'unknown') {

      tokenFound.push(true);
    } else {

      tokenFound.push(false);
    }

    if (seeked === maxSeek || i === inStr.length - 1) {

      var foundIndex = tokenFound.lastIndexOf(true);

      if (foundIndex > -1) {

        tokens.push(tempCharDetails[foundIndex]);
      } else {

        foundIndex = 0;

        tokens.push(tempCharDetails[0]);
      }

      // resetting the 'i' to pick the next untokenized char.
      i -= seeked - 1 - foundIndex;

      // reset variables
      seeked = 0;
      strSlice = '';
      tempCharDetails = [];
      tokenFound = [];
    }
  }

  return tokens;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable complexity */

var getCharDetails = exports.getCharDetails = function getCharDetails(char, fromSchemeTree) {

  var charDetails = {};
  var charDetailsInFromSchemeTree = fromSchemeTree[char];

  if (char === ' ') {

    charDetails = {
      char: char,
      type: 'pause'
    };
  } else if (char === '_') {

    charDetails = {
      char: char,
      type: 'skip'
    };
  } else if (charDetailsInFromSchemeTree) {

    charDetails = charDetailsInFromSchemeTree;
  } else {

    charDetails = {
      char: char,
      type: 'unknown'
    };
  }

  return charDetails;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable complexity */

var translitTokens = exports.translitTokens = function translitTokens(tokens, tokensType, toSchemeTree) {

  var outStr = [];

  tokens.forEach(function (token, index) {

    var tokenType = tokensType[index];

    if (tokenType === 'unknown') {

      outStr.push(token.char);
    } else if (tokenType === 'pause') {

      outStr.push(token.char);
    } else if (tokenType === 'skip') {

      outStr.push('');
    } else {

      outStr.push(toSchemeTree[token.aksharaIndex].char[tokenType]);
    }
  });

  return outStr;
};

/***/ })
/******/ ]);
});