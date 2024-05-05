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


import {RegexUtils} from '@yookue/ts-lang-utils';


describe('RegexUtils', () => {
    test('Testing compilePattern', () => {
        expect(RegexUtils.compilePattern('[a-zA-Z0-9]+', 'g')).toBeDefined();
    });

    test('Testing extractWords', () => {
        expect(RegexUtils.extractWords('foo, & bar')).toStrictEqual(['foo', 'bar']);
    });

    test('Testing isAlphabetic', () => {
        expect(RegexUtils.isAlphabetic('abc')).toBeTruthy();
        expect(RegexUtils.isAlphabetic('abc123')).toBeFalsy();
        expect(RegexUtils.isAlphabetic('123456')).toBeFalsy();
    });

    test('Testing isAlphanumeric', () => {
        expect(RegexUtils.isAlphanumeric(undefined)).toBeFalsy();
        expect(RegexUtils.isAlphanumeric('abc123')).toBeTruthy();
        expect(RegexUtils.isAlphanumeric('--$$##')).toBeFalsy();
    });

    test('Testing isNumeric', () => {
        expect(RegexUtils.isNumeric(undefined)).toBeFalsy();
        expect(RegexUtils.isNumeric('abc123')).toBeFalsy();
        expect(RegexUtils.isNumeric('123456')).toBeTruthy();
    });

    test('Testing isCompilable', () => {
        expect(RegexUtils.isCompilable(undefined)).toBeFalsy();
        expect(RegexUtils.isCompilable('foobar')).toBeTruthy();
        expect(RegexUtils.isCompilable('[a-zA-Z0-9]+', 'g')).toBeTruthy();
    });

    test('Testing testResetting', () => {
        const pattern = /^[a-zA-Z0-9]+$/g;
        expect(RegexUtils.testResetting(pattern, '##')).toBeFalsy();
        expect(RegexUtils.testResetting(pattern, '11')).toBeTruthy();
        expect(RegexUtils.testResetting(pattern, '1122')).toBeTruthy();
        expect(RegexUtils.testResetting(pattern, '112233')).toBeTruthy();
    });
});
