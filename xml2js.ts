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

import {
  SaxesParser,
  XMLDecl,
} from "https://deno.land/x/notranspile_saxes@v6.0.0-deno/saxes.ts";
import helper from "./options-helper.ts";
import { Xml2JsOptions } from "./options.ts";

let options: Record<string, unknown>;
let currentElement: Record<string, unknown>;

function validateOptions(userOptions: Record<string, unknown>) {
  options = helper.copyOptions(userOptions);
  helper.ensureFlagExists("ignoreDeclaration", options);
  helper.ensureFlagExists("ignoreInstruction", options);
  helper.ensureFlagExists("ignoreAttributes", options);
  helper.ensureFlagExists("ignoreText", options);
  helper.ensureFlagExists("ignoreComment", options);
  helper.ensureFlagExists("ignoreCdata", options);
  helper.ensureFlagExists("ignoreDoctype", options);
  helper.ensureFlagExists("compact", options);
  helper.ensureFlagExists("alwaysChildren", options);
  helper.ensureFlagExists("trim", options);
  helper.ensureFlagExists("nativeType", options);
  helper.ensureFlagExists("nativeTypeAttributes", options);
  helper.ensureFlagExists("sanitize", options);
  helper.ensureFlagExists("instructionHasAttributes", options);
  helper.ensureFlagExists("captureSpacesBetweenElements", options);
  helper.ensureAlwaysArrayExists(options);
  helper.ensureKeyExists("declaration", options);
  helper.ensureKeyExists("instruction", options);
  helper.ensureKeyExists("attributes", options);
  helper.ensureKeyExists("text", options);
  helper.ensureKeyExists("comment", options);
  helper.ensureKeyExists("cdata", options);
  helper.ensureKeyExists("doctype", options);
  helper.ensureKeyExists("type", options);
  helper.ensureKeyExists("name", options);
  helper.ensureKeyExists("elements", options);
  helper.ensureKeyExists("parent", options);
  return options;
}

function nativeType(value: string) {
  const nValue = Number(value);
  if (!isNaN(nValue)) {
    return nValue;
  }
  const bValue = value.toLowerCase();
  if (bValue === "true") {
    return true;
  } else if (bValue === "false") {
    return false;
  }
  return value;
}

function addField(type: string, value: Record<string, unknown>) {
  let key = "";
  if (options.compact) {
    if (
      !currentElement[options[type + "Key"] as string] &&
      (options.alwaysArray instanceof Array
        ? options.alwaysArray.indexOf(options[type + "Key"]) !== -1
        : options.alwaysArray)
    ) {
      currentElement[options[type + "Key"] as string] = [];
    }
    if (
      currentElement[options[type + "Key"] as string] &&
      !(currentElement[options[type + "Key"] as string] instanceof Array)
    ) {
      currentElement[options[type + "Key"] as string] = [
        currentElement[options[type + "Key"] as string],
      ];
    }
    if (currentElement[options[type + "Key"] as string] instanceof Array) {
      (currentElement[options[type + "Key"] as string] as unknown[]).push(
        value,
      );
    } else {
      currentElement[options[type + "Key"] as string] = value;
    }
  } else {
    if (!currentElement[options.elementsKey as string]) {
      currentElement[options.elementsKey as string] = [];
    }
    const element: Record<string, unknown> = {};
    element[options.typeKey as string] = type;
    if (type === "instruction") {
      for (key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          break;
        }
      }
      element[options.nameKey as string] = key;
      if (options.instructionHasAttributes) {
        element[options.attributesKey as string] =
          (value[key] as Record<string, unknown>)[
            options.attributesKey as string
          ];
      } else {
        element[options.instructionKey as string] = value[key];
      }
    } else {
      element[options[type + "Key"] as string] = value;
    }
    (currentElement[options.elementsKey as string] as unknown[]).push(element);
  }
}

function manipulateAttributes(attributes: Record<string, unknown>) {
  if (attributes) {
    const keysToDelete = [];
    let key = "";
    for (key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        if ("undefined" == typeof (attributes[key])) {
          keysToDelete.push(key);
        } else {
          if (options.trim) {
            attributes[key] = (attributes[key] as string).trim();
          }
          if (options.nativeTypeAttributes) {
            attributes[key] = nativeType(attributes[key] as string);
          }
        }
      }
    }
    for (const kd of keysToDelete) {
      delete attributes[kd];
    }
  }
  return attributes;
}

function onDeclaration(attrs: XMLDecl) {
  if (options.ignoreDeclaration) {
    return;
  }
  const attributes = manipulateAttributes(attrs as Record<string, unknown>);
  currentElement[options.declarationKey as string] = {};
  if (Object.keys(attributes).length > 0) {
    (currentElement[options.declarationKey as string] as Record<
      string,
      unknown
    >)[options.attributesKey as string] = attributes;
  }
}

function onInstruction(instruction: Record<string, unknown>) {
  let attributes: Record<string, unknown> = {};
  instruction.name = instruction.target;
  if (instruction.body && options.instructionHasAttributes) {
    const attrsRegExp = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g;
    let match;
    while ((match = attrsRegExp.exec(instruction.body as string)) !== null) {
      attributes[match[1]] = match[2] || match[3] || match[4];
    }
    attributes = manipulateAttributes(attributes);
  }
  if (options.ignoreInstruction) {
    return;
  }
  if (options.trim) {
    instruction.body = (instruction.body as string).trim();
  }
  const value: Record<string, unknown> = {};
  if (options.instructionHasAttributes && Object.keys(attributes).length) {
    value[instruction.name as string] = {};
    (value[instruction.name as string] as Record<string, unknown>)[
      options.attributesKey as string
    ] = attributes;
  } else {
    value[instruction.name as string] = instruction.body;
  }
  addField("instruction", value);
}

function onStartElement(tag: Record<string, unknown>) {
  const name = tag.name as string;
  let attributes = tag.attributes as Record<string, unknown>;
  attributes = manipulateAttributes(attributes);
  const element: Record<string, unknown> = {};
  if (options.compact) {
    if (
      !options.ignoreAttributes && attributes &&
      Object.keys(attributes).length > 0
    ) {
      element[options.attributesKey as string] = {};
      let key = "";
      for (key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
          (element[options.attributesKey as string] as Record<string, unknown>)[
            key
          ] = attributes[key];
        }
      }
    }
    if (
      !(name in currentElement) &&
      (options.alwaysArray instanceof Array
        ? options.alwaysArray.indexOf(name) !== -1
        : options.alwaysArray)
    ) {
      currentElement[name] = [];
    }
    if (currentElement[name] && !(currentElement[name] instanceof Array)) {
      currentElement[name] = [currentElement[name]];
    }
    if (currentElement[name] instanceof Array) {
      (currentElement[name] as unknown[]).push(element);
    } else {
      currentElement[name] = element;
    }
  } else {
    if (!currentElement[options.elementsKey as string]) {
      currentElement[options.elementsKey as string] = [];
    }
    element[options.typeKey as string] = "element";
    element[options.nameKey as string] = name;
    if (
      !options.ignoreAttributes && attributes && Object.keys(attributes).length
    ) {
      element[options.attributesKey as string] = attributes;
    }
    if (options.alwaysChildren) {
      element[options.elementsKey as string] = [];
    }
    (currentElement[options.elementsKey as string] as unknown[]).push(element);
  }
  element[options.parentKey as string] = currentElement; // will be deleted in onEndElement()
  currentElement = element;
}

function onText(text: string) {
  if (options.ignoreText) {
    return;
  }
  if (!text.trim() && !options.captureSpacesBetweenElements) {
    return;
  }
  if (options.trim) {
    text = text.trim();
  }
  if (options.sanitize) {
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
      />/g,
      "&gt;",
    );
  }
  if (options.nativeType) {
    text = nativeType(text) as string;
  }
  addField("text", text as unknown as Record<string, unknown>);
}

function onComment(comment: string) {
  if (options.ignoreComment) {
    return;
  }
  if (options.trim) {
    comment = comment.trim();
  }
  addField("comment", comment as unknown as Record<string, unknown>);
}

function onEndElement(_name: unknown) {
  const parentElement = currentElement[options.parentKey as string];
  delete currentElement[options.parentKey as string];
  currentElement = parentElement as Record<string, unknown>;
}

function onCdata(cdata: string) {
  if (options.ignoreCdata) {
    return;
  }
  if (options.trim) {
    cdata = cdata.trim();
  }
  addField("cdata", cdata as unknown as Record<string, unknown>);
}

function onDoctype(doctype: string) {
  if (options.ignoreDoctype) {
    return;
  }
  doctype = doctype.replace(/^ /, "");
  if (options.trim) {
    doctype = doctype.trim();
  }
  addField("doctype", doctype as unknown as Record<string, unknown>);
}

function onError(error: unknown) {
  (error as Record<string, unknown>).note = error; //console.error(error);
}

export default function (xml: string, userOptions: Xml2JsOptions) {
  const parser = new SaxesParser();
  const result: Record<string, unknown> = {};
  currentElement = result;

  options = validateOptions(userOptions);

  // parser.opt = {strictEntities: true};
  parser.on("opentag", onStartElement);
  parser.on("text", onText);
  parser.on("comment", onComment);
  parser.on("closetag", onEndElement);
  parser.on("error", onError);
  parser.on("cdata", onCdata);
  parser.on("doctype", onDoctype);
  parser.on("processinginstruction", onInstruction);
  parser.on("xmldecl", onDeclaration);

  parser.write(xml).close();

  if (result[options.elementsKey as string]) {
    const temp = result[options.elementsKey as string];
    delete result[options.elementsKey as string];
    result[options.elementsKey as string] = temp;
    delete result.text;
  }

  return result;
}
