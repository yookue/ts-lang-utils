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
    test('Testing allTrue', () => {
        expect(BooleanUtils.allTrue([null, undefined])).toBeFalsy();
        expect(BooleanUtils.allTrue([null, true])).toBeFalsy();
        expect(BooleanUtils.allTrue([true, true])).toBeTruthy();
    });

    test('Testing allNotTrue', () => {
        expect(BooleanUtils.allNotTrue([null, undefined])).toBeTruthy();
        expect(BooleanUtils.allNotTrue([null, true])).toBeFalsy();
        expect(BooleanUtils.allNotTrue([null, false])).toBeTruthy();
    });

    test('Testing allFalse', () => {
        expect(BooleanUtils.allFalse([null, undefined])).toBeFalsy();
        expect(BooleanUtils.allFalse([null, false])).toBeFalsy();
        expect(BooleanUtils.allFalse([false, false])).toBeTruthy();
    });

    test('Testing allNotFalse', () => {
        expect(BooleanUtils.allNotFalse([null, undefined])).toBeTruthy();
        expect(BooleanUtils.allNotFalse([null, false])).toBeFalsy();
        expect(BooleanUtils.allNotFalse([null, true])).toBeTruthy();
    });

    test('Testing anyTrue', () => {
        expect(BooleanUtils.anyTrue([null, undefined])).toBeFalsy();
        expect(BooleanUtils.anyTrue([null, true])).toBeTruthy();
        expect(BooleanUtils.anyTrue([null, false])).toBeFalsy();
    });

    test('Testing anyNotTrue', () => {
        expect(BooleanUtils.anyNotTrue([null, undefined])).toBeTruthy();
        expect(BooleanUtils.anyNotTrue([null, true])).toBeTruthy();
        expect(BooleanUtils.anyNotTrue([null, false])).toBeTruthy();
    });

    test('Testing anyFalse', () => {
        expect(BooleanUtils.anyFalse([null, undefined])).toBeFalsy();
        expect(BooleanUtils.anyFalse([null, true])).toBeFalsy();
        expect(BooleanUtils.anyFalse([null, false])).toBeTruthy();
    });

    test('Testing anyNotFalse', () => {
        expect(BooleanUtils.anyNotFalse([null, undefined])).toBeTruthy();
        expect(BooleanUtils.anyNotFalse([null, false])).toBeTruthy();
        expect(BooleanUtils.anyNotFalse([false, false])).toBeFalsy();
    });

    test('Testing isTrue', () => {
        expect(BooleanUtils.isTrue(true)).toBeTruthy();
        expect(BooleanUtils.isTrue(1)).toBeTruthy();
        expect(BooleanUtils.isTrue('true')).toBeTruthy();
        expect(BooleanUtils.isTrue('yes')).toBeTruthy();
        expect(BooleanUtils.isTrue('foobar')).toBeFalsy();
        expect(BooleanUtils.isTrue(undefined)).toBeFalsy();
        expect(BooleanUtils.isTrue(null)).toBeFalsy();
        expect(BooleanUtils.isTrue(() => true)).toBeTruthy();
    });

    test('Testing isNotTrue', () => {
        expect(BooleanUtils.isNotTrue(false)).toBeTruthy();
        expect(BooleanUtils.isNotTrue(0)).toBeTruthy();
        expect(BooleanUtils.isNotTrue('false')).toBeTruthy();
        expect(BooleanUtils.isNotTrue('no')).toBeTruthy();
        expect(BooleanUtils.isNotTrue('foobar')).toBeTruthy();
        expect(BooleanUtils.isNotTrue(undefined)).toBeTruthy();
        expect(BooleanUtils.isNotTrue(null)).toBeTruthy();
        expect(BooleanUtils.isNotTrue(() => false)).toBeTruthy();
    });

    test('Testing isFalse', () => {
        expect(BooleanUtils.isFalse(false)).toBeTruthy();
        expect(BooleanUtils.isFalse(0)).toBeTruthy();
        expect(BooleanUtils.isFalse('false')).toBeTruthy();
        expect(BooleanUtils.isFalse('no')).toBeTruthy();
        expect(BooleanUtils.isFalse('foobar')).toBeFalsy();
        expect(BooleanUtils.isFalse(undefined)).toBeFalsy();
        expect(BooleanUtils.isFalse(null)).toBeFalsy();
        expect(BooleanUtils.isFalse(() => false)).toBeTruthy();
    });

    test('Testing isNotFalse', () => {
        expect(BooleanUtils.isNotFalse(true)).toBeTruthy();
        expect(BooleanUtils.isNotFalse(1)).toBeTruthy();
        expect(BooleanUtils.isNotFalse('true')).toBeTruthy();
        expect(BooleanUtils.isNotFalse('yes')).toBeTruthy();
        expect(BooleanUtils.isNotFalse('foobar')).toBeTruthy();
        expect(BooleanUtils.isNotFalse(undefined)).toBeTruthy();
        expect(BooleanUtils.isNotFalse(null)).toBeTruthy();
        expect(BooleanUtils.isNotFalse(() => true)).toBeTruthy();
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
