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


import {RandomUtils} from '@yookue/ts-lang-utils';


describe('RandomUtils', () => {
    test('Testing randomBoolean', () => {
        expect(RandomUtils.randomBoolean()).toBeDefined();
    });

    test('Testing randomElement', () => {
        expect(RandomUtils.randomElement([undefined])).toBeUndefined();
        expect(RandomUtils.randomElement(['1'])).toBe('1');
    });

    test('Testing randomElements', () => {
        expect(RandomUtils.randomElements([undefined], 3)).toHaveLength(1);
        expect(RandomUtils.randomElements([1, 2, 3], 2)).toHaveLength(2);
    });

    test('Testing randomInteger', () => {
        const result = RandomUtils.randomInteger(1, 100);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(100);
    });

    test('Testing randomIntegers', () => {
        expect(RandomUtils.randomIntegers(3,1, 100)).toHaveLength(3);
    });

    test('Testing randomNumber', () => {
        const result1 = RandomUtils.randomNumber(1.1, 1.2);
        expect(result1).toBeGreaterThanOrEqual(1.1);
        expect(result1).toBeLessThanOrEqual(1.2);
        const result2 = RandomUtils.randomNumber(-3.6, 2.8);
        expect(result2).toBeGreaterThanOrEqual(-3.6);
        expect(result2).toBeLessThanOrEqual(2.8);
        const result3 = RandomUtils.randomNumber(-3.6, -2.8);
        expect(result3).toBeGreaterThanOrEqual(-3.6);
        expect(result3).toBeLessThanOrEqual(-2.8);
    });

    test('Testing randomNumbers', () => {
        expect(RandomUtils.randomNumbers(3,1.1, 1.8)).toHaveLength(3);
    });

    test('Testing randomString', () => {
        expect((RandomUtils.randomString(8) as string).length).toBe(8);
    });

    test('Testing randomStrings', () => {
        expect(RandomUtils.randomStrings(3,6, 10)).toHaveLength(3);
    });
});
