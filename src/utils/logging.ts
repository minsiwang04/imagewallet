// Copyright 2018 Trinkler Software AG (Switzerland).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

/**
 * @fileOverview Library logging utility functions.
 */

// Logging profix.
const LOGGING_PREFIX = 'TS :: IW';

// Set of logging levels.
const LOG_LEVEL_DEBUG = 'DEBUG';
const LOG_LEVEL_ERROR = 'ERROR';
const LOG_LEVEL_INFO = 'INFO';
const LOG_LEVEL_TODO = 'TODO';
const LOG_LEVEL_WARNING = 'WARN';

/**
 * Emits a logging message.
 *
 * @param {string} msg - Message to be logged.
 * @param {string} level - Level of importance.
 */
export const log = async (msg, level) => {
    // TODO: move to 3rd party logging utility.
    console.log(get_formatted_message(msg, level));
};

/**
 * Emits a logging message for debug purposes.
 *
 * @param {string} msg - Message to be logged.
 */
export const logDebug = async (msg) => {
    await log(msg, LOG_LEVEL_DEBUG);
};

/**
 * Emits a logging message for error purposes.
 *
 * @param {Error} err - Trapped error.
 */
export const logError = async (err) => {
    const msg = err.code + ' :: ' + err.message;
    await log(msg, LOG_LEVEL_ERROR);
};

/**
 * Emits a logging message for information purposes.
 *
 * @param {string} msg - Message to be logged.
 */
export const logInfo = async (msg) => {
    await log(msg, LOG_LEVEL_INFO);
};

/**
 * Emits a logging message for warning purposes.
 *
 * @param {string} msg - Message to be logged.
 */
export const logWarning = async (msg) => {
    await log(msg, LOG_LEVEL_WARNING);
};

/**
 * Emits a logging message for TODO purposes.
 *
 * @param {string} msg - Message to be logged.
 */
export const logTODO = async (msg) => {
    await log('todo: ' + msg, LOG_LEVEL_TODO);
};

/**
 * Formats a message to be logged.
 *
 * @param {msg} Message to be logged.
 * @param {level} Level of importance.
 */
const get_formatted_message = (msg, level) => {
    return [
        new Date().toISOString(),
        '[' + (level || LOG_LEVEL_INFO) + ']',
        LOGGING_PREFIX,
        msg,
    ].join(' :: ');
};
