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


import {NumberUtils} from '@yookue/ts-lang-utils';


describe('NumberUtils', () => {
    test('Testing isInteger', () => {
        expect(NumberUtils.isInteger(undefined)).toBeFalsy();
        expect(NumberUtils.isInteger(1)).toBeTruthy();
    });

    test('Testing isPositive', () => {
        expect(NumberUtils.isPositive(1)).toBeTruthy();
        expect(NumberUtils.isPositive(0)).toBeFalsy();
        expect(NumberUtils.isPositive(-1)).toBeFalsy();
    });

    test('Testing isNotPositive', () => {
        expect(NumberUtils.isNotPositive(1)).toBeFalsy();
        expect(NumberUtils.isNotPositive(0)).toBeTruthy();
        expect(NumberUtils.isNotPositive(-1)).toBeTruthy();
    });

    test('Testing isNegative', () => {
        expect(NumberUtils.isNegative(1)).toBeFalsy();
        expect(NumberUtils.isNegative(0)).toBeFalsy();
        expect(NumberUtils.isNegative(-1)).toBeTruthy();
    });

    test('Testing isNotNegative', () => {
        expect(NumberUtils.isNotNegative(1)).toBeTruthy();
        expect(NumberUtils.isNotNegative(0)).toBeTruthy();
        expect(NumberUtils.isNotNegative(-1)).toBeFalsy();
    });

    test('Testing toInteger', () => {
        expect(NumberUtils.toInteger(undefined)).toBeUndefined();
        expect(NumberUtils.toInteger('foobar')).toBeUndefined();
        expect(NumberUtils.toInteger('1')).toBe(1);
    });

    test('Testing toFloat', () => {
        expect(NumberUtils.toFloat(undefined)).toBeUndefined();
        expect(NumberUtils.toFloat('foobar')).toBeUndefined();
        expect(NumberUtils.toFloat('1.0')).toBe(1.0);
    });

    test('Testing max', () => {
        expect(NumberUtils.max([1, 2, 3])).toBe(3);
    });

    test('Testing min', () => {
        expect(NumberUtils.min([1, 2, 3])).toBe(1);
    });

    test('Testing sum', () => {
        expect(NumberUtils.sum([1, 2, 3])).toBe(6);
    });

    test('Testing average', () => {
        expect(NumberUtils.average([1, 2, 3])).toBe(2);
    });
});
