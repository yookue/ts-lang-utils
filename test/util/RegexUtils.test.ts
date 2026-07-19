/*
 * Copyright (c) 2023 Unikue Ltd. All rights reserved.
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


import { RegexUtils } from '@unikue/ts-lang-utils';


describe('RegexUtils.test', () => {
    test('Testing compilePattern', () => {
        expect(RegexUtils.compilePattern('[a-zA-Z0-9]+', 'g')).toBeDefined();
    });

    test('Testing escapePattern', () => {
        expect(RegexUtils.escapePattern('\\')).toBe('\\\\');
        expect(RegexUtils.escapePattern('+-=')).toBe('\\+\\-=');
    });

    test('Testing extractWords', () => {
        expect(RegexUtils.extractWords('foo, & bar')).toStrictEqual(['foo', 'bar']);
    });

    test('Testing isAlphabetic', () => {
        expect(RegexUtils.isAlphabetic('abc')).toBeTruthy();
        expect(RegexUtils.isAlphabetic('abc123')).toBeFalsy();
        expect(RegexUtils.isAlphabetic('123456')).toBeFalsy();
    });

    test('Testing isAlphabeticLower', () => {
        expect(RegexUtils.isAlphabeticLower('abc')).toBeTruthy();
        expect(RegexUtils.isAlphabeticLower('abcDEF')).toBeFalsy();
        expect(RegexUtils.isAlphabeticLower('abc123')).toBeFalsy();
        expect(RegexUtils.isAlphabeticLower('123456')).toBeFalsy();
    });

    test('Testing isAlphabeticUpper', () => {
        expect(RegexUtils.isAlphabeticUpper('ABC')).toBeTruthy();
        expect(RegexUtils.isAlphabeticUpper('abc')).toBeFalsy();
        expect(RegexUtils.isAlphabeticUpper('abc123')).toBeFalsy();
        expect(RegexUtils.isAlphabeticUpper('123456')).toBeFalsy();
    });

    test('Testing isAlphanumeric', () => {
        expect(RegexUtils.isAlphanumeric(undefined)).toBeFalsy();
        expect(RegexUtils.isAlphanumeric('abc123')).toBeTruthy();
        expect(RegexUtils.isAlphanumeric('--$$##')).toBeFalsy();
    });

    test('Testing isAlphanumericLower', () => {
        expect(RegexUtils.isAlphanumericLower(undefined)).toBeFalsy();
        expect(RegexUtils.isAlphanumericLower('ABC123')).toBeFalsy();
        expect(RegexUtils.isAlphanumericLower('abc123')).toBeTruthy();
        expect(RegexUtils.isAlphanumericLower('--$$##')).toBeFalsy();
    });

    test('Testing isAlphanumericUpper', () => {
        expect(RegexUtils.isAlphanumericUpper(undefined)).toBeFalsy();
        expect(RegexUtils.isAlphanumericUpper('ABC123')).toBeTruthy();
        expect(RegexUtils.isAlphanumericUpper('abc123')).toBeFalsy();
        expect(RegexUtils.isAlphanumericUpper('--$$##')).toBeFalsy();
    });

    test('Testing isCompilable', () => {
        expect(RegexUtils.isCompilable(undefined)).toBeFalsy();
        expect(RegexUtils.isCompilable('foobar')).toBeTruthy();
        expect(RegexUtils.isCompilable('[a-zA-Z0-9]+', 'g')).toBeTruthy();
    });

    test('Testing isEmail', () => {
        expect(RegexUtils.isEmail(undefined)).toBeFalsy();
        expect(RegexUtils.isEmail('user@example.com')).toBeTruthy();
        expect(RegexUtils.isEmail('abc-def@example.com')).toBeTruthy();
        expect(RegexUtils.isEmail('user@sub-domain.example.com')).toBeTruthy();
        expect(RegexUtils.isEmail('invalid-email')).toBeFalsy();
        expect(RegexUtils.isEmail('@example.com')).toBeFalsy();
        expect(RegexUtils.isEmail('user@.com')).toBeFalsy();
    });

    test('Testing isNumeric', () => {
        expect(RegexUtils.isNumeric(undefined)).toBeFalsy();
        expect(RegexUtils.isNumeric('abc123')).toBeFalsy();
        expect(RegexUtils.isNumeric('123456')).toBeTruthy();
    });

    test('Testing normalizePattern', () => {
        expect(RegexUtils.normalizePattern(undefined)).toBeUndefined();
        expect(RegexUtils.normalizePattern('\\\\d')).toBe('\\d');
    });

    test('Testing testResetting', () => {
        const pattern = /^[a-zA-Z0-9]+$/g;
        expect(RegexUtils.testResetting(pattern, '##')).toBeFalsy();
        expect(RegexUtils.testResetting(pattern, '11')).toBeTruthy();
        expect(RegexUtils.testResetting(pattern, '1122')).toBeTruthy();
        expect(RegexUtils.testResetting(pattern, '112233')).toBeTruthy();
    });

    test('Testing unescapePattern', () => {
        expect(RegexUtils.unescapePattern(undefined)).toBeUndefined();
        expect(RegexUtils.unescapePattern('\\\\')).toBe('\\');
        expect(RegexUtils.unescapePattern('\\+\\-=')).toBe('+-=');
    });
});
