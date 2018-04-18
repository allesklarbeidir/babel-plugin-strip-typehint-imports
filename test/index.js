/* eslint-env mocha */
import assert from 'assert';
import _ from 'lodash';
import {transform} from 'babel-core';
import plugin from '../src';
import testCases from './testCases';

testCases.forEach(testCase => {
  it(testCase.name, () => {
    const pluginCall = testCase.options ? [plugin, testCase.options] : plugin;
    const text = testCase.options && testCase.options.text || 'typehints-only';
    const commentReg = new RegExp(
      `(//|/\\*)\\s*${_.escapeRegExp(text)}\\s*(\\*/)?`, 'g'
    );
    const transformed = transform(testCase.input, {
      plugins: [
        pluginCall
      ]
    }).code.replace(commentReg, '').trim();
    assert.strictEqual(transformed, testCase.output.trim());
  });
});
