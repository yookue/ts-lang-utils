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


import {ObjectUtils} from '@yookue/ts-lang-utils';


describe('ObjectUtils', () => {
    test('Testing allNil', () => {
        expect(ObjectUtils.allNil([undefined, null])).toBeTruthy();
        expect(ObjectUtils.allNil([undefined, {}])).toBeFalsy();
        expect(ObjectUtils.allNil([undefined, 'foobar'])).toBeFalsy();
    });

    test('Testing allNotNil', () => {
        expect(ObjectUtils.allNotNil([undefined, 'foobar'])).toBeFalsy();
        expect(ObjectUtils.allNotNil(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing anyNil', () => {
        expect(ObjectUtils.anyNil([undefined, null])).toBeTruthy();
        expect(ObjectUtils.anyNil([undefined, 'foobar'])).toBeTruthy();
        expect(ObjectUtils.anyNil(['foo', 'bar'])).toBeFalsy();
    });

    test('Testing anyNotNil', () => {
        expect(ObjectUtils.anyNotNil([undefined, null])).toBeFalsy();
        expect(ObjectUtils.anyNotNil([undefined, 'foobar'])).toBeTruthy();
        expect(ObjectUtils.anyNotNil(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing clone', () => {
        expect(ObjectUtils.getProp(ObjectUtils.clone({'foo': 'bar'}), 'foo')).toBe('bar');
    });

    test('Testing cloneExclusive', () => {
        expect(ObjectUtils.getProp(ObjectUtils.cloneExclusive({'foo': 'bar'}, ['foo']), 'foo')).toBeUndefined();
        expect(ObjectUtils.getProp(ObjectUtils.cloneExclusive({'foo': 'bar'}, ['bar']), 'foo')).toBe('bar');
    });

    test('Testing cloneInclusive', () => {
        expect(ObjectUtils.getProp(ObjectUtils.cloneInclusive({'foo': 'bar'}, ['foo']), 'foo')).toBe('bar');
        expect(ObjectUtils.getProp(ObjectUtils.cloneInclusive({'foo': 'bar'}, ['bar']), 'foo')).toBeUndefined();
    });

    test('Testing defaultProps', () => {
        expect(ObjectUtils.getProp(ObjectUtils.defaultProps({}, {'foo': 'bar'}), 'foo')).toBe('bar');
        expect(ObjectUtils.getProp(ObjectUtils.defaultProps({'foo': 'world'}, {'foo': 'bar'}), 'foo')).toBe('world');
        expect(ObjectUtils.getProp(ObjectUtils.defaultProps({'foo': undefined}, {'foo': 'bar'}, true), 'foo')).toBe('bar');
        expect(ObjectUtils.getProp(ObjectUtils.defaultProps({'foo': undefined}, {'foo': 'bar'}, false), 'foo')).toBeUndefined();
    });

    test('Testing forEachProp', () => {
        const keys: string[] = [];
        ObjectUtils.forEachProp({'foo': 'bar', 'hello': 'world'}, key => keys.push(key));
        expect(keys.length).toBe(2);
    });

    test('Testing isNil', () => {
        expect(ObjectUtils.isNil(undefined)).toBeTruthy();
        expect(ObjectUtils.isNil(null)).toBeTruthy();
        expect(ObjectUtils.isNil({})).toBeFalsy();
    });

    test('Testing isNotNil', () => {
        expect(ObjectUtils.isNotNil('foobar')).toBeTruthy();
        expect(ObjectUtils.isNotNil([])).toBeTruthy();
    });

    test('Testing isEmpty', () => {
        expect(ObjectUtils.isEmpty(undefined)).toBeTruthy();
        expect(ObjectUtils.isEmpty(null)).toBeTruthy();
        expect(ObjectUtils.isEmpty([])).toBeTruthy();
        expect(ObjectUtils.isEmpty({})).toBeTruthy();
    });

    test('Testing isNotEmpty', () => {
        expect(ObjectUtils.isNotEmpty([undefined, null])).toBeTruthy();
    });

    test('Testing isPrimitive', () => {
        expect(ObjectUtils.isPrimitive(undefined)).toBeTruthy();
        expect(ObjectUtils.isPrimitive(true)).toBeTruthy();
        expect(ObjectUtils.isPrimitive('foobar')).toBeTruthy();
        expect(ObjectUtils.isPrimitive({foo: 'bar'})).toBeFalsy();
    });

    test('Testing isPrototype', () => {
        expect(ObjectUtils.isPrototype({foo: 'bar'})).toBeFalsy();
        expect(ObjectUtils.isPrototype('foobar')).toBeFalsy();
    });

    test('Testing isRegular', () => {
        expect(ObjectUtils.isRegular(/[0-9a-zA-Z]+/g)).toBeTruthy();
        expect(ObjectUtils.isRegular('/[0-9a-zA-Z]+/g')).toBeFalsy();
    });

    test('Testing getProp', () => {
        expect(ObjectUtils.getProp({foo: 'bar'}, 'foo')).toBe('bar');
        expect(ObjectUtils.getProp({foo: {bar: 'foobar'}}, 'foobar')).toBeUndefined();
        expect(ObjectUtils.getProp({foo: {bar: 'foobar'}}, 'foo.bar')).toBe('foobar');
    });

    test('Testing hasProp', () => {
        expect(ObjectUtils.hasProp({foo: 'bar'}, 'foo')).toBeTruthy();
        expect(ObjectUtils.hasProp({foo: 'bar'}, 'bar')).toBeFalsy();
    });

    test('Testing setProp', () => {
        const record = {};
        ObjectUtils.setProp(record, 'foo', 'bar');
        expect(ObjectUtils.getProp(record, 'foo')).toBe('bar');
    });

    test('Testing isPlain', () => {
        expect(ObjectUtils.isPlain(undefined)).toBeFalsy();
        expect(ObjectUtils.isPlain(null)).toBeFalsy();
        expect(ObjectUtils.isPlain('foobar')).toBeFalsy();
        expect(ObjectUtils.isPlain(['foo', 'bar'])).toBeFalsy();
        expect(ObjectUtils.isPlain({foo: 'bar'})).toBeTruthy();
    });

    test('Testing isPromise', () => {
        expect(ObjectUtils.isPromise(undefined)).toBeFalsy();
        expect(ObjectUtils.isPromise({foo: 'bar'})).toBeFalsy()
        const promise = Promise.resolve();
        expect(ObjectUtils.isPromise(promise)).toBeTruthy();
    });

    test('Testing keys', () => {
        expect(ObjectUtils.keys([1, 2, 3])).toContain('1');
        expect(ObjectUtils.keys({foo: 'bar'})).toContain('foo');
        expect(ObjectUtils.keys({foo: 'bar'})).not.toContain('bar');
    });

    test('Testing toString', () => {
        expect(ObjectUtils.toString(undefined, undefined)).toBeUndefined();
        expect(ObjectUtils.toString(undefined, null)).toBeNull();
        expect(ObjectUtils.toString(undefined, 'foobar')).toBe('foobar');
        expect(ObjectUtils.toString('hello', 'foobar')).toBe('hello');
    });
});
