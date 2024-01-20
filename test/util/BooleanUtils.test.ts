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


import {BooleanUtils} from '@yookue/ts-lang-utils';


describe('BooleanUtils', () => {
    test('Testing isTrue', () => {
        expect(BooleanUtils.isTrue(1)).toBeTruthy();
        expect(BooleanUtils.isTrue('true')).toBeTruthy();
        expect(BooleanUtils.isTrue('yes')).toBeTruthy();
        expect(BooleanUtils.isTrue(undefined)).toBeFalsy();
        expect(BooleanUtils.isTrue(null)).toBeFalsy();
    });

    test('Testing isNotTrue', () => {
        expect(BooleanUtils.isNotTrue(0)).toBeTruthy();
        expect(BooleanUtils.isNotTrue('false')).toBeTruthy();
        expect(BooleanUtils.isNotTrue('no')).toBeTruthy();
        expect(BooleanUtils.isNotTrue(undefined)).toBeTruthy();
        expect(BooleanUtils.isNotTrue(null)).toBeTruthy();
    });

    test('Testing isFalse', () => {
        expect(BooleanUtils.isFalse(0)).toBeTruthy();
        expect(BooleanUtils.isFalse('false')).toBeTruthy();
        expect(BooleanUtils.isFalse('no')).toBeTruthy();
        expect(BooleanUtils.isFalse(undefined)).toBeFalsy();
        expect(BooleanUtils.isFalse(null)).toBeFalsy();
    });

    test('Testing isNotFalse', () => {
        expect(BooleanUtils.isNotFalse(1)).toBeTruthy();
        expect(BooleanUtils.isNotFalse('true')).toBeTruthy();
        expect(BooleanUtils.isNotFalse('yes')).toBeTruthy();
        expect(BooleanUtils.isNotFalse(undefined)).toBeTruthy();
        expect(BooleanUtils.isNotFalse(null)).toBeTruthy();
    });

    test('Testing toString', () => {
        expect(BooleanUtils.toString(undefined, 'true', 'false')).toBeUndefined();
        expect(BooleanUtils.toStringTrueFalse(true)).toBe('true');
        expect(BooleanUtils.toStringTrueFalse(false)).toBe('false');
        expect(BooleanUtils.toStringYesNo(true)).toBe('yes');
        expect(BooleanUtils.toStringYesNo(false)).toBe('no');
        expect(BooleanUtils.toStringYN(true)).toBe('Y');
        expect(BooleanUtils.toStringYN(false)).toBe('N');
        expect(BooleanUtils.toStringTF(true)).toBe('T');
        expect(BooleanUtils.toStringTF(false)).toBe('F');
        expect(BooleanUtils.toString10(true)).toBe('1');
        expect(BooleanUtils.toString10(false)).toBe('0');
    });
});
