// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Footer renderer.
 */

// Module imports.
import * as DEFAULTS from '../defaults/index';
import { renderText } from '../../utils/rendering';

/**
 * Footer renderer.
 * @param {EncodingContextInfo} ctx - Encoding processing context information.
 */
export default async function(ctx) {
    renderText(
        ctx.$ctx,
        DEFAULTS.FOOTER.text,
        DEFAULTS.FOOTER.font,
        DEFAULTS.FOOTER.x,
        DEFAULTS.FOOTER.y,
    );
}
