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


import {StringUtils} from '@yookue/ts-lang-utils';


describe('StringUtils', () => {
    test('Testing isEmpty', () => {
        expect(StringUtils.isEmpty(undefined)).toBeTruthy();
        expect(StringUtils.isEmpty('')).toBeTruthy();
        expect(StringUtils.isEmpty('foobar')).toBeFalsy();
    });

    test('Testing isNotEmpty', () => {
        expect(StringUtils.isNotEmpty(undefined)).toBeFalsy();
        expect(StringUtils.isNotEmpty('')).toBeFalsy();
        expect(StringUtils.isNotEmpty('foobar')).toBeTruthy();
    });

    test('Testing isBlank', () => {
        expect(StringUtils.isBlank(undefined)).toBeTruthy();
        expect(StringUtils.isBlank(' ')).toBeTruthy();
        expect(StringUtils.isBlank('foobar')).toBeFalsy();
    });

    test('Testing isNotBlank', () => {
        expect(StringUtils.isNotBlank(undefined)).toBeFalsy();
        expect(StringUtils.isNotBlank(' ')).toBeFalsy();
        expect(StringUtils.isNotBlank('foobar')).toBeTruthy();
    });

    test('Testing allEmpty', () => {
        expect(StringUtils.allEmpty(undefined, '')).toBeTruthy();
        expect(StringUtils.allEmpty(undefined, ' ')).toBeFalsy();
        expect(StringUtils.allEmpty('foo', 'bar')).toBeFalsy();
    });

    test('Testing allNotEmpty', () => {
        expect(StringUtils.allNotEmpty(undefined, '')).toBeFalsy();
        expect(StringUtils.allNotEmpty(undefined, ' ')).toBeFalsy();
        expect(StringUtils.allNotEmpty('foo', 'bar')).toBeTruthy();
    });

    test('Testing anyEmpty', () => {
        expect(StringUtils.anyEmpty(undefined, '')).toBeTruthy();
        expect(StringUtils.anyEmpty(undefined, ' ')).toBeTruthy();
        expect(StringUtils.anyEmpty('foo', 'bar')).toBeFalsy();
    });

    test('Testing anyNotEmpty', () => {
        expect(StringUtils.anyNotEmpty(undefined, '')).toBeFalsy();
        expect(StringUtils.anyNotEmpty(undefined, ' ')).toBeTruthy();
        expect(StringUtils.anyNotEmpty('foo', 'bar')).toBeTruthy();
    });

    test('Testing allBlank', () => {
        expect(StringUtils.allBlank(undefined, '')).toBeTruthy();
        expect(StringUtils.allBlank(undefined, ' ')).toBeTruthy();
        expect(StringUtils.allBlank('foo', 'bar')).toBeFalsy();
    });

    test('Testing allNotBlank', () => {
        expect(StringUtils.allNotBlank(undefined, '')).toBeFalsy();
        expect(StringUtils.allNotBlank(undefined, ' ')).toBeFalsy();
        expect(StringUtils.allNotBlank('foo', 'bar')).toBeTruthy();
    });

    test('Testing anyBlank', () => {
        expect(StringUtils.anyBlank(undefined, '')).toBeTruthy();
        expect(StringUtils.anyBlank(undefined, ' ')).toBeTruthy();
        expect(StringUtils.anyBlank('foo', 'bar')).toBeFalsy();
    });

    test('Testing anyNotBlank', () => {
        expect(StringUtils.anyNotBlank(undefined, '')).toBeFalsy();
        expect(StringUtils.anyNotBlank(undefined, ' ')).toBeFalsy();
        expect(StringUtils.anyNotBlank('foo', 'bar')).toBeTruthy();
    });

    test('Testing defaultIfEmpty', () => {
        expect(StringUtils.defaultIfEmpty(undefined, 'foobar')).toBe('foobar');
    });

    test('Testing defaultIfBlank', () => {
        expect(StringUtils.defaultIfBlank(' ', 'foobar')).toBe('foobar');
    });

    test('Testing equals', () => {
        expect(StringUtils.equals('foo', 'bar')).toBeFalsy();
        expect(StringUtils.equals('foo', 'foo')).toBeTruthy();
    });

    test('Testing equalsIgnoreCase', () => {
        expect(StringUtils.equalsIgnoreCase('foo', 'bar')).toBeFalsy();
        expect(StringUtils.equalsIgnoreCase('foo', 'FOO')).toBeTruthy();
    });

    test('Testing equalsAny', () => {
        expect(StringUtils.equalsAny('foo', ['foo', 'bar'])).toBeTruthy();
        expect(StringUtils.equalsAny('foo', ['bar', undefined])).toBeFalsy();
    });

    test('Testing equalsAnyIgnoreCase', () => {
        expect(StringUtils.equalsAnyIgnoreCase('foo', ['FOO', 'bar'])).toBeTruthy();
        expect(StringUtils.equalsAnyIgnoreCase('foo', ['bar', undefined])).toBeFalsy();
    });

    test('Testing formatBraces', () => {
        expect(StringUtils.formatBraces('foo{}', 'bar')).toBe('foobar');
        expect(StringUtils.formatBraces('foobar{}')).toBe('foobar{}');
        expect(StringUtils.formatBraces('hello {}, foo{}', 'world', 'bar')).toBe('hello world, foobar');
        expect(StringUtils.formatBraces('welcome {} {} {}', 'to', 'the', 'world')).toBe('welcome to the world');
    });

    test('Testing formatPlaceholders', () => {
        expect(StringUtils.formatPlaceholders('foo{bar}', {bar: 'bar'})).toBe('foobar');
        expect(StringUtils.formatPlaceholders('foobar{none}', {})).toBe('foobar{none}');
        expect(StringUtils.formatPlaceholders('hello {name}, foo{bar}', {name: 'world', bar: 'bar'})).toBe('hello world, foobar');
        expect(StringUtils.formatPlaceholders('welcome {a} {b} {c}', {a: 'to', b: 'the', c: 'world'})).toBe('welcome to the world');
    });

    test('Testing includes', () => {
        expect(StringUtils.includes('foobar', 'foo')).toBeTruthy();
        expect(StringUtils.includes('foobar', 'world')).toBeFalsy();
        expect(StringUtils.includes('foobar', undefined)).toBeFalsy();
    });

    test('Testing includesIgnoreCase', () => {
        expect(StringUtils.includesIgnoreCase('foobar', 'FOO')).toBeTruthy();
        expect(StringUtils.includesIgnoreCase('foobar', 'world')).toBeFalsy();
        expect(StringUtils.includesIgnoreCase('foobar', undefined)).toBeFalsy();
    });

    test('Testing includesAny', () => {
        expect(StringUtils.includesAny('foobar', ['foo', 'bar'])).toBeTruthy();
        expect(StringUtils.includesAny('foobar', ['world', undefined])).toBeFalsy();
    });

    test('Testing includesAnyIgnoreCase', () => {
        expect(StringUtils.includesAnyIgnoreCase('foobar', ['FOO', 'jest'])).toBeTruthy();
        expect(StringUtils.includesAnyIgnoreCase('foobar', ['world', undefined])).toBeFalsy();
    });

    test('Testing trim', () => {
        expect(StringUtils.trim(undefined)).toBe(undefined);
        expect(StringUtils.trim('foobar  ')).toBe('foobar');
        expect(StringUtils.trim(' ', true)).toBe(null);
    });
});
