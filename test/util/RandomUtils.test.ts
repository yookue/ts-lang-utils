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
    test('Testing randomElement', () => {
        expect(RandomUtils.randomElement([undefined])).toBe(undefined);
        expect(RandomUtils.randomElement(['1'])).toBe('1');
    });

    test('Testing randomInteger', () => {
        const result = RandomUtils.randomInteger(1, 100);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThan(100);
    });

    test('Testing randomNumber', () => {
        for (let i = 0; i < 2; i++) {
            const result = RandomUtils.randomNumber(5, 8);
            expect(result).toBeGreaterThanOrEqual(5);
            expect(result).toBeLessThan(8);
        }
        for (let i = 0; i < 2; i++) {
            const result = RandomUtils.randomNumber(1.1, 1.2);
            expect(result).toBeGreaterThanOrEqual(1.1);
            expect(result).toBeLessThan(1.2);
        }
        for (let i = 0; i < 2; i++) {
            const result = RandomUtils.randomNumber(-3.6, 2.8);
            expect(result).toBeGreaterThanOrEqual(-3.6);
            expect(result).toBeLessThan(2.8);
        }
    });
});