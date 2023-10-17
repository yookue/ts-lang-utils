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


import {ArrayUtils} from '@yookue/ts-lang-utils';


describe('ArrayUtils', () => {
    test('Testing getLength', () => {
        expect(ArrayUtils.getLength([])).toBe(0);
    });

    test('Testing getTypeof', () => {
        expect(ArrayUtils.getTypeof(['foo', 'bar'])).toStrictEqual(['string', 'string']);
    });

    test('Testing isEmpty', () => {
        expect(ArrayUtils.isEmpty([])).toBeTruthy();
    });

    test('Testing isNotEmpty', () => {
        expect(ArrayUtils.isNotEmpty([undefined, null])).toBeTruthy();
        expect(ArrayUtils.isNotEmpty(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing isTypeof', () => {
        expect(ArrayUtils.isTypeof([undefined, null], 'object')).toBeFalsy();
        expect(ArrayUtils.isTypeof(['foo', 'bar'], 'string')).toBeTruthy();
        expect(ArrayUtils.isTypeof(['foo', 'bar', null], 'string', true)).toBeTruthy();
        expect(ArrayUtils.isTypeof([1, 2, 3], 'number')).toBeTruthy();
    });

    test('Testing includes', () => {
        expect(ArrayUtils.includes(['foo', 'bar'], 'foo')).toBeTruthy();
        expect(ArrayUtils.includes(['foo', 'bar'], 'foobar')).toBeFalsy();
    });
});
