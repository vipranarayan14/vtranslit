/* eslint-disable */

'use strict';

(function (window) {

  var inputBox = document.querySelector('#inputBox');
  var outputBox = document.querySelector('#outputBox');
  var fromSchemeSelect = document.querySelector('#fromScheme');
  var toSchemeSelect = document.querySelector('#toScheme');
  var copyButtons = document.querySelectorAll('.copy-button');
  var snackbar = document.getElementById("snackbar");

  var vTranslit = window.vTranslit;
  var availableSchemes = vTranslit.getAvailableSchemes();

  var vt = void 0;

  availableSchemes.forEach(function (scheme) {

    fromSchemeSelect.options[fromSchemeSelect.options.length] = new Option(scheme.name, scheme.code);

  });

  var makeToSchemeOptions = function makeToSchemeOptions() {

    if (
      fromSchemeSelect.value === 'Itrn' &&
      toSchemeSelect.length < availableSchemes.length
    ) {

      toSchemeSelect.options.length = 0;

      availableSchemes.forEach(function (scheme) {

        if (scheme.code !== 'Itrn') {

          toSchemeSelect.options[toSchemeSelect.options.length] =
            new Option(scheme.name, scheme.code);

        }

      });

    } else {

      toSchemeSelect.options.length = 0;
      toSchemeSelect.options[0] = new Option('ITRANS', 'Itrn');

    }

  };

  var copyToClipboard = function copyToClipboard(clipTarget) {

    if (clipTarget.value) {

      clipTarget.select();

      document.execCommand('Copy');

      showSnackbar('Selected text is copied.');

    } else {

      showSnackbar('There is nothing to copy!');

    }

  };

  var showSnackbar = function showSnackbar(msg) {

    snackbar.className = "show";
    snackbar.textContent = msg;

    setTimeout(function () {

      snackbar.className = snackbar.className.replace("show", "");

    }, 3000);

  };

  var alertSchemeChange = function alertSchemeChange(schemeSelect) {

    var selectedOptionText = schemeSelect.options[schemeSelect.selectedIndex].text;

    showSnackbar('The to-scheme is changed to \'' + selectedOptionText + '\'.');

  };

  var init = function init() {

    makeToSchemeOptions();

    handleToSchemeSelect();

  };

  var handleFromSchemeSelect = function handleFromSchemeSelect() {

    init();

    alertSchemeChange(fromSchemeSelect);

  };

  var handleToSchemeSelect = function handleToSchemeSelect() {

    vt = vTranslit.init(fromSchemeSelect.value, toSchemeSelect.value);

    alertSchemeChange(toSchemeSelect);

    transliterate();

  };

  var transliterate = function transliterate() {

    return outputBox.value = vt(inputBox.value);

  };

  fromSchemeSelect.addEventListener('change', handleFromSchemeSelect);
  toSchemeSelect.addEventListener('change', handleToSchemeSelect);

  copyButtons.forEach(function (button) {

    return button.addEventListener('click', function (e) {

      var clipTarget = document.querySelector(e.target.dataset.clipTarget);

      copyToClipboard(clipTarget);

    });

  });

  inputBox.addEventListener('keyup', transliterate);

  window.addEventListener('DOMContentLoaded', init);

})(window);
