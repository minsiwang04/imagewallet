// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Wallet header text defaults.
 */

// Module imports.
import * as CANVAS from './canvas';

// Default header text.
export const text = 'Do NOT share this File or QR code!';

// Default header text alignment.
export const textAlign = CANVAS.textAlign;

// Default header font.
export const font = '20px ' + CANVAS.fontFamily;

// Default header x position.
export const x = CANVAS.width / 2;

// Default header y position.
export const y = CANVAS.padding * 14;
