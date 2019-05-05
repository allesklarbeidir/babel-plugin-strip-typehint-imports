"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var DEFAULT_TEXT = 'typehints-only';

var _default = function _default(api) {
  var plugin = {
    name: 'strip-typehint-imports',
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, state) {
        var node = path.node;
        var options = state.opts;
        if (!node.trailingComments) return;
        var comments = node.trailingComments.filter(function (comment) {
          return comment.loc.start.line === node.loc.end.line;
        }).filter(function (comment) {
          return comment.value.trim() === (options.text || DEFAULT_TEXT);
        });

        if (comments.length > 0) {
          path.remove();
        }
      }
    }
  };
  return plugin;
};

exports.default = _default;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map