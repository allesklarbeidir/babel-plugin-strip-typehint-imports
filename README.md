# babel-plugin-strip-typehint-imports

Say you want to import something, but only use it for typehinting. This is the plugin for you!

```javascript
import { MyType } from 'file.d.ts'; // typehints-only

/** @type {MyType} */
const something = {
    // ...
};
```

Turns into

```javascript
/** @type {MyType} */
const something = {
    // ...
};
```

## install

With npm

```bash
npm install --save-dev babel-plugin-strip-typehint-imports
```

With yarn

```bash
yarn add --dev babel-plugin-strip-typehint-imports
```

And add the plugin to your .babelrc file

```json
{
    "plugins": [
        "strip-typehint-imports"
    ]
}
```

You can also change which text is used to strip the imports.


```json
{
    "plugins": [
        ["strip-typehint-imports", {
            "text": "remove me"
        }]
    ]
}
```

will remove the following import statement:

```javascript
import {a} from 'b'; // remove me
```
