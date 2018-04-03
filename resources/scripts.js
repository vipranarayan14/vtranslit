/* eslint-disable */

'use strict';

(function (window) {

  var inputBox = document.querySelector('#inputBox');
  var outputBox = document.querySelector('#outputBox');
  var fromSchemeSelect = document.querySelector('#fromScheme');
  var toSchemeSelect = document.querySelector('#toScheme');
  var copyToClipboard = document.querySelectorAll('.copy-to-clipboard');

  var vTranslit = window.vTranslit;
  var availableSchemes = vTranslit.getAvailableSchemes();

  var fontFamilies = {
    'Itrn': 'SakalBharati, serif',
    'Deva': 'SakalBharati, serif',
    'Knda': 'SakalBharati, serif',
    'Taml': 'SakalBharati, serif',
    'Telu': 'SakalBharati, serif'
  };

  var vt = void 0;

  availableSchemes.forEach(function (scheme) {

    fromSchemeSelect.options[fromSchemeSelect.options.length] = new Option(scheme.name, scheme.code);
  });

  var makeToSchemeOptions = function makeToSchemeOptions() {

    if (fromSchemeSelect.value === 'Itrn' && toSchemeSelect.length < availableSchemes.length) {

      toSchemeSelect.options.length = 0;

      availableSchemes.forEach(function (scheme) {

        if (scheme.code !== 'Itrn') {

          toSchemeSelect.options[toSchemeSelect.options.length] = new Option(scheme.name, scheme.code);
        }
      });
    } else {

      toSchemeSelect.options.length = 0;
      toSchemeSelect.options[0] = new Option('ITRANS', 'Itrn');
    }
  };

  var changeFont = function changeFont() {

    outputBox.style.fontFamily = fontFamilies[toSchemeSelect.value];
  };

  var init = function init() {

    makeToSchemeOptions();

    vt = vTranslit.init(fromSchemeSelect.value, toSchemeSelect.value);

    transliterate();

    changeFont();
  };

  var handleToSchemeSelect = function handleToSchemeSelect() {

    vt = vTranslit.init(fromSchemeSelect.value, toSchemeSelect.value);

    transliterate();

    changeFont();
  };

  var transliterate = function transliterate() {

    return outputBox.value = vt(inputBox.value);

  };

  fromSchemeSelect.addEventListener('change', init);
  toSchemeSelect.addEventListener('change', handleToSchemeSelect);

  copyToClipboard.forEach(function (button) {

    return button.addEventListener('click', function (e) {

      var clipTarget = document.querySelector(e.target.dataset.clipTarget);

      clipTarget.select();

      document.execCommand('Copy');

      alert('Selected text is copied to clipboard');

    });

  });

  inputBox.addEventListener('keyup', transliterate);

  window.addEventListener('DOMContentLoaded', init);

})(window);
