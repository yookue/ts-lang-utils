/*
 * Copyright (c) 2023 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License (the "License")
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */


/**
 * Utilities for regex
 *
 * @author David Hsing
 */
// noinspection JSUnusedGlobalSymbols
export abstract class RegexUtils {
    /**
     * Returns a regex that compiled by the given pattern
     *
     * @param pattern the pattern to inspect
     * @param flags any combination of <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#flags' target='_blank'>flag values</a>
     *
     * @returns a regex that compiled by the given pattern
     *
     * @example
     * RegexUtils.compilePattern('[a-zA-Z0-9]+', 'g');
     */
    public static compilePattern(pattern?: string, flags?: string): RegExp | undefined {
        if (!pattern) {
            return undefined;
        }
        try {
            return new RegExp(pattern, flags);
        } catch (ignored) {
        }
        return undefined;
    }

    /**
     * Returns the array of strings that match the given pattern in the text
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     *
     * @returns the array of strings that match the given pattern in the text
     *
     * @example
     * RegexUtils.extractWords('foo, & bar');    // ['foo', 'bar']
     */
    public static extractWords(text?: string | null, search: string | RegExp = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g): string[] | undefined {
        return !text ? undefined : (text.match(search) || undefined);
    }

    /**
     * Returns whether the given pattern can be compiled to a regex
     *
     * @param pattern the pattern to check
     * @param flags any combination of <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#flags' target='_blank'>flag values</a>
     *
     * @returns whether the given pattern can be compiled to a regex
     *
     * @example
     * RegexUtils.isCompilable(undefined);    // false
     * RegexUtils.isCompilable('foobar');    // true
     * RegexUtils.isCompilable('[a-zA-Z0-9]+', 'g');    // true
     */
    public static isCompilable(pattern?: string | null, flags?: string): boolean {
        if (!pattern) {
            return false;
        }
        try {
            new RegExp(pattern, flags);
            return true;
        } catch (ignored) {
        }
        return false;
    }

    /**
     * Returns whether the source text can be tested by the given regex, and resets the last index of the regex
     *
     * @param regex the regex to match
     * @param text the source text to check
     *
     * @returns whether the source text can be tested by the given pattern, and resets the last index of the regex
     */
    public static testResetting(regex?: RegExp, text?: string | null): boolean {
        if (!regex || !text) {
            return false;
        }
        regex.lastIndex = 0;
        const result = regex.test(text);
        regex.lastIndex = 0;
        return result;
    }
}
