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
import {RegexUtils} from './RegexUtils';


/**
 * Utilities for string
 *
 * @abstract
 * @hideconstructor
 */
export abstract class StringUtils {
    /**
     * Returns the length of the given string
     *
     * @param {string} text the source string to check
     *
     * @return {number} the length of the given string
     */
    public static getLength(text?: string | null): number {
        return text ? text.length : 0;
    }

    /**
     * Returns whether the given string is empty
     *
     * @param {string} text the string to check
     *
     * @return {boolean} whether the given string is empty
     *
     * @example
     * StringUtils.isEmpty(undefined);    // true
     * StringUtils.isEmpty('foobar');    // false
     */
    public static isEmpty(text?: string | null): boolean {
        return !text || text.length === 0;
    }

    /**
     * Returns whether the given string is not empty
     *
     * @param {string} text the string to check
     *
     * @return {boolean} whether the given string is not empty
     *
     * @example
     * StringUtils.isNotEmpty('foobar');    // true
     */
    public static isNotEmpty(text?: string | null): boolean {
        return !this.isEmpty(text);
    }

    /**
     * Returns whether the given string is blank
     *
     * @description check if all the characters in the given string is whitespace or line separators
     *
     * @param {string} text the string to check
     *
     * @return {boolean} whether the given string is blank
     *
     * @example
     * StringUtils.isBlank(undefined);    // true
     * StringUtils.isBlank('foobar');    // false
     */
    public static isBlank(text?: string | null): boolean {
        return !text || text?.length === 0 || /^\s*$/.test(text);
    }

    /**
     * Returns whether the given string is not blank
     *
     * @param {string} text the string to check
     *
     * @return {boolean} whether the given string is not blank
     *
     * @example
     * StringUtils.isNotBlank('foobar');    // true
     */
    public static isNotBlank(text?: string | null): boolean {
        return !this.isBlank(text);
    }

    /**
     * Returns whether all the given texts are empty
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether all the given texts are empty
     *
     * @example
     * StringUtils.allEmpty(null, undefined);    // true
     * StringUtils.allEmpty(null, 'true');    // false
     */
    public static allEmpty(...texts: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || !texts.some(text => this.isNotEmpty(text));
    }

    /**
     * Returns whether all the given texts are not empty
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether all the given texts are not empty
     *
     * @example
     * StringUtils.allNotEmpty(null, undefined);    // false
     * StringUtils.allNotEmpty(null, 'world');    // false
     * StringUtils.allNotEmpty('foo', 'bar');    // true
     */
    public static allNotEmpty(...texts: Array<string | undefined | null>): boolean {
        return texts && texts.length > 0 && !texts.some(text => this.isEmpty(text));
    }

    /**
     * Returns whether any of the given texts is empty
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether any of the given texts is empty
     *
     * @example
     * StringUtils.anyEmpty(null, undefined);    // true
     * StringUtils.anyEmpty('foo', 'bar');    // false
     */
    public static anyEmpty(...texts: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || texts.some(text => this.isEmpty(text));
    }

    /**
     * Returns whether any of the given texts is not empty
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether any of the given texts is not empty
     *
     * @example
     * StringUtils.anyNotEmpty(null, undefined);    // false
     * StringUtils.anyNotEmpty(null, 'world');    // true
     */
    public static anyNotEmpty(...texts: Array<string | undefined | null>): boolean {
        return texts && texts?.length > 0 && texts.some(text => this.isNotEmpty(text));
    }

    /**
     * Returns whether all the given texts are blank
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether all the given texts are blank
     *
     * @example
     * StringUtils.allBlank(null, undefined);    // true
     * StringUtils.allBlank(null, 'true');    // false
     */
    public static allBlank(...texts: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || !texts.some(text => this.isNotBlank(text));
    }

    /**
     * Returns whether all the given texts are not blank
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether all the given texts are not blank
     *
     * @example
     * StringUtils.allNotBlank(null, undefined);    // false
     * StringUtils.allNotBlank(null, 'world');    // false
     * StringUtils.allNotBlank('foo', 'bar');    // true
     */
    public static allNotBlank(...texts: Array<string | undefined | null>): boolean {
        return texts && texts.length > 0 && !texts.some(text => this.isBlank(text));
    }

    /**
     * Returns whether any of the given texts is blank
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether any of the given texts is blank
     *
     * @example
     * StringUtils.anyBlank(null, undefined);    // true
     * StringUtils.anyBlank('foo', 'bar');    // false
     */
    public static anyBlank(...texts: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || texts.some(text => this.isBlank(text));
    }

    /**
     * Returns whether any of the given texts is not blank
     *
     * @param {Array<string>} texts the texts to check
     *
     * @return {boolean} whether any of the given texts is not blank
     *
     * @example
     * StringUtils.anyNotBlank(null, undefined);    // false
     * StringUtils.anyNotBlank(null, 'world');    // true
     */
    public static anyNotBlank(...texts: Array<string | undefined | null>): boolean {
        return texts && texts.length > 0 && texts.some(text => this.isNotBlank(text));
    }

    /**
     * Returns a string that concat the given text and suffix
     *
     * @param {string} text the text to check
     * @param {string} suffix the suffix to append
     *
     * @return {string} a string that concat the given text and suffix
     *
     * @example
     * StringUtils.appendIfMissing('foo', 'bar');    // 'foobar'
     * StringUtils.appendIfMissing('foobar', 'bar');    // 'foobar'
     */
    public static appendIfMissing(text?: string | null, suffix?: string | null): string | undefined | null {
        return (!text || this.isEmpty(suffix) || this.endsWith(text, suffix)) ? text : (text + suffix);
    }

    /**
     * Returns a string that concat the given text and suffix, case-insensitive
     *
     * @param {string} text the text to check
     * @param {string} suffix the suffix to append
     *
     * @return {string} a string that concat the given text and suffix, case-insensitive
     *
     * @example
     * StringUtils.appendIfMissingIgnoreCase('foo', 'bar');    // 'foobar'
     * StringUtils.appendIfMissingIgnoreCase('foobar', 'BAR');    // 'foobar'
     */
    public static appendIfMissingIgnoreCase(text?: string | null, suffix?: string | null): string | undefined | null {
        return (!text || this.isEmpty(suffix) || this.endsWithIgnoreCase(text, suffix)) ? text : (text + suffix);
    }

    /**
     * Returns the first letter capitalized representation of the given string
     *
     * @param {string} text the source string to check
     *
     * @return {string} the first letter capitalized representation of the given string

     @example
     StringUtils.capitalizeFirst('foobar');    // 'Foobar'
     */
    public static capitalizeFirst(text?: string | null): string | undefined | null {
        return !text ? text : text.substring(0, 1).toUpperCase() + text.substring(1);
    }

    /**
     * Returns an empty value if the given text is undefined
     *
     * @param {string} text the text to check
     *
     * @return {string} an empty value if the given text is undefined
     *
     * @example
     * StringUtils.defaultString(undefined);    // ''
     * StringUtils.defaultString(null);    // ''
     */
    public static defaultString(text?: string | null): string {
        return text ? text : '';
    }

    /**
     * Returns the default value if the given text is empty, or the text self if it is not empty
     *
     * @param {string} text the text to check
     * @param {string} defaultValue the default value placeholder
     *
     * @return {string} the default value if the given text is empty, or the text self if it is not empty
     *
     * @example
     * StringUtils.defaultIfEmpty(undefined, 'foobar');    // 'foobar'
     */
    public static defaultIfEmpty(text?: string | null, defaultValue?: string | null): string | undefined | null {
        return this.isEmpty(text) ? defaultValue : text;
    }

    /**
     * Returns the default value if the given text is blank, or the text self if it is not blank
     *
     * @param {string} text the text to check
     * @param {string} defaultValue the default value placeholder
     *
     * @return {string} the default value if the given text is blank, or the text self if it is not blank
     *
     * @example
     * StringUtils.defaultIfBlank(undefined, 'foobar');    // 'foobar'
     */
    public static defaultIfBlank(text?: string | null, defaultValue?: string | null): string | undefined | null {
        return this.isBlank(text) ? defaultValue : text;
    }

    /**
     * Returns whether the given string ends with the suffix
     *
     * @param {string} text the source string to check
     * @param {string} suffix the target string to compare
     *
     * @return {boolean} whether the given string ends with the suffix
     *
     * @example
     * StringUtils.endsWith('foobar', 'bar');    // true
     * StringUtils.endsWith('hello', 'bar');    // false
     */
    public static endsWith(text?: string | null, suffix?: string | null): boolean {
        if (!text || !suffix) {
            return text === suffix;
        }
        if (text.length < suffix.length) {
            return false;
        }
        return text.endsWith(suffix);
    }

    /**
     * Returns whether the given string ends with the suffix, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {string} suffix the target string to compare
     *
     * @return {boolean} whether the given string ends with the suffix, case-insensitive
     *
     * @example
     * StringUtils.endsWithIgnoreCase('foobar', 'BAR');    // true
     * StringUtils.endsWithIgnoreCase('hello', 'BAR');    // false
     */
    public static endsWithIgnoreCase(text?: string | null, suffix?: string | null): boolean {
        if (!text || !suffix) {
            return text === suffix;
        }
        if (text.length < suffix.length) {
            return false;
        }
        return text.toLowerCase().endsWith(suffix.toLowerCase());
    }

    /**
     * Returns whether the given string ends with any of the suffixes
     *
     * @param {string} text the source string to check
     * @param {Array<string>} suffixes the target strings to compare
     *
     * @return {boolean} whether the given string ends with any of the suffixes
     *
     * @example
     * StringUtils.endsWithAny('foobar', ['foo', 'bar']);    // true
     * StringUtils.endsWithAny('hello', ['foo', 'bar']);    // false
     */
    public static endsWithAny(text?: string | null, suffixes?: Array<string | undefined | null>): boolean {
        if (!text || !suffixes || suffixes.length === 0) {
            return false;
        }
        return suffixes.some(suffix => this.endsWith(text, suffix));
    }

    /**
     * Returns whether the given string ends with any of the suffixes, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {Array<string>} suffixes the target strings to compare
     *
     * @return {boolean} whether the given string ends with any of the suffixes, case-insensitive
     *
     * @example
     * StringUtils.endsWithAnyIgnoreCase('foobar', ['FOO', 'BAR']);    // true
     * StringUtils.endsWithAnyIgnoreCase('hello', ['FOO', 'BAR']);    // false
     */
    public static endsWithAnyIgnoreCase(text?: string | null, suffixes?: Array<string | undefined | null>): boolean {
        if (!text || !suffixes || suffixes.length === 0) {
            return false;
        }
        return suffixes.some(suffix => this.endsWithIgnoreCase(text, suffix));
    }

    /**
     * Returns whether the given strings are equal
     *
     * @param {string} text the source string to check
     * @param {string} comparison the target string to compare
     *
     * @return {boolean} whether the given strings are equal
     *
     * @example
     * StringUtils.equals(undefined, null);    // false
     * StringUtils.equals('foo', 'foo');    // true
     * StringUtils.equals('foo', 'bar');    // false
     */
    public static equals(text?: string | null, comparison?: string | null): boolean {
        if (text === comparison) {
            return true;
        }
        if (!text || !comparison || text?.length !== comparison?.length) {
            return false;
        }
        return text === comparison;
    }

    /**
     * Returns whether the given strings are equal, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {string} comparison the target string to compare
     *
     * @return {boolean} whether the given strings are equal, case-insensitive
     *
     * @example
     * StringUtils.equalsIgnoreCase('foo', 'FOO');    // true
     */
    public static equalsIgnoreCase(text?: string | null, comparison?: string | null): boolean {
        if (text === comparison) {
            return true;
        }
        if (!text || !comparison || text?.length !== comparison?.length) {
            return false;
        }
        return text?.toUpperCase() === comparison?.toUpperCase();
    }

    /**
     * Returns whether the given string equals to any of the comparison strings
     *
     * @param {string} text the source string to check
     * @param {Array<string>} comparisons the target strings to compare
     *
     * @return {boolean} whether the given string equals to any of the comparison strings
     *
     * @example
     * StringUtils.equalsAny('foo', ['foo', 'bar']);    // true
     */
    public static equalsAny(text?: string | null, comparisons?: Array<string | undefined | null>): boolean {
        return ArrayUtils.includes(comparisons, text);
    }

    /**
     * Returns whether the given text equals to any of the comparison strings, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {Array<string>} comparisons the target strings to compare
     *
     * @return {boolean} whether the given string equals to any of the comparison strings, case-insensitive
     *
     * @example
     * StringUtils.equalsAnyIgnoreCase('foo', ['FOO', 'bar']);    // true
     */
    public static equalsAnyIgnoreCase(text?: string | null, comparisons?: Array<string | undefined | null>): boolean {
        if (!text || !comparisons || comparisons.length === 0) {
            return false;
        }
        return comparisons.some(comparison => this.equalsIgnoreCase(text, comparison));
    }

    /**
     * Returns the replaced string of the source string ("{}" placeholder) with the given parameters
     *
     * @param {string} text the source string to inspect
     * @param {Array<any>} params the parameters to replaced with
     *
     * @return {string} the replaced string of the source string
     *
     * @example
     * StringUtils.formatBrace('foo{}', 'bar');    //  'foobar'
     * StringUtils.formatBrace('foobar{}');    //  'foobar{}'
     * StringUtils.formatBrace('hello {}, foo{}', 'world', 'bar');    //  'hello world, foobar'
     */
    public static formatBrace(text?: string | null, ...params: any[]): string | undefined | null {
        if (!text || text.length <= 2 || !params || params.length === 0) {
            return text;
        }
        let result = text;
        for (const param of params) {
            result = result.replace('{}', ObjectUtils.toString(param, '') as string);
        }
        return result;
    }

    /**
     * Returns the replaced string of the source string ("%" placeholder) with the given parameters
     *
     * @param {string} text the source string to inspect
     * @param {Array<any>} params the parameters to replaced with
     *
     * @return {string} the replaced string of the source string
     *
     * @see "https://github.com/samsonjs/format/blob/main/format.js"
     *
     * @example
     * StringUtils.formatPercent("foo%s", "bar");    // "foobar"
     * StringUtils.formatPercent("foobar %d", 2023);    // "foobar 2023"
     * StringUtils.formatPercent("hello %s, foo%s", "world", "bar");    // "hello world, foobar"
     */
    public static formatPercent(text?: string | null, ...params: any[]): string | undefined | null {
        if (!text || text.length <= 2 || !params || params.length === 0) {
            return text;
        }
        const matches = text.match(/%[bcdfjosxX]/g) || [];
        const count = ArrayUtils.minLength(matches, params);
        if (count === 0) {
            return text;
        }
        let result = text;
        for (let i = 0; i < count; i++) {
            const param = params[i];
            const pattern = matches[i].substring(1);
            switch (pattern) {
                case 'b':
                case 'c':
                case 'd':
                case 'o':
                case 'x':
                case 'X':
                    try {
                        let value = undefined;
                        if (typeof param === 'string') {
                            value = Number.parseInt(param);
                        } else if (param instanceof String) {
                            value = Number.parseInt(param.toString());
                        } else if (typeof param === 'number') {
                            value = param;
                        }
                        if (value) {
                            if (pattern === 'b') {
                                result = result.replace(`%${pattern}`, (value as number).toString(2));
                            } else if (pattern === 'c') {
                                result = result.replace(`%${pattern}`, String.fromCharCode(value as number));
                            } else if (pattern === 'd') {
                                result = result.replace(`%${pattern}`, (value as number).toString(10));
                            } else if (pattern === 'o') {
                                result = result.replace(`%${pattern}`, '0' + (value as number).toString(8));
                            } else if (pattern === 'x') {
                                result = result.replace(`%${pattern}`, '0x' + (value as number).toString(16));
                            } else if (pattern === 'X') {
                                result = result.replace(`%${pattern}`, '0x' + (value as number).toString(16).toUpperCase());
                            }
                        }
                    } catch (ignored) {
                        throw new TypeError(`Invalid parameter type of '${param}', index ${i}`);
                    }
                    break;
                case 'f':
                    try {
                        let value = undefined;
                        if (typeof param === 'string') {
                            value = Number.parseFloat(param);
                        } else if (param instanceof String) {
                            value = Number.parseFloat(param.toString());
                        } else if (typeof param === 'number') {
                            value = param;
                        }
                        if (value) {
                            result = result.replace(`%${pattern}`, '0x' + (value as number).toString());
                        }
                    } catch (ignored) {
                        throw new TypeError(`Invalid parameter type of '${param}', index ${i}`);
                    }
                    break;
                case 'j':
                    if (param === undefined || param === null) {
                        result = result.replace(`%${pattern}`, '');
                        break;
                    } else if (ObjectUtils.isPlainObject(param)) {
                        result = result.replace(`%${pattern}`, JSON.stringify(param));
                        break;
                    }
                    throw new TypeError(`Invalid parameter type of '${param}', index ${i}`);
                case 's':
                    result = result.replace(`%${pattern}`, ObjectUtils.toString(param, '') as string);
                    break;
                default:
                    break;
            }
        }
        return result;
    }

    /**
     * Returns the replaced string of the source string (named placeholder) with the given parameters
     *
     * @param {string} text the source string to inspect
     * @param {Record<string, any>} params the parameters to replaced with, in the form of key values
     *
     * @return {string} the replaced string of the source string
     *
     * @example
     * StringUtils.formatPlaceholder("foo{bar}", {bar: "bar"});    //  "foobar"
     * StringUtils.formatPlaceholder("foobar{none}");    //  "foobar{none}"
     * StringUtils.formatPlaceholder("foobar{none}", {});    //  "foobar{none}"
     * StringUtils.formatPlaceholder("hello {name}, foo{bar}", {name: "world", bar: "bar"});    //  "hello world, foobar"
     */
    public static formatPlaceholder(text?: string | null, params?: {[key: string]: any}): string | undefined | null {
        if (!text || text.length <= 2 || !params) {
            return text;
        }
        let result = text;
        for (const param in params) {
            const regex = new RegExp(`\\{${param}\\}`, 'g');
            const value = params[param];
            result = result.replace(regex, (value ? value.toString() : ''));
        }
        return result;
    }

    /**
     * Returns whether the given text includes the comparison string
     *
     * @param {string} text the source string to check
     * @param {string} comparison the target string to compare
     *
     * @return {boolean} whether the given text includes the comparison string
     *
     * @example
     * StringUtils.includes('foobar', 'foo');    // true
     */
    public static includes(text?: string | null, comparison?: string | null): boolean {
        return text === comparison || (!!text && !!comparison && text.includes(comparison));
    }

    /**
     * Returns whether the given text includes the comparison string, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {string} comparison the target string to compare
     *
     * @return {boolean} whether the given text includes the comparison string, case-insensitive
     *
     * @example
     * StringUtils.includesIgnoreCase('foobar', 'FOO');    // true
     */
    public static includesIgnoreCase(text?: string | null, comparison?: string | null): boolean {
        return text === comparison || (!!text && !!comparison && text?.toUpperCase()?.includes(comparison?.toUpperCase()));
    }

    /**
     * Returns whether the given text includes to any of the comparison strings
     *
     * @param {string} text the source string to check
     * @param {Array<string>} comparisons the target strings to compare
     *
     * @return {boolean} whether the given text includes the comparison string
     *
     * @example
     * StringUtils.includesAny('foobar', ['foo', 'bar']);    // true
     */
    public static includesAny(text?: string | null, comparisons?: Array<string | undefined | null>): boolean {
        if (!text || !comparisons) {
            return false;
        }
        return comparisons?.some(comparison => this.includes(text, comparison));
    }

    /**
     * Returns whether the given text includes to any of the comparison strings, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {Array<string>} comparisons the target strings to compare
     *
     * @return {boolean} whether the text includes the comparison string, case-insensitive
     *
     * @example
     * StringUtils.includesAnyIgnoreCase('foobar', ['FOO', 'world']);    // true
     */
    public static includesAnyIgnoreCase(text?: string | null, comparisons?: Array<string | undefined | null>): boolean {
        if (!text || !comparisons || comparisons.length === 0) {
            return false;
        }
        return comparisons?.some(comparison => this.includesIgnoreCase(text, comparison));
    }

    /**
     * Returns the joined string with the given texts and delimiter
     *
     * @param {string | Array<string>} texts the source string or strings to inspect
     * @param {string} separator the delimiter string to append between each of the given texts
     * @param {function} filter the filter to check each of the given texts should be included
     *
     * @return {string} the joined string with the given texts and delimiter
     *
     * @example
     * StringUtils.joinWith('foobar');    // 'foobar'
     * StringUtils.joinWith(['foo', 'bar'], undefined);    // 'foobar'
     * StringUtils.joinWith(['foo', 'bar', 'world'], undefined, (text => text !== 'world'));    // 'foobar'
     */
    public static joinWith(texts?: string | string[] | null, separator?: string | null, filter?: (text?: string) => boolean): string | undefined {
        if (!texts || (Array.isArray(texts) && texts.length === 0)) {
            return undefined;
        }
        if (Array.isArray(texts)) {
            if (!filter) {
                return texts.join(this.defaultString(separator));
            }
            const array = texts.filter(filter);
            return (!array || array.length === 0) ? undefined : array.join(this.defaultString(separator));
        }
        return !filter ? (texts as string) : (filter(texts as string) ? (texts as string) : undefined);
    }

    /**
     * Returns a string that concat the given prefix and text
     *
     * @param {string} text the text to check
     * @param {string} prefix the prefix to prepend
     *
     * @return {string} a string that concat the given prefix and text
     *
     * @example
     * StringUtils.prependIfMissing('bar', 'foo');    // 'foobar'
     * StringUtils.prependIfMissing('foobar', 'foo');    // 'foobar'
     */
    public static prependIfMissing(text?: string | null, prefix?: string): string | undefined | null {
        return (!text || this.isEmpty(prefix) || this.startsWith(text, prefix)) ? text : (prefix + text);
    }

    /**
     * Returns a string that concat the given prefix and text, case-insensitive
     *
     * @param {string} text the text to check
     * @param {string} prefix the prefix to prepend
     *
     * @return {string} a string that concat the given prefix and text, case-insensitive
     *
     * @example
     * StringUtils.prependIfMissingIgnoreCase('bar', 'foo');    // 'foobar'
     * StringUtils.prependIfMissingIgnoreCase('foobar', 'FOO');    // 'foobar'
     */
    public static prependIfMissingIgnoreCase(text?: string | null, prefix?: string): string | undefined | null {
        return (!text || this.isEmpty(prefix) || this.startsWithIgnoreCase(text, prefix)) ? text : (prefix + text);
    }

    /**
     * Returns the array that excludes the elements which equals to any of the given exclusions
     *
     * @param {Array<string>} texts the arrays to inspect
     * @param {string} excludes the elements array to exclude
     *
     * @return the array that excludes the elements which equals to any of the given exclusions
     *
     * @example
     * StringUtils.removeEquals(['foo', 'bar'], ['bar']);    // ['foo']
     */
    public static removeEquals(texts?: string[] | null, excludes?: string[] | null): string[] | undefined | null {
        return ArrayUtils.remove(texts, excludes);
    }

    /**
     * Returns the array that excludes the elements which equals to any of the given exclusions, case-insensitive
     *
     * @param {Array<string>} texts the arrays to inspect
     * @param {string} excludes the elements array to exclude
     *
     * @return the array that excludes the elements which equals to any of the given exclusions, case-insensitive
     *
     * @example
     * StringUtils.removeEqualsIgnoreCase(['foo', 'bar'], ['BAR']);    // ['foo']
     */
    public static removeEqualsIgnoreCase(texts?: string[] | null, excludes?: string[] | null): string[] | undefined | null {
        return (!texts || texts.length === 0 || !excludes || excludes.length === 0) ? texts : texts.filter(text => !excludes.some(exclude => this.equalsIgnoreCase(text, exclude)));
    }

    /**
     * Returns the array that excludes the elements which includes any of the given exclusions
     *
     * @param {Array<string>} texts the arrays to inspect
     * @param {string} excludes the elements array to exclude
     *
     * @return the array that excludes the elements which includes any of the given exclusions
     *
     * @example
     * StringUtils.removeIncludes(['foo', 'bar'], ['ar']);    // ['foo']
     */
    public static removeIncludes(texts?: string[] | null, excludes?: string[] | null): string[] | undefined | null {
        return (!texts || texts.length === 0 || !excludes || excludes.length === 0) ? texts : texts.filter(text => !excludes.some(exclude => this.includes(text, exclude)));
    }

    /**
     * Returns the array that excludes the elements which includes any of the given exclusions, case-insensitive
     *
     * @param {Array<string>} texts the arrays to inspect
     * @param {string} excludes the elements array to exclude
     *
     * @return the array that excludes the elements which includes any of the given exclusions, case-insensitive
     *
     * @example
     * StringUtils.removeIncludesIgnoreCase(['foo', 'bar'], ['AR']);    // ['foo']
     */
    public static removeIncludesIgnoreCase(texts?: string[] | null, excludes?: string[] | null): string[] | undefined | null {
        return (!texts || texts.length === 0 || !excludes || excludes.length === 0) ? texts : texts.filter(text => !excludes.some(exclude => this.includesIgnoreCase(text, exclude)));
    }

    /**
     * Returns whether the given string starts with the prefix
     *
     * @param {string} text the source string to check
     * @param {string} prefix the target string to compare
     *
     * @return {boolean} whether the given string starts with the prefix
     *
     * @example
     * StringUtils.startsWith('foobar', 'foo');    // true
     * StringUtils.startsWith('hello', 'bar');    // false
     */
    public static startsWith(text?: string | null, prefix?: string | null): boolean {
        if (!text || !prefix) {
            return text === prefix;
        }
        if (text.length < prefix.length) {
            return false;
        }
        return text.startsWith(prefix);
    }

    /**
     * Returns whether the given string starts with the prefix, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {string} prefix the target string to compare
     *
     * @return {boolean} whether the given string starts with the prefix, case-insensitive
     *
     * @example
     * StringUtils.startsWithIgnoreCase('foobar', 'FOO');    // true
     * StringUtils.startsWithIgnoreCase('hello', 'BAR');    // false
     */
    public static startsWithIgnoreCase(text?: string | null, prefix?: string | null): boolean {
        if (!text || !prefix) {
            return text === prefix;
        }
        if (text.length < prefix.length) {
            return false;
        }
        return text.toLowerCase().startsWith(prefix.toLowerCase());
    }

    /**
     * Returns whether the given string starts with any of the prefixes
     *
     * @param {string} text the source string to check
     * @param {Array<string>} prefixes the target strings to compare
     *
     * @return {boolean} whether the given string starts with any of the prefixes
     *
     * @example
     * StringUtils.startsWithAny('foobar', ['foo', 'bar']);    // true
     * StringUtils.startsWithAny('hello', ['foo', 'bar']);    // false
     */
    public static startsWithAny(text?: string | null, prefixes?: Array<string | undefined | null>): boolean {
        if (!text || !prefixes || prefixes.length === 0) {
            return false;
        }
        return prefixes.some(prefix => this.startsWith(text, prefix));
    }

    /**
     * Returns whether the given string starts with any of the prefixes, case-insensitive
     *
     * @param {string} text the source string to check
     * @param {Array<string>} prefixes the target strings to compare
     *
     * @return {boolean} whether the given string starts with any of the prefixes, case-insensitive
     *
     * @example
     * StringUtils.startsWithAnyIgnoreCase('foobar', ['FOO', 'BAR']);    // true
     * StringUtils.startsWithAnyIgnoreCase('hello', ['FOO', 'BAR']);    // false
     */
    public static startsWithAnyIgnoreCase(text?: string | null, prefixes?: Array<string | undefined | null>): boolean {
        if (!text || !prefixes || prefixes.length === 0) {
            return false;
        }
        return prefixes.some(prefix => this.startsWithIgnoreCase(text, prefix));
    }

    /**
     * Returns the substring after the first occurrence of the given separator (the separator is not returned)
     *
     * @param {string} text the string to get a substring from
     * @param {boolean} separator the String to search for
     *
     * @return {string} the substring after the first occurrence of the given separator
     *
     * @example
     * StringUtils.substringAfter("foo/bar/foo/bar", "/");    // 'bar/foo/bar'
     */
    public static substringAfter(text?: string | null, separator?: string | null): string | undefined {
        if (!text || !separator || separator.length === 0) {
            return undefined;
        }
        const index = text.indexOf(separator);
        return (index === -1) ? undefined : text.substring(index + separator.length);
    }

    /**
     * Returns the substring after the last occurrence of the given separator (the separator is not returned)
     *
     * @param {string} text the string to get a substring from
     * @param {boolean} separator the String to search for
     *
     * @return {string} the substring after the last occurrence of the given separator
     *
     * @example
     * StringUtils.substringAfterLast("foo/bar/foo/bar", "/");    // 'bar'
     */
    public static substringAfterLast(text?: string | null, separator?: string | null): string | undefined {
        if (!text || !separator || separator.length === 0) {
            return undefined;
        }
        const index = text.lastIndexOf(separator);
        return (index === -1) ? undefined : text.substring(index + separator.length);
    }

    /**
     * Returns the substring before the first occurrence of the given separator (the separator is not returned)
     *
     * @param {string} text the string to get a substring from
     * @param {boolean} separator the String to search for
     * @return {string} the substring before the first occurrence of the given separator
     *
     * @example
     * StringUtils.substringBefore("foo/bar/foo/bar", "/");    // 'foo'
     */
    public static substringBefore(text?: string | null, separator?: string | null): string | undefined {
        if (!text || !separator || separator.length === 0) {
            return undefined;
        }
        const index = text.indexOf(separator);
        return (index === -1) ? undefined : text.substring(0, index);
    }

    /**
     * Returns the substring before the last occurrence of the given separator (the separator is not returned)
     *
     * @param {string} text the string to get a substring from
     * @param {boolean} separator the String to search for
     *
     * @return {string} the substring before the last occurrence of the given separator
     *
     * @example
     * StringUtils.substringBeforeLast("foo/bar/foo/bar", "/");    // 'foo/bar/foo'
     */
    public static substringBeforeLast(text?: string | null, separator?: string | null): string | undefined {
        if (!text || !separator || separator.length === 0) {
            return undefined;
        }
        const index = text.lastIndexOf(separator);
        return (index === -1) ? undefined : text.substring(0, index);
    }

    /**
     * Returns the camel case representation of the given string
     *
     * @param {string} text the source string to inspect
     * @param {RegExp | string} pattern the regular expression to match
     *
     * @return {string} the camel case representation of the given string
     *
     * @example
     * StringUtils.toCamelCase('FOO BAR');    // 'fooBar'
     * StringUtils.toCamelCase('--FOO-BAR--');    // 'fooBar'
     */
    public static toCamelCase(text?: string | null, pattern?: RegExp | string): string | undefined | null {
        if (!text || text.length === 0) {
            return text;
        }
        const words = RegexUtils.extractWords(text, pattern);
        return !words ? undefined : words.reduce((previous, current, index) => {
            current = current.toLowerCase();
            return previous + (index > 0 ? this.capitalizeFirst(current) : current);
        }, '');
    }

    /**
     * Returns the kebab case representation of the given string
     *
     * @param {string} text the source string to inspect
     * @param {RegExp | string} pattern the regular expression to match
     *
     * @return {string} the kebab case representation of the given string
     *
     * @example
     * StringUtils.toKebabCase('FOO BAR');    // 'foo-bar'
     * StringUtils.toKebabCase('--FOO-BAR--');    // 'foo-bar'
     */
    public static toKebabCase(text?: string | null, pattern?: RegExp | string): string | undefined | null {
        if (!text || text.length === 0) {
            return text;
        }
        const words = RegexUtils.extractWords(text, pattern);
        return !words ? undefined : words.reduce((previous, current, index) => {
            return previous + (index > 0 ? '-' : '') + current.toLowerCase();
        }, '');
    }

    /**
     * Returns a string that trimmed from the given string
     *
     * @param {string} text the string to trim
     * @param {boolean} emptyAsNull whether to return null if the trimmed result is empty
     *
     * @return {string} the trimmed string value from the given string
     *
     * @example
     * StringUtils.trim("foobar", true);    // 'foobar'
     */
    public static trim(text?: string | null, emptyAsNull?: boolean): string | undefined | null {
        if (!text) {
            return text;
        }
        const result = text.trim();
        return (emptyAsNull && this.isEmpty(result)) ? null : result;
    }
}
