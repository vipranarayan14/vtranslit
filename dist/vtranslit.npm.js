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

var _getScheme = __webpack_require__(2);

var _processTokens2 = __webpack_require__(6);

var _tokenize = __webpack_require__(7);

var _translitTokens = __webpack_require__(9);

var vTranslit = exports.vTranslit = function vTranslit(fromSchemeCode, toSchemeCode) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// returns a branch for fromSchemeTree.
var makeFromSchemeTreeBranch = function makeFromSchemeTreeBranch(scheme, schemeSubset, tokenLengths) {

  var schemeTreeBranch = {};

  scheme[schemeSubset].forEach(function (akshara, aksharaIndex) {

    akshara.forEach(function (alternateAkshara, alternateIndex) {

      if (alternateAkshara) {

        schemeTreeBranch[alternateAkshara] = {

          aksharaIndex: schemeSubset + '#' + aksharaIndex,
          alternateIndex: alternateIndex,
          char: alternateAkshara,
          type: schemeSubset

        };

        tokenLengths.push(alternateAkshara.length);
      }
    });
  });

  return schemeTreeBranch;
};

// Returns a branch for toSchemeTree.
var makeToSchemeTreeBranch = function makeToSchemeTreeBranch(scheme, schemeSubset) {
  var addSchemeSubset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';


  var schemeTreeBranch = {};

  scheme[schemeSubset].forEach(function (akshara, aksharaIndex) {

    var charDetails = {
      char: {},
      type: schemeSubset
    };

    if (addSchemeSubset) {

      charDetails.char[addSchemeSubset] = scheme[addSchemeSubset][aksharaIndex][0];
    }

    charDetails.char[schemeSubset] = akshara[0];

    schemeTreeBranch[schemeSubset + '#' + aksharaIndex] = charDetails;
  });

  return schemeTreeBranch;
};

var makeFromSchemeTreeBranchForConsonants = function makeFromSchemeTreeBranchForConsonants(fromScheme, tokenLengths) {

  if (fromScheme.about.type !== 'roman') {

    return makeFromSchemeTreeBranch(fromScheme, 'consonants', tokenLengths);
  }

  return {};
};

//Returns a scheme tree nade with given 'fromScheme'.
var makeFromSchemeTree = exports.makeFromSchemeTree = function makeFromSchemeTree(fromScheme) {

  var tokenLengths = [];

  var maxTokenLength = 0;

  var fromSchemeTree = Object.assign({}, makeFromSchemeTreeBranch(fromScheme, 'deadConsonants', tokenLengths), makeFromSchemeTreeBranchForConsonants(fromScheme, tokenLengths), makeFromSchemeTreeBranch(fromScheme, 'vowels', tokenLengths), makeFromSchemeTreeBranch(fromScheme, 'vowelMarks', tokenLengths), makeFromSchemeTreeBranch(fromScheme, 'symbols', tokenLengths));

  maxTokenLength = Math.max.apply(Math, tokenLengths);

  return { fromSchemeTree: fromSchemeTree, maxTokenLength: maxTokenLength };
};

//Returns a scheme tree nade with given 'toScheme'.
var makeToSchemeTree = exports.makeToSchemeTree = function makeToSchemeTree(toScheme) {

  var toSchemeTree = {};

  toSchemeTree = Object.assign({}, toSchemeTree, makeToSchemeTreeBranch(toScheme, 'deadConsonants', 'consonants'), makeToSchemeTreeBranch(toScheme, 'consonants', 'deadConsonants'), makeToSchemeTreeBranch(toScheme, 'vowels', 'vowelMarks'), makeToSchemeTreeBranch(toScheme, 'vowelMarks', 'vowels'), makeToSchemeTreeBranch(toScheme, 'symbols'));

  return toSchemeTree;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScheme = undefined;

var _vtranslitDevaScheme = __webpack_require__(3);

var _vtranslitItrnScheme = __webpack_require__(4);

var _vtranslitTamlScheme = __webpack_require__(5);

var getScheme = exports.getScheme = function getScheme(schemeCode) {
  return [_vtranslitItrnScheme.itransScheme, _vtranslitDevaScheme.devanagariScheme, _vtranslitTamlScheme.tamilScheme].find(function (scheme) {
    return scheme.about.scriptCode === schemeCode;
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var devanagariScheme = exports.devanagariScheme = {
  'about': { 'scriptCode': 'Deva', 'type': 'brahmic' },
  'consonants': [['क'], ['ख'], ['ग'], ['घ'], ['ङ'], ['च'], ['छ'], ['ज'], ['झ'], ['ञ'], ['ट'], ['ठ'], ['ड'], ['ढ'], ['ण'], ['त'], ['थ'], ['द'], ['ध'], ['न'], ['न'], ['प'], ['फ'], ['ब'], ['भ'], ['म'], ['य'], ['र'], ['र'], ['ल'], ['ळ'], ['ळ'], ['व'], ['श'], ['ष'], ['स'], ['ह']],
  'deadConsonants': [['क्'], ['ख्'], ['ग्'], ['घ्'], ['ङ्'], ['च्'], ['छ्'], ['ज्'], ['झ्'], ['ञ्'], ['ट्'], ['ठ्'], ['ड्'], ['ढ्'], ['ण्'], ['त्'], ['थ्'], ['द्'], ['ध्'], ['न्'], ['न्'], ['प्'], ['फ्'], ['ब्'], ['भ्'], ['म्'], ['य्'], ['र्'], ['र्'], ['ल्'], ['ळ्'], ['ळ्'], ['व्'], ['श्'], ['ष्'], ['स्'], ['ह्']],
  'inherentVowel': [['अ']],
  'symbols': [['०'], ['१'], ['२'], ['३'], ['४'], ['५'], ['६'], ['७'], ['८'], ['९'], ['।'], ['॥'], ['ॐ'], ['ऽ'], ['ं'], ['ः'], ['ँ']],
  'virama': [['्']],
  'vowelMarks': [[''], ['ा'], ['ि'], ['ी'], ['ु'], ['ू'], ['ृ'], ['ॄ'], ['ॢ'], ['ॣ'], ['े'], ['े'], ['ै'], ['ो'], ['ो'], ['ौ']],
  'vowels': [['अ'], ['आ'], ['इ'], ['ई'], ['उ'], ['ऊ'], ['ऋ'], ['ॠ'], ['ऌ'], ['ॡ'], ['ए'], ['ए'], ['ऐ'], ['ओ'], ['ओ'], ['औ']]
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var itransScheme = exports.itransScheme = {
  'about': { 'scriptCode': 'Itrn', 'type': 'roman' },
  'consonants': [['ka'], ['kha'], ['ga'], ['gha'], ['~Na', 'N^a'], ['cha'], ['Cha'], ['ja'], ['jha'], ['~na', 'JNa'], ['Ta'], ['Tha'], ['Da'], ['Dha'], ['Na'], ['ta'], ['tha'], ['da'], ['dha'], ['na'], ['^na'], ['pa'], ['pha'], ['ba'], ['bha'], ['ma'], ['ya'], ['ra'], ['Ra'], ['la'], ['La'], ['zha'], ['va', 'wa'], ['sha'], ['Sha', 'Sa', 'shha'], ['sa'], ['ha']],
  'deadConsonants': [['k'], ['kh'], ['g'], ['gh'], ['~N', 'N^'], ['ch'], ['Ch'], ['j'], ['jh'], ['~n', 'JN'], ['T'], ['Th'], ['D'], ['Dh'], ['N'], ['t'], ['th'], ['d'], ['dh'], ['n'], ['^n'], ['p'], ['ph'], ['b'], ['bh'], ['m'], ['y'], ['r'], ['R'], ['l'], ['L'], ['zh'], ['v', 'w'], ['sh'], ['Sh', 'S', 'shh'], ['s'], ['h']],
  'inherentVowel': [['#a']],
  'symbols': [['0'], ['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['|'], ['||'], ['OM', 'AUM'], ['.a'], ['M', '.m'], ['H', '.h'], ['.N']],
  'virama': [[';;']],
  'vowelMarks': [['a'], ['A', 'aa'], ['i'], ['I', 'ii'], ['u'], ['U', 'uu'], ['RRi', 'R^i'], ['RRI', 'R^I'], ['LLi', 'L^i'], ['LLI', 'L^I'], ['e'], ['E'], ['ai'], ['o'], ['O'], ['au']],
  'vowels': [['a'], ['A', 'aa'], ['i'], ['I', 'ii'], ['u'], ['U', 'uu'], ['RRi', 'R^i'], ['RRI', 'R^I'], ['LLi', 'L^i'], ['LLI', 'L^I'], ['e'], ['E'], ['ai'], ['o'], ['O'], ['au']]
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tamilScheme = exports.tamilScheme = {
  'about': { 'scriptCode': 'Taml', 'type': 'brahmic' },
  'consonants': [['க'], ['க'], ['க'], ['க'], ['ங'], ['ச'], ['ச'], ['ஜ'], ['ஜ'], ['ஞ'], ['ட'], ['ட'], ['ட'], ['ட'], ['ண'], ['த'], ['த'], ['த'], ['த'], ['ந'], ['ன'], ['ப'], ['ப'], ['ப'], ['ப'], ['ம'], ['ய'], ['ர'], ['ற'], ['ல'], ['ள'], ['ழ'], ['வ'], ['ச'], ['ச'], ['ச'], ['ஹ']],
  'deadConsonants': [['க்'], ['க்'], ['க்'], ['க்'], ['ங்'], ['ச்'], ['ச்'], ['ஜ்'], ['ஜ்'], ['ஞ்'], ['ட்'], ['ட்'], ['ட்'], ['ட்'], ['ண்'], ['த்'], ['த்'], ['த்'], ['த்'], ['ந்'], ['ன்'], ['ப்'], ['ப்'], ['ப்'], ['ப்'], ['ம்'], ['ய்'], ['ர்'], ['ற்'], ['ல்'], ['ள்'], ['ழ்'], ['வ்'], ['ச்'], ['ச்'], ['ச்'], ['ஹ்']],
  'inherentVowel': [['அ']],
  'symbols': [['௦'], ['௧'], ['௨'], ['௩'], ['௪'], ['௫'], ['௬'], ['௭'], ['௮'], ['௯'], ['.'], ['.'], ['ௐ'], [''], ['ஂ'], ['ஃ'], ['']],
  'virama': [['்']],
  'vowelMarks': [[''], ['ா'], ['ி'], ['ீ'], ['ு'], ['ூ'], [''], [''], [''], [''], ['ெ'], ['ே'], ['ை'], ['ொ'], ['ோ'], ['ௌ']],
  'vowels': [['அ'], ['ஆ'], ['இ'], ['ஈ'], ['உ'], ['ஊ'], [''], [''], [''], [''], ['எ'], ['ஏ'], ['ஐ'], ['ஒ'], ['ஓ'], ['ஔ']]
};

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = undefined;

var _provideCharDetails = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
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