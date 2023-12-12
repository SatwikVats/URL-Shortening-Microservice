"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertIdToShortURL = (n) => {
    let map = "abcdefghijklmnopqrstuvwxyzABCDEF";
    "GHIJKLMNOPQRSTUVWXYZ0123456789./";
    let shortURL = "";
    // Convert given integer id to a base 64 number 
    while (n) {
        shortURL = shortURL + map[n % 64];
        n = Math.floor(n / 64);
    }
    // Reverse shortURL to complete base conversion 
    shortURL = shortURL.split('').reverse().join('');
    return shortURL;
};
exports.default = convertIdToShortURL;
