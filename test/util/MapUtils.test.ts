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


import {MapUtils} from '@yookue/ts-lang-utils';


describe('MapUtils', () => {
    test('Testing forEach', () => {
        const map = new Map<number, string>([
            [1, 'red'],
            [2, 'yellow'],
            [3, 'blue'],
        ]);
        const result = [];
        MapUtils.forEach(map, (value) => result.push(value));
        expect(result.length).toBe(3);
    });

    test('Testing forEachBreakable', () => {
        const map = new Map<number, string>([
            [1, 'red'],
            [2, 'yellow'],
            [3, 'blue'],
        ]);
        const result = [];
        MapUtils.forEachBreakable(map, (value) => {
            result.push(value);
            return value === 'red';
        });
        expect(result.length).toBe(2);
    });

    test('Testing forEachIndexing', () => {
        const map = new Map<number, string>([
            [1, 'red'],
            [2, 'yellow'],
            [3, 'blue'],
        ]);
        const result = [];
        MapUtils.forEachIndexing(map, (value) => result.push(value));
        expect(result.length).toBe(3);
    });

    test('Testing forEachIndexingBreakable', () => {
        const map = new Map<number, string>([
            [1, 'red'],
            [2, 'yellow'],
            [3, 'blue'],
        ]);
        const result = [];
        MapUtils.forEachIndexingBreakable(map, (value) => {
            result.push(value);
            return value === 'red';
        });
        expect(result.length).toBe(2);
    });

    test('Testing forEachIndexingTailing', () => {
        const map = new Map<number, string>([
            [1, 'red'],
            [2, 'yellow'],
            [3, 'blue'],
        ]);
        const result = [];
        MapUtils.forEachIndexingTailing(map, (value) => result.push(value));
        expect(result.length).toBe(2);
    });

    test('Testing forEachTailing', () => {
        const map = new Map<number, string>([
            [1, 'red'],
            [2, 'yellow'],
            [3, 'blue'],
        ]);
        const result = [];
        MapUtils.forEachTailing(map, (value) => result.push(value));
        expect(result.length).toBe(2);
    });
});
