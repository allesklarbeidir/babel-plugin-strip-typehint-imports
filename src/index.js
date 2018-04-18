// eslint-disable-next-line no-unused-vars
import {PluginObj, types} from 'babel-core';

const DEFAULT_TEXT = 'typehints-only';

export default api => {
  /** @type {PluginObj} */
  const plugin = {
    name: 'strip-typehint-imports',
    visitor: {
      ImportDeclaration(path, state) {
        const {node} = path;
        const {opts: options} = state;
        if (!node.trailingComments) return;
        const comments = node.trailingComments
          .filter(comment => comment.loc.start.line === node.loc.start.line)
          .filter(comment =>
            comment.value.trim() === options.text || DEFAULT_TEXT);

        if (comments) {
          path.remove();
        }
      }
    }
  };
  return plugin;
};
