// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Header renderer.
 */

// Module imports.
import * as DEFAULTS from '../defaults/index';
import { renderText } from '../../utils/rendering';

/**
 * Header renderer.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    renderText(
        ctx.$ctx,
        DEFAULTS.HEADER.text,
        DEFAULTS.HEADER.font,
        DEFAULTS.HEADER.x,
        DEFAULTS.HEADER.y,
    );
}
