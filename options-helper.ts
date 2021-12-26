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

export default {
  copyOptions: function (options: Record<string, unknown>) {
    const copy: Record<string, unknown> = {};
    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        copy[key] = options[key];
      }
    }
    return copy;
  },

  ensureFlagExists: function (item: string, options: Record<string, unknown>) {
    if (!(item in options) || typeof options[item] !== "boolean") {
      options[item] = false;
    }
  },

  ensureSpacesExists: function (options: Record<string, unknown>) {
    if (
      !("spaces" in options) ||
      (typeof options.spaces !== "number" && typeof options.spaces !== "string")
    ) {
      options.spaces = 0;
    }
  },

  ensureAlwaysArrayExists: function (options: Record<string, unknown>) {
    if (
      !("alwaysArray" in options) ||
      (typeof options.alwaysArray !== "boolean" &&
        !Array.isArray(options.alwaysArray))
    ) {
      options.alwaysArray = false;
    }
  },

  ensureKeyExists: function (key: string, options: Record<string, unknown>) {
    if (!(key + "Key" in options) || typeof options[key + "Key"] !== "string") {
      options[key + "Key"] = options.compact ? "_" + key : key;
    }
  },
};
