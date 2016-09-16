module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('replaceStr', function (haystack, needle1, replacement1, needle2, replacement2) {
    if (haystack && needle1 && needle2) {
      return haystack.replace(needle1, replacement1).replace(needle2, replacement2);
    } else {
      return '';
    }
  });

};