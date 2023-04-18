// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';
import { hasBuffer } from "../has.js";
import { isFunction } from "./function.js";

// We define these interfaces to not have the Buffer type
// (doing this removes the need for node types being available)

/**
 * @name isBuffer
 * @summary Tests for a `Buffer` object instance.
 * @description
 * Checks to see if the input object is an instance of `Buffer`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBuffer } from '@polkadot/util';
 *
 * console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
 * ```
 */
export function isBuffer(value) {
  // we do check a function first, since it is slightly faster than isBuffer itself
  return hasBuffer && isFunction(value && value.readDoubleLE) && xglobal.Buffer.isBuffer(value);
}