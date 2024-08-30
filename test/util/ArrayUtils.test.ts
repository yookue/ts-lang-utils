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
    test('Testing add', () => {
        expect(ArrayUtils.add(undefined, 'bar')).toStrictEqual(['bar']);
        expect(ArrayUtils.add(['foo', 'bar'], undefined)).toStrictEqual(['foo', 'bar']);
        expect(ArrayUtils.add(['foo', 'bar'], 'world')).toStrictEqual(['foo', 'bar', 'world']);
    });

    test('Testing addAll', () => {
        expect(ArrayUtils.addAll(undefined, ['bar'])).toStrictEqual(['bar']);
        expect(ArrayUtils.addAll(['foo', 'bar'], undefined)).toStrictEqual(['foo', 'bar']);
        expect(ArrayUtils.addAll(['foo', 'bar'], ['world'])).toStrictEqual(['foo', 'bar', 'world']);
    });

    test('Testing count', () => {
        expect(ArrayUtils.count(['foo', 'bar', 'foobar'], value => value.includes('foo'))).toBe(2);
    });

    test('Testing firstNotNil', () => {
        expect(ArrayUtils.firstNotNil([null, undefined, 'foo', 'bar', {}])).toBe('foo');
    });

    test('Testing firstNotEmpty', () => {
        expect(ArrayUtils.firstNotEmpty([null, undefined, {}, 'foo', 'bar'])).toBe('foo');
    });

    test('Testing getFirst', () => {
        expect(ArrayUtils.getFirst(['foo', 'bar'])).toBe('foo');
    });

    test('Testing getLast', () => {
        expect(ArrayUtils.getLast(['foo', 'bar'])).toBe('bar');
    });

    test('Testing getLength', () => {
        expect(ArrayUtils.getLength([])).toBe(0);
        expect(ArrayUtils.getLength(['foo', 'bar'])).toBe(2);
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

    test('Testing includesAll', () => {
        expect(ArrayUtils.includesAll(['foo', 'bar'], ['foo', 'bar'])).toBeTruthy();
        expect(ArrayUtils.includesAll(['foo', 'bar'], ['foo', 'world'])).toBeFalsy();
    });

    test('Testing includesAny', () => {
        expect(ArrayUtils.includesAny(['foo', 'bar'], ['foo', 'bar'])).toBeTruthy();
        expect(ArrayUtils.includesAny(['foo', 'bar'], ['foo', 'world'])).toBeTruthy();
    });

    test('Testing insert', () => {
        expect(ArrayUtils.insert(['foo', 'bar'], -1, ['hello', 'world'])).toStrictEqual(['foo', 'bar', 'hello', 'world']);
        expect(ArrayUtils.insert(['foo', 'bar'], 0, ['hello', 'world'])).toStrictEqual(['hello', 'world', 'foo', 'bar']);
        expect(ArrayUtils.insert(['foo', 'bar'], 1, ['hello', 'world'])).toStrictEqual(['foo', 'hello', 'world', 'bar']);
        expect(ArrayUtils.insert(['foo', 'bar'], 9, ['hello', 'world'])).toStrictEqual(['foo', 'bar', 'hello', 'world']);
    });

    test('Testing maxLength', () => {
        expect(ArrayUtils.maxLength(['foo', 'bar'], [1, 2, 3])).toBe(3);
        expect(ArrayUtils.maxLength(['foo', 'bar'], ['hello', 'word'])).toBe(2);
    });

    test('Testing minLength', () => {
        expect(ArrayUtils.minLength(['foo', 'bar'], [1, 2, 3], [])).toBe(0);
        expect(ArrayUtils.minLength(['foo', 'bar'], ['hello', 'word'])).toBe(2);
    });

    test('Testing readonly', () => {
        expect(ArrayUtils.getLength(ArrayUtils.readonly(['foo', 'bar']))).toBe(2);
    });

    test('Testing remove', () => {
        expect(ArrayUtils.remove(undefined, 'bar')).toBeUndefined();
        expect(ArrayUtils.remove(['foo', 'bar'], undefined)).toStrictEqual(['foo', 'bar']);
        expect(ArrayUtils.remove(['foo', 'bar'], 'bar')).toStrictEqual(['foo']);
    });

    test('Testing removeAll', () => {
        expect(ArrayUtils.removeAll(undefined, ['bar'])).toBeUndefined();
        expect(ArrayUtils.removeAll(['foo', 'bar'], undefined)).toStrictEqual(['foo', 'bar']);
        expect(ArrayUtils.removeAll(['foo', 'bar'], ['bar'])).toStrictEqual(['foo']);
    });

    test('Testing reverse', () => {
        expect(ArrayUtils.reverse(undefined)).toBeUndefined();
        expect(ArrayUtils.reverse(['foo', 'bar'])).toStrictEqual(['bar', 'foo']);
        expect(ArrayUtils.reverse(['foo', 'bar'], 0, 1)).toStrictEqual(['foo']);
    });

    test('Testing singleton', () => {
        expect(ArrayUtils.singleton(undefined)).toBeUndefined();
        expect(ArrayUtils.singleton('foobar')).toStrictEqual(['foobar']);
    });
});
