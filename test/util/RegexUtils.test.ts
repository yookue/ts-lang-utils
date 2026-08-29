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

    test('Testing isChineseIdCard', () => {
        expect(RegexUtils.isChineseIdCard(undefined)).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('11010519491231002X')).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('11010519491231002x')).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('110101199003070011')).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('440524188001010014')).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('310101198511170038')).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('440304199601010023')).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('110105194912310021')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('110101199003078888')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('01010519491231002X')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('11010519491331002X')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('110105194912321234')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('11010519491231002')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('1101051949123100222')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('110101199002301234')).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('110101199002301234', false)).toBeFalsy();
        expect(RegexUtils.isChineseIdCard('110105194912310021', false)).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('110101199003078888', false)).toBeTruthy();
        expect(RegexUtils.isChineseIdCard('11010519491231002X', false)).toBeTruthy();
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
        expect(RegexUtils.isEmail('user.name+tag@sub.example.co.uk')).toBeTruthy();
        expect(RegexUtils.isEmail('张三@example.com')).toBeTruthy();
        expect(RegexUtils.isEmail('user@example.中国')).toBeTruthy();
        expect(RegexUtils.isEmail('invalid-email')).toBeFalsy();
        expect(RegexUtils.isEmail('@example.com')).toBeFalsy();
        expect(RegexUtils.isEmail('user@.com')).toBeFalsy();
        expect(RegexUtils.isEmail('user@example.c')).toBeFalsy();
        expect(RegexUtils.isEmail('user@example.com.')).toBeFalsy();
        expect(RegexUtils.isEmail('user@example..com')).toBeFalsy();
        expect(RegexUtils.isEmail('user@exa!mple.com')).toBeFalsy();
        expect(RegexUtils.isEmail('user name@example.com')).toBeFalsy();
    });

    test('Testing isMobile', () => {
        expect(RegexUtils.isMobile(undefined)).toBeFalsy();
        expect(RegexUtils.isMobile('13812345678')).toBeTruthy();
        expect(RegexUtils.isMobile('15912345678')).toBeTruthy();
        expect(RegexUtils.isMobile('19912345678')).toBeTruthy();
        expect(RegexUtils.isMobile('+8613812345678')).toBeTruthy();
        expect(RegexUtils.isMobile('+86-13812345678')).toBeTruthy();
        expect(RegexUtils.isMobile('8613812345678')).toBeTruthy();
        expect(RegexUtils.isMobile('86-13812345678')).toBeTruthy();
        expect(RegexUtils.isMobile('12345678901')).toBeFalsy();
        expect(RegexUtils.isMobile('12812345678')).toBeFalsy();
        expect(RegexUtils.isMobile('1381234567')).toBeFalsy();
        expect(RegexUtils.isMobile('138123456789')).toBeFalsy();
        expect(RegexUtils.isMobile('0086-13812345678')).toBeFalsy();
        expect(RegexUtils.isMobile('+86 13812345678')).toBeFalsy();
        expect(RegexUtils.isMobile('+86--13812345678')).toBeFalsy();
        expect(RegexUtils.isMobile('2125551234', '^[2-9]\\d{2}[2-9]\\d{6}$')).toBeTruthy();
        expect(RegexUtils.isMobile('1125551234', '^[2-9]\\d{2}[2-9]\\d{6}$')).toBeFalsy();
        expect(RegexUtils.isMobile('2125551234', /^[2-9]\d{2}[2-9]\d{6}$/)).toBeTruthy();
        expect(RegexUtils.isMobile('1125551234', /^[2-9]\d{2}[2-9]\d{6}$/)).toBeFalsy();
        expect(RegexUtils.isMobile('13812345678', '[invalid')).toBeFalsy();
        expect(RegexUtils.isMobile('13812345678', /^1[3-9]\d{9}$/)).toBeTruthy();
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
