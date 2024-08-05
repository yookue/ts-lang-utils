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
 * @author David Hsing
 */
// noinspection JSUnusedGlobalSymbols
export abstract class StringUtils {
    /**
     * Returns whether all the given texts are empty
     *
     * @param texts the texts to check
     *
     * @returns whether all the given texts are empty
     *
     * @example
     * StringUtils.allEmpty([null, undefined]);    // true
     * StringUtils.allEmpty([null, 'true']);    // false
     */
    public static allEmpty(texts?: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || texts.every(item => this.isEmpty(item));
    }

    /**
     * Returns whether all the given texts are not empty
     *
     * @param texts the texts to check
     *
     * @returns whether all the given texts are not empty
     *
     * @example
     * StringUtils.allNotEmpty([null, undefined]);    // false
     * StringUtils.allNotEmpty([null, 'world']);    // false
     * StringUtils.allNotEmpty(['foo', 'bar']);    // true
     */
    public static allNotEmpty(texts?: Array<string | undefined | null>): boolean {
        return !!texts && texts.length > 0 && texts.every(item => this.isNotEmpty(item));
    }

    /**
     * Returns whether all the given texts are blank
     *
     * @param texts the texts to check
     *
     * @returns whether all the given texts are blank
     *
     * @example
     * StringUtils.allBlank([null, undefined]);    // true
     * StringUtils.allBlank([null, 'true']);    // false
     */
    public static allBlank(texts?: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || texts.every(item => this.isBlank(item));
    }

    /**
     * Returns whether all the given texts are not blank
     *
     * @param texts the texts to check
     *
     * @returns whether all the given texts are not blank
     *
     * @example
     * StringUtils.allNotBlank([null, undefined]);    // false
     * StringUtils.allNotBlank([null, 'world']);    // false
     * StringUtils.allNotBlank(['foo', 'bar']);    // true
     */
    public static allNotBlank(texts?: Array<string | undefined | null>): boolean {
        return !!texts && texts.length > 0 && texts.every(item => this.isNotBlank(item));
    }

    /**
     * Returns whether any of the given texts is empty
     *
     * @param texts the texts to check
     *
     * @returns whether any of the given texts is empty
     *
     * @example
     * StringUtils.anyEmpty([null, undefined]);    // true
     * StringUtils.anyEmpty(['foo', 'bar']);    // false
     */
    public static anyEmpty(texts?: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || texts.some(item => this.isEmpty(item));
    }

    /**
     * Returns whether any of the given texts is not empty
     *
     * @param texts the texts to check
     *
     * @returns whether any of the given texts is not empty
     *
     * @example
     * StringUtils.anyNotEmpty([null, undefined]);    // false
     * StringUtils.anyNotEmpty([null, 'world']);    // true
     */
    public static anyNotEmpty(texts?: Array<string | undefined | null>): boolean {
        return !!texts && texts?.length > 0 && texts.some(item => this.isNotEmpty(item));
    }

    /**
     * Returns whether any of the given texts is blank
     *
     * @param texts the texts to check
     *
     * @returns whether any of the given texts is blank
     *
     * @example
     * StringUtils.anyBlank([null, undefined]);    // true
     * StringUtils.anyBlank(['foo', 'bar']);    // false
     */
    public static anyBlank(texts?: Array<string | undefined | null>): boolean {
        return !texts || texts.length === 0 || texts.some(item => this.isBlank(item));
    }

    /**
     * Returns whether any of the given texts is not blank
     *
     * @param texts the texts to check
     *
     * @returns whether any of the given texts is not blank
     *
     * @example
     * StringUtils.anyNotBlank([null, undefined]);    // false
     * StringUtils.anyNotBlank([null, 'world']);    // true
     */
    public static anyNotBlank(texts?: Array<string | undefined | null>): boolean {
        return !!texts && texts.length > 0 && texts.some(item => this.isNotBlank(item));
    }

    /**
     * Returns a string that abbreviates the given text using placeholder
     *
     * @param text the text to inspect
     * @param width the max width of the expected string
     * @param placeholder the placeholder to append
     *
     * @returns a string that abbreviates the given text using placeholder
     *
     * @example
     * StringUtils.abbreviate('foobar', -1);    // 'foobar'
     * StringUtils.abbreviate('foobar', 0);    // ''
     * StringUtils.abbreviate('foobar', 5);    // 'fo...'
     * StringUtils.abbreviate('foobar', 6);    // 'foobar'
     * StringUtils.abbreviate('foobar', 10);    // 'foobar'
     */
    public static abbreviate(text?: string | null, width: number = -1, placeholder: string = '...'): string | undefined | null {
        if (!text || width < 0 || width >= text.length) {
            return text;
        }
        if (width === 0) {
            return '';
        }
        if (width <= placeholder.length) {
            return placeholder.substring(0, width);
        }
        return text.substring(0, width - placeholder.length) + placeholder;
    }

    /**
     * Returns a string that concat the given text and suffix
     *
     * @param text the text to check
     * @param suffix the suffix to append
     *
     * @returns a string that concat the given text and suffix
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
     * @param text the text to check
     * @param suffix the suffix to append
     *
     * @returns a string that concat the given text and suffix, case-insensitive
     *
     * @example
     * StringUtils.appendIfMissingIgnoreCase('foo', 'bar');    // 'foobar'
     * StringUtils.appendIfMissingIgnoreCase('foobar', 'BAR');    // 'foobar'
     */
    public static appendIfMissingIgnoreCase(text?: string | null, suffix?: string | null): string | undefined | null {
        return (!text || this.isEmpty(suffix) || this.endsWithIgnoreCase(text, suffix)) ? text : (text + suffix);
    }

    /**
     * Returns the first letter uppercase representation of the given string
     *
     * @param text the source string to check
     *
     * @returns the first letter uppercase representation of the given string

     @example
     StringUtils.capitalizeFirst('fooBar');    // 'FooBar'
     */
    public static capitalizeFirst(text?: string | null): string | undefined | null {
        return !text ? text : (text.charAt(0).toUpperCase() + text.substring(1));
    }

    /**
     * Returns the first letter uppercase and others lowercase representation of the given string
     *
     * @param text the source string to check
     *
     * @returns the letter uppercase and others lowercase representation of the given string

     @example
     StringUtils.capitalizeFirstLowerTail('fooBar');    // 'Foobar'
     */
    public static capitalizeFirstLowerTail(text?: string | null): string | undefined | null {
        return !text ? text : (text.charAt(0).toUpperCase() + text.substring(1)?.toLowerCase());
    }

    /**
     * Returns a string that centers the given text using placeholder
     *
     * @param text the text to inspect
     * @param width the max width of the expected string
     * @param placeholder the placeholder to pad
     *
     * @returns a string that centers the given text using placeholder
     *
     * @example
     * StringUtils.center('foobar', -1);    // 'foobar'
     * StringUtils.center('foobar', 0);    // ''
     * StringUtils.center('foobar', 3);    // 'foobar'
     * StringUtils.center('foobar', 7);    // 'foobar '
     * StringUtils.center('foobar', 10);    // '  foobar  '
     */
    public static center(text?: string | null, width: number = -1, placeholder: string = ' '): string | undefined | null {
        if (!text || width < 0 || (width > 0 && width <= text.length)) {
            return text;
        }
        if (width === 0) {
            return '';
        }
        const left = Math.floor((width - text.length) / 2);
        return text.padStart(text.length + left, placeholder ?? ' ').padEnd(width, placeholder ?? ' ');
    }

    /**
     * Returns an empty value if the given text is undefined
     *
     * @param text the text to check
     *
     * @returns an empty value if the given text is undefined
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
     * @param text the text to check
     * @param defaultValue the default value placeholder
     *
     * @returns the default value if the given text is empty, or the text self if it is not empty
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
     * @param text the text to check
     * @param defaultValue the default value placeholder
     *
     * @returns the default value if the given text is blank, or the text self if it is not blank
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
     * @param text the source string to check
     * @param suffix the target string to compare
     *
     * @returns whether the given string ends with the suffix
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
     * @param text the source string to check
     * @param suffix the target string to compare
     *
     * @returns whether the given string ends with the suffix, case-insensitive
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
     * @param text the source string to check
     * @param suffixes the target strings to compare
     *
     * @returns whether the given string ends with any of the suffixes
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
     * @param text the source string to check
     * @param suffixes the target strings to compare
     *
     * @returns whether the given string ends with any of the suffixes, case-insensitive
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
     * @param text the source string to check
     * @param comparison the target string to compare
     *
     * @returns whether the given strings are equal
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
     * @param text the source string to check
     * @param comparison the target string to compare
     *
     * @returns whether the given strings are equal, case-insensitive
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
     * @param text the source string to check
     * @param comparisons the target strings to compare
     *
     * @returns whether the given string equals to any of the comparison strings
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
     * @param text the source string to check
     * @param comparisons the target strings to compare
     *
     * @returns whether the given string equals to any of the comparison strings, case-insensitive
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
     * Returns the escaped html string of the given text
     *
     * @param text the source string to inspect
     *
     * @returns the escaped html string of the given text
     *
     * @example
     * StringUtils.escapeHtml('<div>foobar<div>');    // '&lt;div&gt;foobar&lt;div&gt;'
     */
    public static escapeHtml(text?: string | null): string | undefined | null {
        if (!text) {
            return text;
        }
        const map: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        };
        return text.replace( /[&<>"']/g, item => map[item]);
    }

    /**
     * Returns the unescaped html string of the given text
     *
     * @param text the source string to inspect
     *
     * @returns the unescaped html string of the given text
     *
     * @example
     * StringUtils.unescapeHtml('&lt;div&gt;foobar&lt;div&gt;');    // '<div>foobar<div>'
     */
    public static unescapeHtml(text?: string | null): string | undefined | null {
        if (!text) {
            return text;
        }
        const map: Record<string, string> = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#039;': "'",
        };
        return text.replace( /(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&#039;)/g, item => map[item]);
    }

    /**
     * Returns the filtered array of the gaven strings, without empties
     *
     * @param texts the source string to inspect
     *
     * @returns the filtered array of the gaven strings, without empties
     *
     * @example
     * StringUtils.filterIgnoreEmpty([null, undefined, '', 'foobar']);    //  ['foobar']
     */
    public static filterIgnoreEmpty(texts?: Array<string | undefined | null>): string[] | undefined {
        if (!texts || texts.length === 0) {
            return undefined;
        }
        const result = texts.filter(item => this.isNotEmpty(item));
        // @ts-ignore
        return (!result || result.length === 0) ? undefined : result;
    }

    /**
     * Returns the filtered array of the gaven strings, without blanks
     *
     * @param texts the source string to inspect
     *
     * @returns the filtered array of the gaven strings, without blanks
     *
     * @example
     * StringUtils.filterIgnoreEmpty([null, undefined, ' ', 'foobar']);    //  ['foobar']
     */
    public static filterIgnoreBlank(texts?: Array<string | undefined | null>): string[] | undefined {
        if (!texts || texts.length === 0) {
            return undefined;
        }
        const result = texts.filter(item => this.isNotBlank(item));
        // @ts-ignore
        return (!result || result.length === 0) ? undefined : result;
    }

    /**
     * Returns the replaced string of the source string ("{}" placeholder) with the given parameters
     *
     * @param text the source string to inspect
     * @param params the parameters to replaced with
     *
     * @returns the replaced string of the source string
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
     * @param text the source string to inspect
     * @param params the parameters to replaced with
     *
     * @returns the replaced string of the source string
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
                    } else if (ObjectUtils.isPlain(param)) {
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
     * @param text the source string to inspect
     * @param params the parameters to replaced with, in the form of key values
     *
     * @returns the replaced string of the source string
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
     * Returns a string that represents the given string array
     *
     * @param texts the source strings to inspect
     *
     * @returns a string that represents the given string array
     *
     * @example
     * StringUtils.fromChars(undefined);    // undefined
     * StringUtils.fromChars(['f', 'o', 'o', 'b', 'a', 'r']);    // 'foobar'
     */
    public static fromChars(texts?: Array<string | undefined | null>): string | undefined {
        return !texts ? undefined : texts.join('');
    }

    /**
     * Returns the length of the given string
     *
     * @param text the source string to check
     *
     * @returns the length of the given string
     */
    public static getLength(text?: string | null): number {
        return text ? text.length : 0;
    }

    /**
     * Returns whether the given string is empty
     *
     * @param text the string to check
     *
     * @returns whether the given string is empty
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
     * @param text the string to check
     *
     * @returns whether the given string is not empty
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
     * @param text the string to check
     *
     * @returns whether the given string is blank
     *
     * @remarks
     * check if all the characters in the given string are whitespace or line separators
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
     * @param text the string to check
     *
     * @returns whether the given string is not blank
     *
     * @example
     * StringUtils.isNotBlank('foobar');    // true
     */
    public static isNotBlank(text?: string | null): boolean {
        return !this.isBlank(text);
    }

    /**
     * Returns whether the given text includes the comparison string
     *
     * @param text the source string to check
     * @param comparison the target string to compare
     *
     * @returns whether the given text includes the comparison string
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
     * @param text the source string to check
     * @param comparison the target string to compare
     *
     * @returns whether the given text includes the comparison string, case-insensitive
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
     * @param text the source string to check
     * @param comparisons the target strings to compare
     *
     * @returns whether the given text includes the comparison string
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
     * @param text the source string to check
     * @param comparisons the target strings to compare
     *
     * @returns whether the text includes the comparison string, case-insensitive
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
     * @param texts the source string or strings to inspect
     * @param separator the delimiter string to append between each of the given texts
     * @param filter the filter to check each of the given texts should be included
     *
     * @returns the joined string with the given texts and delimiter
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
     * Returns the leftmost length characters of the given string
     *
     * @param text the text to inspect
     * @param length the expected length
     *
     * @returns the leftmost length characters of the given string
     *
     * @example
     * StringUtils.left('foobar', 3);    // 'foo'
     * StringUtils.left('foobar', 10);    // 'foobar'
     */
    public static left(text?: string | null, length?: number): string | undefined | null {
        if (!text || length === undefined || length < 0) {
            return text;
        }
        if (length === 0) {
            return '';
        }
        return text.substring(0, length);
    }

    /**
     * Returns the rightmost length characters of the given string
     *
     * @param text the text to inspect
     * @param length the expected length
     *
     * @returns the rightmost length characters of the given string
     *
     * @example
     * StringUtils.right('foobar', 3);    // 'bar'
     * StringUtils.right('foobar', 10);    // 'foobar'
     */
    public static right(text?: string | null, length?: number): string | undefined | null {
        if (!text || length === undefined || length < 0) {
            return text;
        }
        if (length === 0) {
            return '';
        }
        return (text.length <= length) ? text : text.substring(text.length - length);
    }

    /**
     * Returns a string that concat the given prefix and text
     *
     * @param text the text to check
     * @param prefix the prefix to prepend
     *
     * @returns a string that concat the given prefix and text
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
     * @param text the text to check
     * @param prefix the prefix to prepend
     *
     * @returns a string that concat the given prefix and text, case-insensitive
     *
     * @example
     * StringUtils.prependIfMissingIgnoreCase('bar', 'foo');    // 'foobar'
     * StringUtils.prependIfMissingIgnoreCase('foobar', 'FOO');    // 'foobar'
     */
    public static prependIfMissingIgnoreCase(text?: string | null, prefix?: string): string | undefined | null {
        return (!text || this.isEmpty(prefix) || this.startsWithIgnoreCase(text, prefix)) ? text : (prefix + text);
    }

    /**
     * Returns a string that single quotes the given text
     *
     * @param text the text to inspect
     *
     * @returns a string that single quotes the given text
     *
     * @example
     * StringUtils.quoteSingle(undefined);    // undefined
     * StringUtils.quoteSingle('foobar');    // '\'foobar\''
     */
    public static quoteSingle(text?: string | null): string | undefined | null {
        return !text ? text : `'${text}'`;
    }

    /**
     * Returns a string that double quotes the given text
     *
     * @param text the text to inspect
     *
     * @returns a string that double quotes the given text
     *
     * @example
     * StringUtils.quoteSingle(undefined);    // undefined
     * StringUtils.quoteSingle('foobar');    // '"foobar"'
     */
    public static quoteDouble(text?: string | null): string | undefined | null {
        return !text ? text : `"${text}"`;
    }

    /**
     * Returns a string that unquotes the given text
     *
     * @param text the text to inspect
     *
     * @returns a string that unquotes the given text
     *
     * @example
     * StringUtils.unquote(undefined);    // undefined
     * StringUtils.unquote('\'foobar\'');    // 'foobar'
     * StringUtils.unquote('"foobar"');    // 'foobar'
     */
    public static unquote(text?: string | null): string | undefined | null {
        return !text ? text : text.replace(/^['"`]|['"`]$/g, '');
    }

    /**
     * Returns the string that removed all occurrences in the given text
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     *
     * @returns the string that removed all occurrences in the given text
     *
     * @example
     * StringUtils.removeAll(undefined, undefined);    // undefined
     * StringUtils.removeAll('foobar-foobar', undefined);    // 'foobar-foobar'
     * StringUtils.removeAll('foobar-foobar', 'bar');    // 'foo-foo'
     */
    public static removeAll(text?: string | null, search?: string | RegExp | null): string | undefined | null {
        return this.replaceAll(text, search, '');
    }

    /**
     * Returns the string that removed all occurrences in the given text, case-insensitive
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     *
     * @returns the string that removed all occurrences in the given text, case-insensitive
     *
     * @example
     * StringUtils.removeAllIgnoreCase(undefined, undefined);    // undefined
     * StringUtils.removeAllIgnoreCase('foobar-foobar', undefined);    // 'foobar-foobar'
     * StringUtils.removeAllIgnoreCase('foobar-foobar', 'BAR');    // 'foo-foo'
     */
    public static removeAllIgnoreCase(text?: string | null, search?: string | RegExp | null): string | undefined | null {
        return this.replaceAllIgnoreCase(text, search, '');
    }

    /**
     * Returns the string that removed the first occurrence in the given text
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     *
     * @returns the string that removed the first occurrence in the given text
     *
     * @example
     * StringUtils.removeFirst(undefined, undefined);    // undefined
     * StringUtils.removeFirst('foobar-foobar', undefined);    // 'foobar-foobar'
     * StringUtils.removeFirst('foobar-foobar', 'bar');    // 'foo-foobar'
     */
    public static removeFirst(text?: string | null, search?: string | RegExp | null): string | undefined | null {
        return this.replaceFirst(text, search, '');
    }

    /**
     * Returns the string that removed the first occurrence in the given text, case-insensitive
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     *
     * @returns the string that removed the first occurrence in the given text, case-insensitive
     *
     * @example
     * StringUtils.removeFirstIgnoreCase(undefined, undefined);    // undefined
     * StringUtils.removeFirstIgnoreCase('foobar-foobar', undefined);    // 'foobar-foobar'
     * StringUtils.removeFirstIgnoreCase('foobar-foobar', 'BAR');    // 'foo-foobar'
     */
    public static removeFirstIgnoreCase(text?: string | null, search?: string | RegExp | null): string | undefined | null {
        return this.replaceFirstIgnoreCase(text, search, '');
    }

    /**
     * Returns the array that excludes the elements which equals to any of the given exclusions
     *
     * @param texts the arrays to inspect
     * @param excludes the elements array to exclude
     *
     * @returns the array that excludes the elements which equals to any of the given exclusions
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
     * @param texts the arrays to inspect
     * @param excludes the elements array to exclude
     *
     * @returns the array that excludes the elements which equals to any of the given exclusions, case-insensitive
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
     * @param texts the arrays to inspect
     * @param excludes the elements array to exclude
     *
     * @returns the array that excludes the elements which includes any of the given exclusions
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
     * @param texts the arrays to inspect
     * @param excludes the elements array to exclude
     *
     * @returns the array that excludes the elements which includes any of the given exclusions, case-insensitive
     *
     * @example
     * StringUtils.removeIncludesIgnoreCase(['foo', 'bar'], ['AR']);    // ['foo']
     */
    public static removeIncludesIgnoreCase(texts?: string[] | null, excludes?: string[] | null): string[] | undefined | null {
        return (!texts || texts.length === 0 || !excludes || excludes.length === 0) ? texts : texts.filter(text => !excludes.some(exclude => this.includesIgnoreCase(text, exclude)));
    }

    /**
     * Returns the string that removed the leftmost given string
     *
     * @param text the text to inspect
     * @param remove the string to remove
     *
     * @returns the string that removed the leftmost given string
     *
     * @example
     * StringUtils.removeStart('foobar', 'hello');    // 'foobar'
     * StringUtils.removeStart('foobar', 'foo');    // 'bar'
     */
    public static removeStart(text?: string | null, remove?: string | null): string | undefined | null {
        return (!text || !remove || !this.startsWith(text, remove)) ? text : text.substring(remove.length);
    }

    /**
     * Returns the string that removed the leftmost given string, case-insensitive
     *
     * @param text the text to inspect
     * @param remove the string to remove, case-insensitive
     *
     * @returns the string that removed the leftmost given string, case-insensitive
     *
     * @example
     * StringUtils.removeStartIgnoreCase('foobar', 'Hello');    // 'foobar'
     * StringUtils.removeStartIgnoreCase('foobar', 'Foo');    // 'bar'
     */
    public static removeStartIgnoreCase(text?: string | null, remove?: string | null): string | undefined | null {
        return (!text || !remove || !this.startsWithIgnoreCase(text, remove)) ? text : text.substring(remove.length);
    }

    /**
     * Returns the string that removed the leftmost given string
     *
     * @param text the text to inspect
     * @param remove the string to remove
     *
     * @returns the string that removed the leftmost given string
     *
     * @example
     * StringUtils.removeEnd('foobar', 'hello');    // 'foobar'
     * StringUtils.removeEnd('foobar', 'bar');    // 'foo'
     */
    public static removeEnd(text?: string | null, remove?: string | null): string | undefined | null {
        return (!text || !remove || !this.endsWith(text, remove)) ? text : text.substring(0, text.length - remove.length);
    }

    /**
     * Returns the string that removed the rightmost given string, case-insensitive
     *
     * @param text the text to inspect
     * @param remove the string to remove, case-insensitive
     *
     * @returns the string that removed the rightmost given string, case-insensitive
     *
     * @example
     * StringUtils.removeEndIgnoreCase('foobar', 'Hello');    // 'foobar'
     * StringUtils.removeEndIgnoreCase('foobar', 'Bar');    // 'foo'
     */
    public static removeEndIgnoreCase(text?: string | null, remove?: string | null): string | undefined | null {
        return (!text || !remove || !this.endsWithIgnoreCase(text, remove)) ? text : text.substring(0, text.length - remove.length);
    }

    /**
     * Returns the string that replaced all occurrences in the given text
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     * @param replace the expected replacement string
     *
     * @returns the string that replaced all occurrences in the given text
     *
     * @example
     * StringUtils.replaceAll(undefined, undefined, undefined);    // undefined
     * StringUtils.replaceAll('foobar-foobar', undefined, 'hello');    // 'foobar-foobar'
     * StringUtils.replaceAll('foobar-foobar', 'foobar', 'hello');    // 'hello-hello'
     */
    public static replaceAll(text?: string | null, search?: string | RegExp | null, replace?: string | null): string | undefined | null {
        return (this.isEmpty(text) || !search) ? text : text?.replace(new RegExp(search, 'g'), (replace ?? ''));
    }

    /**
     * Returns the string that replaced all occurrences in the given text, case-insensitive
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     * @param replace the expected replacement string
     *
     * @returns the string that replaced all occurrences in the given text, case-insensitive
     *
     * @example
     * StringUtils.replaceAllIgnoreCase(undefined, undefined, undefined);    // undefined
     * StringUtils.replaceAllIgnoreCase('foobar-foobar', undefined, 'hello');    // 'foobar-foobar'
     * StringUtils.replaceAllIgnoreCase('foobar-foobar', 'FOOBAR', 'hello');    // 'hello-hello'
     */
    public static replaceAllIgnoreCase(text?: string | null, search?: string | RegExp | null, replace?: string | null): string | undefined | null {
        return (this.isEmpty(text) || !search) ? text : text?.replace(new RegExp(search, 'gi'), (replace ?? ''));
    }

    /**
     * Returns the string that replaced the first occurrence in the given text
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     * @param replace the expected replacement string
     *
     * @returns the string that replaced the first occurrence in the given text
     *
     * @example
     * StringUtils.replaceFirst(undefined, undefined, undefined);    // undefined
     * StringUtils.replaceFirst('foobar-foobar', 'foobar', undefined);    // 'foobar-foobar'
     * StringUtils.replaceFirst('foobar-foobar', 'foobar', 'hello');    // 'hello-foobar'
     */
    public static replaceFirst(text?: string | null, search?: string | RegExp | null, replace?: string | null): string | undefined | null {
        return (this.isEmpty(text) || !search) ? text : text?.replace(search, (replace ?? ''));
    }

    /**
     * Returns the string that replaced the first occurrence in the given text, case-insensitive
     *
     * @param text the text to inspect
     * @param search the string or regex to match
     * @param replace the expected replacement string
     *
     * @returns the string that replaced the first occurrence in the given text, case-insensitive
     *
     * @example
     * StringUtils.replaceFirstIgnoreCase(undefined, undefined, undefined);    // undefined
     * StringUtils.replaceFirstIgnoreCase('foobar-foobar', 'foobar', undefined);    // 'foobar-foobar'
     * StringUtils.replaceFirstIgnoreCase('foobar-foobar', 'FOOBAR', 'hello');    // 'hello-foobar'
     */
    public static replaceFirstIgnoreCase(text?: string | null, search?: string | RegExp | null, replace?: string | null): string | undefined | null {
        return (this.isEmpty(text) || !search) ? text : text?.replace(new RegExp(search, 'i'), (replace ?? ''));
    }

    /**
     * Returns the reversed representation of the given string
     *
     * @param text the source string to inspect
     * @param startInclusive the starting index, inclusive
     * @param endExclusive the ending index, exclusive
     *
     * @returns the reversed representation of the given string
     *
     * @example
     * StringUtils.reverse('foobar');    // 'raboof'
     * StringUtils.reverse('foobar', 1, 5);    // 'aboo'
     */
    public static reverse(text?: string | null, startInclusive?: number, endExclusive?: number): string | undefined | null {
        if (!text) {
            return text;
        }
        const substring = text.substring(startInclusive ?? 0, endExclusive);
        return (this.toChars(substring) as string[]).reverse().join('');
    }

    /**
     * Returns the split array of the given string by the given delimiter
     *
     * @param text the source string to inspect
     * @param delimiter the delimiter to split strings, defaults to comma
     * @param max the max elements expected, negative means unlimited, defaults to -1
     * @param trim whether trim each element before returning, defaults to true
     *
     * @returns the split array of the given string by the given delimiter
     *
     * @example
     * StringUtils.split('foo,bar');    // ['foo', 'bar']
     * StringUtils.split('hello | world | wonderful', '|', 2);    // ['hello', 'world']
     */
    public static split(text?: string | null, delimiter: string = ',', max: number = -1, trim: boolean = true): string[] | undefined {
        if (!text) {
            return undefined;
        }
        const result = text.split(delimiter, max);
        if (!result || result.length === 0) {
            return undefined;
        }
        return !trim ? result : result.map(item => !item ? item : item.trim());
    }

    /**
     * Returns whether the given string starts with the prefix
     *
     * @param text the source string to check
     * @param prefix the target string to compare
     *
     * @returns whether the given string starts with the prefix
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
     * @param text the source string to check
     * @param prefix the target string to compare
     *
     * @returns whether the given string starts with the prefix, case-insensitive
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
     * @param text the source string to check
     * @param prefixes the target strings to compare
     *
     * @returns whether the given string starts with any of the prefixes
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
     * @param text the source string to check
     * @param prefixes the target strings to compare
     *
     * @returns whether the given string starts with any of the prefixes, case-insensitive
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
     * @param text the string to get a substring from
     * @param separator the String to search for
     *
     * @returns the substring after the first occurrence of the given separator
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
     * @param text the string to get a substring from
     * @param separator the String to search for
     *
     * @returns the substring after the last occurrence of the given separator
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
     * @param text the string to get a substring from
     * @param separator the String to search for
     * @returns the substring before the first occurrence of the given separator
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
     * @param text the string to get a substring from
     * @param separator the String to search for
     *
     * @returns the substring before the last occurrence of the given separator
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
     * Returns a string array that represents the given string
     *
     * @param text the source string to inspect
     *
     * @returns a string array that represents the given string
     *
     * @example
     * StringUtils.toChars(undefined);    // undefined
     * StringUtils.toChars('foobar');    // ['f', 'o', 'o', 'b', 'a', 'r']
     */
    public static toChars(text?: string | null): string[] | undefined {
        return !text ? undefined : text.split('');
    }

    /**
     * Returns the camel case representation of the given string
     *
     * @param text the source string to inspect
     * @param pattern the regex to match
     *
     * @returns the camel case representation of the given string
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
     * @param text the source string to inspect
     * @param pattern the regex to match
     *
     * @returns the kebab case representation of the given string
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
     * @param text the string to trim
     * @param emptyAsNull whether to return null if the trimmed result is empty
     *
     * @returns the trimmed string value from the given string
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
