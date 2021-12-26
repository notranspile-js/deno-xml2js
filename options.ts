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

export type Xml2JsOptions = {
  ignoreDeclaration?: boolean;
  ignoreInstruction?: boolean;
  ignoreAttributes?: boolean;
  ignoreText?: boolean;
  ignoreComment?: boolean;
  ignoreCdata?: boolean;
  ignoreDoctype?: boolean;
  compact?: boolean;
  alwaysChildren?: boolean;
  trim?: boolean;
  nativeType?: boolean;
  nativeTypeAttributes?: boolean;
  sanitize?: boolean;
  instructionHasAttributes?: boolean;
  captureSpacesBetweenElements?: boolean;
  alwaysArray?: boolean | string[];
  declarationKey?: string;
  instructionKey?: string;
  attributesKey?: string;
  textKey?: string;
  commentKey?: string;
  cdataKey?: string;
  doctypeKey?: string;
  typeKey?: string;
  nameKey?: string;
  elementsKey?: string;
  parentKey?: string;
};
