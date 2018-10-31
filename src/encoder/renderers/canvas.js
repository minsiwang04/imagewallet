// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Canvas renderer.
 */

// Module imports.
import * as DEFAULTS from '../defaults/canvas';

/**
 * Canvas renderer.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    const $canvas = document.createElement('canvas');
    $canvas.classList.add('ts-iw');
    $canvas.height = DEFAULTS.height;
    $canvas.width = DEFAULTS.width;

    ctx.$canvas = $canvas;
    ctx.$ctx = $canvas.getContext('2d');
}
