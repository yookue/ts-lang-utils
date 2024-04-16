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
    test('Testing allEmpty', () => {
        expect(StringUtils.allEmpty([undefined, ''])).toBeTruthy();
        expect(StringUtils.allEmpty([undefined, ' '])).toBeFalsy();
        expect(StringUtils.allEmpty(['foo', 'bar'])).toBeFalsy();
    });

    test('Testing allNotEmpty', () => {
        expect(StringUtils.allNotEmpty([undefined, ''])).toBeFalsy();
        expect(StringUtils.allNotEmpty([undefined, ' '])).toBeFalsy();
        expect(StringUtils.allNotEmpty(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing allBlank', () => {
        expect(StringUtils.allBlank([undefined, ''])).toBeTruthy();
        expect(StringUtils.allBlank([undefined, ' '])).toBeTruthy();
        expect(StringUtils.allBlank(['foo', 'bar'])).toBeFalsy();
    });

    test('Testing allNotBlank', () => {
        expect(StringUtils.allNotBlank([undefined, ''])).toBeFalsy();
        expect(StringUtils.allNotBlank([undefined, ' '])).toBeFalsy();
        expect(StringUtils.allNotBlank(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing anyEmpty', () => {
        expect(StringUtils.anyEmpty([undefined, ''])).toBeTruthy();
        expect(StringUtils.anyEmpty([undefined, ' '])).toBeTruthy();
        expect(StringUtils.anyEmpty(['foo', 'bar'])).toBeFalsy();
    });

    test('Testing anyNotEmpty', () => {
        expect(StringUtils.anyNotEmpty([undefined, ''])).toBeFalsy();
        expect(StringUtils.anyNotEmpty([undefined, ' '])).toBeTruthy();
        expect(StringUtils.anyNotEmpty(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing anyBlank', () => {
        expect(StringUtils.anyBlank([undefined, ''])).toBeTruthy();
        expect(StringUtils.anyBlank([undefined, ' '])).toBeTruthy();
        expect(StringUtils.anyBlank(['foo', 'bar'])).toBeFalsy();
    });

    test('Testing anyNotBlank', () => {
        expect(StringUtils.anyNotBlank([undefined, ''])).toBeFalsy();
        expect(StringUtils.anyNotBlank([undefined, ' '])).toBeFalsy();
        expect(StringUtils.anyNotBlank(['foo', 'bar'])).toBeTruthy();
    });

    test('Testing appendIfMissing', () => {
        expect(StringUtils.appendIfMissing('foo', 'bar')).toBe('foobar');
        expect(StringUtils.appendIfMissing('foobar', 'bar')).toBe('foobar');
    });

    test('Testing appendIfMissingIgnoreCase', () => {
        expect(StringUtils.appendIfMissingIgnoreCase('foo', 'bar')).toBe('foobar');
        expect(StringUtils.appendIfMissingIgnoreCase('foobar', 'BAR')).toBe('foobar');
    });

    test('Testing capitalizeFirst', () => {
        expect(StringUtils.capitalizeFirst('f')).toBe('F');
        expect(StringUtils.capitalizeFirst('fooBar')).toBe('FooBar');
    });

    test('Testing capitalizeFirstLowerTail', () => {
        expect(StringUtils.capitalizeFirstLowerTail('f')).toBe('F');
        expect(StringUtils.capitalizeFirstLowerTail('fooBar')).toBe('Foobar');
    });

    test('Testing defaultString', () => {
        expect(StringUtils.defaultString(undefined)).toBe('');
        expect(StringUtils.defaultString(null)).toBe('');
    });

    test('Testing defaultIfEmpty', () => {
        expect(StringUtils.defaultIfEmpty(undefined, 'foobar')).toBe('foobar');
    });

    test('Testing defaultIfBlank', () => {
        expect(StringUtils.defaultIfBlank(' ', 'foobar')).toBe('foobar');
    });

    test('Testing endsWith', () => {
        expect(StringUtils.endsWith('foobar', 'bar')).toBeTruthy();
        expect(StringUtils.endsWith('hello', 'bar')).toBeFalsy();
    });

    test('Testing endsWithIgnoreCase', () => {
        expect(StringUtils.endsWithIgnoreCase('foobar', 'BAR')).toBeTruthy();
        expect(StringUtils.endsWithIgnoreCase('hello', 'BAR')).toBeFalsy();
    });

    test('Testing endsWithAny', () => {
        expect(StringUtils.endsWithAny('foobar', ['foo', 'bar'])).toBeTruthy();
        expect(StringUtils.endsWithAny('hello', ['foo', 'bar'])).toBeFalsy();
    });

    test('Testing endsWithAnyIgnoreCase', () => {
        expect(StringUtils.endsWithAnyIgnoreCase('foobar', ['FOO', 'BAR'])).toBeTruthy();
        expect(StringUtils.endsWithAnyIgnoreCase('hello', ['FOO', 'BAR'])).toBeFalsy();
    });

    test('Testing equals', () => {
        expect(StringUtils.equals(undefined, null)).toBeFalsy();
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

    test('Testing filterIgnoreEmpty', () => {
        expect(StringUtils.filterIgnoreEmpty([null, undefined, '', 'foobar'])).toStrictEqual(['foobar']);
    });

    test('Testing filterIgnoreBlank', () => {
        expect(StringUtils.filterIgnoreBlank([null, undefined, ' ', 'foobar'])).toStrictEqual(['foobar']);
    });

    test('Testing formatBrace', () => {
        expect(StringUtils.formatBrace('foo{}', 'bar')).toBe('foobar');
        expect(StringUtils.formatBrace('foobar{}')).toBe('foobar{}');
        expect(StringUtils.formatBrace('hello {}, foo{}', 'world', 'bar')).toBe('hello world, foobar');
        expect(StringUtils.formatBrace('welcome {} {} {}', 'to', 'the', 'world')).toBe('welcome to the world');
    });

    test('Testing formatPercent', () => {
        expect(StringUtils.formatPercent('%bcdfjo%sxX', 1, '-')).toBe('1cdfjo-xX');
        expect(StringUtils.formatPercent('foo%s', 'bar')).toBe('foobar');
        expect(StringUtils.formatPercent('foobar %d', 2023)).toBe('foobar 2023');
        expect(StringUtils.formatPercent('hello %s, foo%s', 'world', 'bar')).toBe('hello world, foobar');
        expect(StringUtils.formatPercent('welcome %s %s %s', 'to', 'the', 'world')).toBe('welcome to the world');
    });

    test('Testing formatPlaceholder', () => {
        expect(StringUtils.formatPlaceholder('foo{bar}', {bar: 'bar'})).toBe('foobar');
        expect(StringUtils.formatPlaceholder('foobar{none}', {})).toBe('foobar{none}');
        expect(StringUtils.formatPlaceholder('hello {name}, foo{bar}', {name: 'world', bar: 'bar'})).toBe('hello world, foobar');
        expect(StringUtils.formatPlaceholder('welcome {a} {b} {c}', {a: 'to', b: 'the', c: 'world'})).toBe('welcome to the world');
    });

    test('Testing getLength', () => {
        expect(StringUtils.getLength(undefined)).toBe(0);
        expect(StringUtils.getLength('')).toBe(0);
        expect(StringUtils.getLength('foobar')).toBe(6);
    });

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

    test('Testing joinWith', () => {
        expect(StringUtils.joinWith('foobar')).toBe('foobar');
        expect(StringUtils.joinWith(['foo', 'bar'], undefined)).toBe('foobar');
        expect(StringUtils.joinWith(['foo', 'bar', 'world'], undefined, (text => text !== 'world'))).toBe('foobar');
    });

    test('Testing prependIfMissing', () => {
        expect(StringUtils.prependIfMissing('bar', 'foo')).toBe('foobar');
        expect(StringUtils.prependIfMissing('foobar', 'foo')).toBe('foobar');
    });

    test('Testing prependIfMissingIgnoreCase', () => {
        expect(StringUtils.prependIfMissingIgnoreCase('bar', 'foo')).toBe('foobar');
        expect(StringUtils.prependIfMissingIgnoreCase('foobar', 'FOO')).toBe('foobar');
    });

    test('Testing removeAll', () => {
        expect(StringUtils.removeAll(undefined, undefined)).toBeUndefined();
        expect(StringUtils.removeAll('foobar-foobar', undefined)).toBe('foobar-foobar');
        expect(StringUtils.removeAll('foobar-foobar', 'bar')).toBe('foo-foo');
    });

    test('Testing removeAllIgnoreCase', () => {
        expect(StringUtils.removeAllIgnoreCase(undefined, undefined)).toBeUndefined();
        expect(StringUtils.removeAllIgnoreCase('foobar-foobar', undefined)).toBe('foobar-foobar');
        expect(StringUtils.removeAllIgnoreCase('foobar-foobar', 'BAR')).toBe('foo-foo');
    });

    test('Testing removeFirst', () => {
        expect(StringUtils.removeFirst(undefined, undefined)).toBeUndefined();
        expect(StringUtils.removeFirst('foobar-foobar', undefined)).toBe('foobar-foobar');
        expect(StringUtils.removeFirst('foobar-foobar', 'bar')).toBe('foo-foobar');
    });

    test('Testing removeFirstIgnoreCase', () => {
        expect(StringUtils.removeFirstIgnoreCase(undefined, undefined)).toBeUndefined();
        expect(StringUtils.removeFirstIgnoreCase('foobar-foobar', undefined)).toBe('foobar-foobar');
        expect(StringUtils.removeFirstIgnoreCase('foobar-foobar', 'BAR')).toBe('foo-foobar');
    });

    test('Testing removeEquals', () => {
        expect(StringUtils.removeEquals(['foo', 'bar'], undefined)).toStrictEqual(['foo', 'bar']);
        expect(StringUtils.removeEquals(['foo', 'bar'], ['world'])).toStrictEqual(['foo', 'bar']);
        expect(StringUtils.removeEquals(['foo', 'bar'], ['bar'])).toStrictEqual(['foo']);
    });

    test('Testing removeEqualsIgnoreCase', () => {
        expect(StringUtils.removeEqualsIgnoreCase(['foo', 'bar'], ['BAR'])).toStrictEqual(['foo']);
    });

    test('Testing removeIncludes', () => {
        expect(StringUtils.removeIncludes(['foo', 'bar'], undefined)).toStrictEqual(['foo', 'bar']);
        expect(StringUtils.removeIncludes(['foo', 'bar'], ['world'])).toStrictEqual(['foo', 'bar']);
        expect(StringUtils.removeIncludes(['foo', 'bar'], ['ar'])).toStrictEqual(['foo']);
    });

    test('Testing removeIncludesIgnoreCase', () => {
        expect(StringUtils.removeIncludesIgnoreCase(['foo', 'bar'], ['AR'])).toStrictEqual(['foo']);
    });

    test('Testing replaceAll', () => {
        expect(StringUtils.replaceAll(undefined, undefined, undefined)).toBeUndefined();
        expect(StringUtils.replaceAll('foobar-foobar', undefined, 'hello')).toBe('foobar-foobar');
        expect(StringUtils.replaceAll('foobar-foobar', 'foobar', 'hello')).toBe('hello-hello');
    });

    test('Testing replaceAllIgnoreCase', () => {
        expect(StringUtils.replaceAllIgnoreCase(undefined, undefined, undefined)).toBeUndefined();
        expect(StringUtils.replaceAllIgnoreCase('foobar-foobar', undefined, 'hello')).toBe('foobar-foobar');
        expect(StringUtils.replaceAllIgnoreCase('foobar-foobar', 'FOOBAR', 'hello')).toBe('hello-hello');
    });

    test('Testing replaceFirst', () => {
        expect(StringUtils.replaceFirst(undefined, undefined, undefined)).toBeUndefined();
        expect(StringUtils.replaceFirst('foobar-foobar', undefined, 'hello')).toBe('foobar-foobar');
        expect(StringUtils.replaceFirst('foobar-foobar', 'foobar', 'hello')).toBe('hello-foobar');
    });

    test('Testing replaceFirstIgnoreCase', () => {
        expect(StringUtils.replaceFirstIgnoreCase(undefined, undefined, undefined)).toBeUndefined();
        expect(StringUtils.replaceFirstIgnoreCase('foobar-foobar', undefined, 'hello')).toBe('foobar-foobar');
        expect(StringUtils.replaceFirstIgnoreCase('foobar-foobar', 'FOOBAR', 'hello')).toBe('hello-foobar');
    });

    test('Testing split', () => {
        expect(StringUtils.split('foo,bar')).toStrictEqual(['foo', 'bar']);
        expect(StringUtils.split('hello | world | wonderful', '|', 2)).toStrictEqual(['hello', 'world']);
    });

    test('Testing startsWith', () => {
        expect(StringUtils.startsWith('foobar', 'foo')).toBeTruthy();
        expect(StringUtils.startsWith('hello', 'bar')).toBeFalsy();
    });

    test('Testing startsWithIgnoreCase', () => {
        expect(StringUtils.startsWithIgnoreCase('foobar', 'FOO')).toBeTruthy();
        expect(StringUtils.startsWithIgnoreCase('hello', 'BAR')).toBeFalsy();
    });

    test('Testing startsWithAny', () => {
        expect(StringUtils.startsWithAny('foobar', ['foo', 'bar'])).toBeTruthy();
        expect(StringUtils.startsWithAny('hello', ['foo', 'bar'])).toBeFalsy();
    });

    test('Testing startsWithAnyIgnoreCase', () => {
        expect(StringUtils.startsWithAnyIgnoreCase('foobar', ['FOO', 'BAR'])).toBeTruthy();
        expect(StringUtils.startsWithAnyIgnoreCase('hello', ['FOO', 'BAR'])).toBeFalsy();
    });

    test('Testing substringAfter', () => {
        expect(StringUtils.substringAfter('foo/bar/foo/bar', '/')).toBe('bar/foo/bar');
    });

    test('Testing substringAfterLast', () => {
        expect(StringUtils.substringAfterLast('foo/bar/foo/bar', '/')).toBe('bar');
    });

    test('Testing substringBefore', () => {
        expect(StringUtils.substringBefore('foo/bar/foo/bar', '/')).toBe('foo');
    });

    test('Testing substringBeforeLast', () => {
        expect(StringUtils.substringBeforeLast('foo/bar/foo/bar', '/')).toBe('foo/bar/foo');
    });

    test('Testing toCamelCase', () => {
        expect(StringUtils.toCamelCase('FOO BAR')).toBe('fooBar');
        expect(StringUtils.toCamelCase('--FOO-BAR--')).toBe('fooBar');
    });

    test('Testing toKebabCase', () => {
        expect(StringUtils.toKebabCase('FOO BAR')).toBe('foo-bar');
        expect(StringUtils.toKebabCase('--FOO-BAR--')).toBe('foo-bar');
    });

    test('Testing trim', () => {
        expect(StringUtils.trim(undefined)).toBeUndefined();
        expect(StringUtils.trim('foobar  ')).toBe('foobar');
        expect(StringUtils.trim(' ', true)).toBe(null);
    });
});
