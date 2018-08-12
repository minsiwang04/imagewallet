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

// Default qr code padding.
export const errorCorrectionLevel = 'M';

// Default qr code frame width.
export const frameWidth = 4;

// Default qr code padding.
export const padding = CANVAS.padding;

// Default qr code size.
export const size = 170;

// Default qr code x position.
export const x = (CANVAS.width - size) / 2;

// Default qr code y position.
export const y = (CANVAS.height - size) / 2 + 50;
