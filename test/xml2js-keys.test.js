/*
 * Copyright 2021, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// adapted from: https://github.com/nashwaan/xml-js

import { convert, expect, describe, it } from "./test-deps.ts";
import testItems from './test-items.js';

/*global describe,it,expect*/

describe('Testing xml2js.js:', function () {

  describe('Changing default key names, options = {compact: false}', function () {

    describe('Changing options.declarationKey', function () {

      var options = {compact: false, declarationKey: 'declaration'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.instructionKey', function () {

      var options = {compact: false, instructionKey: 'instruction'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.attributesKey', function () {

      var options = {compact: false, attributesKey: 'attributes'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.textKey', function () {

      var options = {compact: false, textKey: 'text'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.cdataKey', function () {

      var options = {compact: false, cdataKey: 'cdata'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.doctypeKey', function () {

      var options = {compact: false, doctypeKey: 'doctype'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.commentKey', function () {

      var options = {compact: false, commentKey: 'comment'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.parentKey', function () {

      var options = {compact: false, parentKey: 'parent'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.typeKey', function () {

      var options = {compact: false, typeKey: 'type'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.nameKey', function () {

      var options = {compact: false, nameKey: 'name'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.elementsKey', function () {

      var options = {compact: false, elementsKey: 'elements'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

  });

  describe('Changing default key names, options = {compact: true}', function () {

    describe('Changing options.declarationKey', function () {

      var options = {compact: true, declarationKey: 'declaration'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.instructionKey', function () {

      var options = {compact: true, instructionKey: 'instruction'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.attributesKey', function () {

      var options = {compact: true, attributesKey: 'attributes'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.textKey', function () {

      var options = {compact: true, textKey: 'text'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.cdataKey', function () {

      var options = {compact: true, cdataKey: 'cdata'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.doctypeKey', function () {

      var options = {compact: true, doctypeKey: 'doctype'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.commentKey', function () {

      var options = {compact: true, commentKey: 'comment'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.parentKey', function () {

      var options = {compact: true, parentKey: 'parent'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.typeKey', function () {

      var options = {compact: true, typeKey: 'type'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.nameKey', function () {

      var options = {compact: true, nameKey: 'name'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

    describe('Changing options.elementsKey', function () {

      var options = {compact: true, elementsKey: 'elements'.slice(0,3)};
      testItems('xml2js', options).forEach(function (test) {
        it(test.desc, function () {
          expect(convert.xml2js(test.xml, options)).toEqual(test.js);
        });
      });

    });

  });

});
