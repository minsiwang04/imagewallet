// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Types of coins supported by the wallet.
 */

// Module imports.
import _ from 'lodash';
import * as BTC from './btc';
import * as EOS from './eos';
import * as ETH from './eth';
import * as IW from './iw';
import * as NIM from './nim';

// Set of supported coins.
export const SUPPORTED = [
    BTC,
    EOS,
    ETH,
    IW,
    NIM
];

/**
 * Returns coin metadata mapping to passed chain identifier.
 *
 * @param {string} symbol - Coin symbol.
 */
export const getBySymbol = (symbol) => {
    symbol = symbol.toUpperCase();
    return _.find(SUPPORTED, (i) => {
        return i.symbol === symbol;
    });
};
