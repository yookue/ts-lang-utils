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

    test('Testing isPrototype', () => {
        expect(ObjectUtils.isPrototype({foo: 'bar'})).toBeFalsy();
        expect(ObjectUtils.isPrototype('foobar')).toBeFalsy();
    });

    test('Testing allNil', () => {
        expect(ObjectUtils.allNil(undefined, null)).toBeTruthy();
        expect(ObjectUtils.allNil(undefined, 'foobar')).toBeFalsy();
    });

    test('Testing allNotNil', () => {
        expect(ObjectUtils.allNotNil(undefined, 'foobar')).toBeFalsy();
        expect(ObjectUtils.allNotNil('foo', 'bar')).toBeTruthy();
    });

    test('Testing anyNil', () => {
        expect(ObjectUtils.anyNil(undefined, null)).toBeTruthy();
        expect(ObjectUtils.anyNil(undefined, 'foobar')).toBeTruthy();
        expect(ObjectUtils.anyNil('foo', 'bar')).toBeFalsy();
    });

    test('Testing anyNotNil', () => {
        expect(ObjectUtils.anyNotNil(undefined, null)).toBeFalsy();
        expect(ObjectUtils.anyNotNil(undefined, 'foobar')).toBeTruthy();
        expect(ObjectUtils.anyNotNil('foo', 'bar')).toBeTruthy();
    });

    test('Testing firstNonNil', () => {
        expect(ObjectUtils.firstNonNil(undefined, 'foo', 'bar')).toBe('foo');
    });

    test('Testing getProperty', () => {
        expect(ObjectUtils.getProperty({foo: 'bar'}, 'foo')).toBe('bar');
        expect(ObjectUtils.getProperty({foo: {bar: 'foobar'}}, 'foobar')).toBeUndefined();
        expect(ObjectUtils.getProperty({foo: {bar: 'foobar'}}, 'foo.bar')).toBe('foobar');
    });

    test('Testing hasProperty', () => {
        expect(ObjectUtils.hasProperty({foo: 'bar'}, 'foo')).toBeTruthy();
        expect(ObjectUtils.hasProperty({foo: 'bar'}, 'bar')).toBeFalsy();
    });

    test('Testing setProperty', () => {
        const record = {};
        ObjectUtils.setProperty(record, 'foo', 'bar');
        expect(ObjectUtils.getProperty(record, 'foo')).toBe('bar');
    });

    test('Testing isPlainObject', () => {
        expect(ObjectUtils.isPlainObject(undefined)).toBeFalsy();
        expect(ObjectUtils.isPlainObject(null)).toBeFalsy();
        expect(ObjectUtils.isPlainObject('foobar')).toBeFalsy();
        expect(ObjectUtils.isPlainObject(['foo', 'bar'])).toBeFalsy();
        expect(ObjectUtils.isPlainObject({foo: 'bar'})).toBeTruthy();
    });

    test('Testing isPromiseObject', () => {
        expect(ObjectUtils.isPromiseObject(undefined)).toBeFalsy();
        expect(ObjectUtils.isPromiseObject({foo: 'bar'})).toBeFalsy()
        const promise = new Promise((resolve, reject) => {
            resolve(true);
        });
        expect(ObjectUtils.isPromiseObject(promise)).toBeTruthy();
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
