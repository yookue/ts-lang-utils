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
    test('Testing fromString', () => {
        expect(BooleanUtils.fromString('true')).toBeTruthy();
        expect(BooleanUtils.fromString('false')).toBeFalsy();
        expect(BooleanUtils.fromString('yes')).toBeTruthy();
        expect(BooleanUtils.fromString('no')).toBeFalsy();
    });

    test('Testing toString', () => {
        expect(BooleanUtils.toString(undefined, 'true', 'false')).toBeUndefined();
        expect(BooleanUtils.toStringTrueFalse(true)).toBe('true');
        expect(BooleanUtils.toStringTrueFalse(false)).toBe('false');
        expect(BooleanUtils.toStringYesNo(true)).toBe('yes');
        expect(BooleanUtils.toStringYesNo(false)).toBe('no');
        expect(BooleanUtils.toString10(true)).toBe('1');
        expect(BooleanUtils.toString10(false)).toBe('0');
    });
});
