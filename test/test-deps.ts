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

import { js2xml, Js2XmlOptions } from "https://deno.land/x/js2xml@1.0.2/mod.ts";
import { xml2js, Xml2JsOptions } from "../mod.ts";

const convert = {
  xml2js,
  xml2json(xml: string, opts: Xml2JsOptions) {
    const obj = xml2js(xml, opts);
    return JSON.stringify(obj);
  },
  js2xml,
  json2xml(json: string, opts: Js2XmlOptions) {
    const obj = JSON.parse(json);
    return js2xml(obj, opts);
  }
};
export { convert };

export {
  describe,
  expect,
  it,
} from "https://deno.land/x/notranspile_test_compat@1.0.2/mod.js";
