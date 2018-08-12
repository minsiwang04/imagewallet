// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Canvas renderer.
 */

// Module imports.
import * as DEFAULTS from '../defaults/index';

/**
 * Canvas renderer.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    const $canvas = (ctx.$canvas = document.createElement('canvas'));
    $canvas.classList.add('ts-iw');
    $canvas.height = DEFAULTS.CANVAS.height;
    $canvas.width = DEFAULTS.CANVAS.width;
    ctx.$ctx = $canvas.getContext('2d');
}
