import dedent from 'dedent';
/**
 * @typedef {Object} TestCase
 * @property {string} name
 * @property {string} input
 * @property {string} output
 * @property {{text: string}} options?
 */

/**
 * @type {Array<TestCase>}
 */
const testCases = [
  {
    name: `Strip simple import`,
    input: `import { x } from 'y'; // typehints-only`,
    output: ``
  },
  {
    name: `doesn't strip without strip!`,
    input: `import { x } from 'y';`,
    output: `import { x } from 'y';`
  },
  {
    name: `Does not strip other imports`,
    input: dedent`
      import { x } from 'y'; // typehints-only
      import { foo } from 'bar';
      import { a } from 'b'; // typehints-only
      import { foo2 } from 'baz';
      import { foo3 } from 'quux';
    `,
    output: dedent`
      import { foo } from 'bar';
      import { foo2 } from 'baz';
      import { foo3 } from 'quux';
    `
  },
  {
    name: `linebreak in the middle of an import statement`,
    input: dedent`import {transformFileSync, 
      template
    } from 'babel-core'; // typehints-only`,
    output: ``
  },
  {
    name: 'Weird spacing',
    input: dedent`
      import {a}
        from 'b'; // typehints-only
      `,
    output: ``
  },
  {
    name: `import default`,
    input: `import a from 'b'; // typehints-only`,
    output: ``
  },
  {
    name: 'Different text',
    input: `import {a} from 'b'; // Helloj!`,
    output: ``,
    options: {
      text: 'Helloj!'
    }
  },
  {
    name: 'inline comment',
    input: `import a from 'b'; /* typehints-only */`,
    output: ``
  }
];

export default testCases;
