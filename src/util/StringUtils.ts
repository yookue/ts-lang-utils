/*
 * Copyright (c) 2023 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License.
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


import {ArrayUtils} from './ArrayUtils';
import {ObjectUtils} from './ObjectUtils';


/**
 * Utility functions for string
 *
 * @abstract
 * @hideconstructor
 */
export abstract class StringUtils {
    /**
     * Returns whether the given string is empty
     *
     * @param text the string to check
     * @returns true if the given string is empty
     *
     * @example
     * StringUtils.isEmpty(undefined);    // true
     * StringUtils.isEmpty('foobar');    // false
     */
    public static isEmpty(text?: string) : boolean {
        return !text || text.length === 0;
    }

    /**
     * Returns whether the given string is not empty
     *
     * @param text the string to check
     * @returns true if the given string is not empty
     *
     * @example
     * StringUtils.isNotEmpty('foobar');    // true
     */
    public static isNotEmpty(text?: string) : boolean {
        return !this.isEmpty(text);
    }

    /**
     * Returns whether the given string is blank
     *
     * @description check if all the characters in the given string is whitespace or line separators
     * @param text the string to check
     * @returns true if the given string is blank
     *
     * @example
     * StringUtils.isBlank(undefined);    // true
     * StringUtils.isBlank('foobar');    // false
     */
    public static isBlank(text?: string): boolean {
        if (!text || text.length === 0) {
            return true;
        }
        const length = text.length;
        for (let i = 0; i < length; i++) {
            const character = text.charAt(i);
            if (character !== ' ' && character !== '\\r' && character !== '\\n') {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns whether the given string is not blank
     *
     * @param text the string to check
     * @returns true if the given string is not blank
     *
     * @example
     * StringUtils.isNotBlank('foobar');    // true
     */
    public static isNotBlank(text?: string) : boolean {
        return !this.isBlank(text);
    }

    /**
     * Returns whether all the characters in the given string is whitespace
     *
     * @param text the string to check
     * @returns true if all the characters in the given string is whitespace
     */
    public static isWhitespace(text?: string): boolean {
        if (!text || text.length === 0) {
            return false;
        }
        const length = text.length;
        for (let i = 0; i < length; i++) {
            if (text.charAt(i) !== ' ') {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns whether all the given texts are empty
     *
     * @param texts the texts to check
     * @return true if all the given texts are empty
     *
     * @example
     * StringUtils.allEmpty(null, undefined);    // true
     * StringUtils.allEmpty(null, 'true');    // false
     */
    public static allEmpty(...texts: Array<string | undefined>): boolean {
        return !texts || texts.length === 0 || !texts.some(text => this.isNotEmpty(text));
    }

    /**
     * Returns whether all the given texts are not empty
     *
     * @param texts the texts to check
     * @return true if all the given texts are not empty
     *
     * @example
     * StringUtils.allNotEmpty(null, undefined);    // false
     * StringUtils.allNotEmpty(null, 'world');    // false
     * StringUtils.allNotEmpty('foo', 'bar');    // true
     */
    public static allNotEmpty(...texts: Array<string | undefined>): boolean {
        return texts && texts.length > 0 && !texts.some(text => this.isEmpty(text));
    }

    /**
     * Returns whether any of the given texts is empty
     *
     * @param texts the texts to check
     * @return true if any of the given texts is empty
     *
     * @example
     * StringUtils.anyEmpty(null, undefined);    // true
     * StringUtils.anyEmpty('foo', 'bar');    // false
     */
    public static anyEmpty(...texts: Array<string | undefined>): boolean {
        return !texts || texts.length === 0 || texts.some(text => this.isEmpty(text));
    }

    /**
     * Returns whether any of the given texts is not empty
     *
     * @param texts the texts to check
     * @return true if any of the given texts is not empty
     *
     * @example
     * StringUtils.anyNotEmpty(null, undefined);    // false
     * StringUtils.anyNotEmpty(null, 'world');    // true
     */
    public static anyNotEmpty(...texts: Array<string | undefined>): boolean {
        return texts && texts.length > 0 && texts.some(text => this.isNotEmpty(text));
    }

    /**
     * Returns whether all the given texts are blank
     *
     * @param texts the texts to check
     * @return true if all the given texts are blank
     *
     * @example
     * StringUtils.allBlank(null, undefined);    // true
     * StringUtils.allBlank(null, 'true');    // false
     */
    public static allBlank(...texts: Array<string | undefined>): boolean {
        return !texts || texts.length === 0 || !texts.some(text => this.isNotBlank(text));
    }

    /**
     * Returns whether all the given texts are not blank
     *
     * @param texts the texts to check
     * @return true if all the given texts are not blank
     *
     * @example
     * StringUtils.allNotBlank(null, undefined);    // false
     * StringUtils.allNotBlank(null, 'world');    // false
     * StringUtils.allNotBlank('foo', 'bar');    // true
     */
    public static allNotBlank(...texts: Array<string | undefined>): boolean {
        return texts && texts.length > 0 && !texts.some(text => this.isBlank(text));
    }

    /**
     * Returns whether any of the given texts is blank
     *
     * @param texts the texts to check
     * @return true if any of the given texts is blank
     *
     * @example
     * StringUtils.anyBlank(null, undefined);    // true
     * StringUtils.anyBlank('foo', 'bar');    // false
     */
    public static anyBlank(...texts: Array<string | undefined>): boolean {
        return !texts || texts.length === 0 || texts.some(text => this.isBlank(text));
    }

    /**
     * Returns whether any of the given texts is not blank
     *
     * @param texts the texts to check
     * @return true if any of the given texts is not blank
     *
     * @example
     * StringUtils.anyNotBlank(null, undefined);    // false
     * StringUtils.anyNotBlank(null, 'world');    // true
     */
    public static anyNotBlank(...texts: Array<string | undefined>): boolean {
        return texts && texts.length > 0 && texts.some(text => this.isNotBlank(text));
    }

    /**
     * Returns the default value if the given text is empty, or the text self if it is not empty
     *
     * @param text the text to check
     * @param defaultValue the default value placeholder
     * @return string the default value if the given text is empty, or the text self if it is not empty
     *
     * @example
     * StringUtils.defaultIfEmpty(undefined, 'foobar');    // 'foobar'
     */
    public static defaultIfEmpty(text?: string, defaultValue?: string): string | undefined {
        return this.isEmpty(text) ? defaultValue : text;
    }

    /**
     * Returns the default value if the given text is blank, or the text self if it is not blank
     *
     * @param text the text to check
     * @param defaultValue the default value placeholder
     * @return string the default value if the given text is blank, or the text self if it is not blank
     *
     * @example
     * StringUtils.defaultIfBlank(undefined, 'foobar');    // 'foobar'
     */
    public static defaultIfBlank(text?: string, defaultValue?: string): string | undefined {
        return this.isBlank(text) ? defaultValue : text;
    }

    /**
     * Returns whether the given strings are equal
     *
     * @param text the source string to check
     * @param comparison the target string to compare
     * @returns true if the given strings are equal
     *
     * @example
     * StringUtils.equals('foo', 'foo');    // true
     * StringUtils.equals('foo', 'bar');    // false
     */
    public static equals(text?: string, comparison?: string): boolean {
        if (text === comparison || ObjectUtils.allNil(text, comparison)) {
            return true;
        }
        if (ObjectUtils.anyNil(text, comparison) || text?.length !== comparison?.length) {
            return false;
        }
        return text === comparison;
    }

    /**
     * Returns whether the given strings are equal, case-insensitive
     *
     * @param text the source string to check
     * @param comparison the target string to compare
     * @returns true if the given strings are equal, case-insensitive
     *
     * @example
     * StringUtils.equalsIgnoreCase('foo', 'FOO');    // true
     */
    public static equalsIgnoreCase(text?: string, comparison?: string): boolean {
        if (text === comparison || ObjectUtils.allNil(text, comparison)) {
            return true;
        }
        if (ObjectUtils.anyNil(text, comparison) || text?.length !== comparison?.length) {
            return false;
        }
        return text?.toUpperCase() === comparison?.toUpperCase();
    }

    /**
     * Returns whether the given string equals to any of the comparison strings
     *
     * @param text the source string to check
     * @param comparisons the target strings to compare
     * @returns true if the given string equals to any of the comparison strings
     *
     * @example
     * StringUtils.equalsAny('foo', ['foo', 'bar']);    // true
     */
    public static equalsAny(text?: string, comparisons?: Array<string | undefined>): boolean {
        return ArrayUtils.includes(comparisons, text);
    }

    /**
     * Returns whether the given text equals to any of the comparison strings, case-insensitive
     *
     * @param text the source string to check
     * @param comparisons the target strings to compare
     * @returns true if the given string equals to any of the comparison strings, case-insensitive
     *
     * @example
     * StringUtils.equalsAnyIgnoreCase('foo', ['FOO', 'bar']);    // true
     */
    public static equalsAnyIgnoreCase(text?: string, comparisons?: Array<string | undefined>): boolean {
        if (ObjectUtils.isNil(text) || ArrayUtils.isEmpty(comparisons)) {
            return false;
        }
        // @ts-ignore
        return comparisons.some(comparison => this.equalsIgnoreCase(text, comparison));
    }

    /**
     * Returns whether the given text includes the comparison string
     *
     * @param text the source string to check
     * @param comparison the target string to compare
     * @returns true if the given text includes the comparison string
     *
     * @example
     * StringUtils.includes('foobar', 'foo');    // true
     */
    public static includes(text?: string, comparison?: string): boolean {
        // @ts-ignore
        return text === comparison || (ObjectUtils.allNotNil(text, comparison) && text.includes(comparison));
    }

    /**
     * Returns whether the given text includes the comparison string, case-insensitive
     *
     * @param text the source string to check
     * @param comparison the target string to compare
     * @returns true if the given text includes the comparison string, case-insensitive
     *
     * @example
     * StringUtils.includesIgnoreCase('foobar', 'FOO');    // true
     */
    public static includesIgnoreCase(text?: string, comparison?: string): boolean {
        // @ts-ignore
        return text === comparison || (ObjectUtils.allNotNil(text, comparison) && text?.toUpperCase()?.includes(comparison?.toUpperCase()));
    }

    /**
     * Returns whether the given text includes to any of the comparison strings
     *
     * @param text the source string to check
     * @param comparisons the target strings to compare
     * @returns true if the given text includes the comparison string
     *
     * @example
     * StringUtils.includesAny('foobar', ['foo', 'bar']);    // true
     */
    public static includesAny(text: string, comparisons: Array<string | undefined>): boolean {
        return ObjectUtils.allNotNil(text, comparisons) && comparisons?.some(comparison => this.includes(text, comparison));
    }

    /**
     * Returns whether the given text includes to any of the comparison strings, case-insensitive
     *
     * @param text the source string to check
     * @param comparisons the target strings to compare
     * @returns true if the text includes the comparison string, case-insensitive
     *
     * @example
     * StringUtils.includesAnyIgnoreCase('foobar', ['FOO', 'world']);    // true
     */
    public static includesAnyIgnoreCase(text: string, comparisons: Array<string | undefined>): boolean {
        return ObjectUtils.allNotNil(text, comparisons) && comparisons?.some(comparison => this.includesIgnoreCase(text, comparison));
    }

    /**
     * Returns a string that trimmed from the given string
     *
     * @param text the string to trim
     * @param emptyAsNull whether to return null if the trimmed result is empty
     * @return string the trimmed string value from the given string
     *
     * @example
     * StringUtils.trim('foobar', true);    // 'foobar'
     */
    public static trim(text?: string, emptyAsNull?: boolean): string | null | undefined {
        if (!text) {
            return text;
        }
        const result = text.trim();
        return (emptyAsNull && this.isEmpty(result)) ? null : result;
    }
}
