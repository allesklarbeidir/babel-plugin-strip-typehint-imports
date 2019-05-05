const DEFAULT_TEXT = 'typehints-only';

export default api => {
  const plugin = {
    name: 'strip-typehint-imports',
    visitor: {
      ImportDeclaration(path, state) {
        const {node} = path;
        const {opts: options} = state;
        if (!node.trailingComments) return;
        const comments = node.trailingComments
          .filter(comment => comment.loc.start.line === node.loc.end.line)
          .filter(comment =>
            comment.value.trim() === (options.text || DEFAULT_TEXT));

        if (comments.length > 0) {
          path.remove();
        }
      }
    }
  };
  return plugin;
  
};
