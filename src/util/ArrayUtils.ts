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


import {ObjectUtils} from './ObjectUtils';
import {StringUtils} from './StringUtils';


/**
 * Utilities for array
 *
 * @author David Hsing
 */
// noinspection JSUnusedGlobalSymbols
export abstract class ArrayUtils {
    /**
     * Returns the array that adds the given element
     *
     * @param array the arrays to inspect
     * @param element the element to add
     *
     * @returns the array that adds the given element
     *
     * @example
     * ArrayUtils.add(undefined, 'bar');    // ['bar']
     * ArrayUtils.add(['foo', 'bar'], undefined);    // ['foo', 'bar']
     * ArrayUtils.add(['foo', 'bar'], 'world');    // ['foo', 'bar', 'world']
     */
    public static add<E>(array?: E[] | null, element?: E | null): E[] | undefined | null {
        if (!array) {
            return !element ? undefined : [element];
        }
        if (!element) {
            return array;
        }
        const result = [...array];
        result[result.length] = element;
        return result;
    }

    /**
     * Returns the array that adds all the given elements
     *
     * @param array the arrays to inspect
     * @param elements the elements to remove
     *
     * @returns the array that adds all the given elements
     *
     * @example
     * ArrayUtils.addAll(undefined, ['bar']);    // ['bar']
     * ArrayUtils.addAll(['foo', 'bar'], undefined);    // ['foo', 'bar']
     * ArrayUtils.addAll(['foo', 'bar'], ['world']);    // ['foo', 'bar', 'world']
     */
    public static addAll<E>(array?: E[] | null, elements?: E[] | null): E[] | undefined | null {
        if (!array) {
            return elements;
        }
        if (!elements) {
            return array;
        }
        return [...array, ...elements];
    }

    /**
     * Returns the count of elements in the given array which match the given filter
     *
     * @param array the array to inspect
     * @param predicate the function to filter the given array
     *
     * @returns the count of elements in the given array which match the given filter
     *
     * @example
     * ArrayUtils.count(['foo', 'bar', 'foobar'], value => value.includes('foo'));    // 2
     */
    public static count<E>(array?: E[] | readonly E[] | null, predicate?: (value: E, index: number) => boolean): number {
        if (!array) {
            return 0;
        }
        if (!predicate) {
            return array.length;
        }
        return array.filter(predicate).length;
    }

    /**
     * Returns the first not nil element in the given array, or null if all elements are nil
     *
     * @param array the array to check
     *
     * @returns the first not nil element in the given array, or null if all elements are nil
     *
     * @example
     * ArrayUtils.firstNotNil([null, undefined, 'foo', 'bar', {}]);    // 'foo'
     */
    public static firstNotNil(array?: any[] | readonly any[] | null): any {
        // @ts-ignore
        return this.isEmpty(array) ? undefined : array.find(item => ObjectUtils.isNotNil(item));
    }

    /**
     * Returns the first not empty element in the given array, or null if all elements are nil
     *
     * @param array the array to check
     *
     * @returns the first not empty element in the given array, or null if all elements are nil
     *
     * @example
     * ArrayUtils.firstNotEmpty([null, undefined, {}, 'foo', 'bar']);    // 'foo'
     */
    public static firstNotEmpty(array?: any[] | readonly any[] | null): any {
        // @ts-ignore
        return this.isEmpty(array) ? undefined : array.find(item => ObjectUtils.isNotEmpty(item));
    }

    /**
     * Returns the first element of the given array
     *
     * @param array the array to inspect
     *
     * @returns the first element of the given array
     *
     * @example
     * ArrayUtils.getFirst(['foo', 'bar']);    // 'foo'
     */
    public static getFirst<E>(array?: E[] | readonly E[] | null): E | undefined {
        return (!array || array.length === 0) ? undefined : array[0];
    }

    /**
     * Returns the last element of the given array
     *
     * @param array the array to inspect
     *
     * @returns the last element of the given array
     *
     * @example
     * ArrayUtils.getLast(['foo', 'bar']);    // 'bar'
     */
    public static getLast<E>(array?: E[] | readonly E[] | null): E | undefined {
        return (!array || array.length === 0) ? undefined : array[array.length - 1];
    }

    /**
     * Returns the length of the given array
     *
     * @param array the array to check
     *
     * @returns the length of the given array
     *
     * @example
     * ArrayUtils.getLength([]);    // 0
     * ArrayUtils.getLength(['foo', 'bar']);    // 2
     */
    public static getLength(array?: any[] | readonly any[] | null): number {
        return array ? array.length : 0;
    }

    /**
     * Returns the element types of the given array
     *
     * @param array the array to check
     *
     * @returns the element types of the given array
     *
     * @example
     * ArrayUtils.getTypeof(['foo', 'bar']);    // ['string', 'string']
     */
    public static getTypeof(array?: any[] | readonly any[] | null): string[] | undefined {
        if (this.isEmpty(array)) {
            return undefined;
        }
        return array?.map(item => {
            if (Array.isArray(item)) {
                return 'array';
            }
            if (typeof item === 'object') {
                return (item === null) ? 'null' : 'object';
            }
            return typeof item;
        });
    }

    /**
     * Returns whether the given array is empty
     *
     * @param array the array to check
     *
     * @returns whether the given array is empty
     *
     * @example
     * ArrayUtils.isEmpty([]);    // true
     */
    public static isEmpty(array?: any[] | readonly any[] | null): boolean {
        return !array || array.length === 0;
    }

    /**
     * Returns whether the given array is not empty
     *
     * @param array the array to check
     *
     * @returns whether the given array is not empty
     *
     * @example
     * ArrayUtils.isNotEmpty(['foo', 'bar']);    // true
     */
    public static isNotEmpty(array?: any[] | readonly any[] | null): boolean {
        return !this.isEmpty(array);
    }

    /**
     * Returns whether each element in the given array is the expected type
     *
     * @param array the array to check
     * @param type the expected element type
     * @param relaxed treat null as string or object
     *
     * @returns whether each element in the given array is the expected type
     *
     * @example
     * ArrayUtils.isTypeof(['foo', 'bar'], 'string');    // true
     * ArrayUtils.isTypeof(['foo', 'bar', null], 'string', true);    // true
     */
    public static isTypeof(array?: any[] | readonly any[] | null, type?: string, relaxed = false): boolean {
        if (this.isEmpty(array) || StringUtils.isBlank(type)) {
            return false;
        }
        // @ts-ignore
        return array?.every(item => {
            return (typeof item === type) || (relaxed && item === null && StringUtils.equalsAny(type, ['string', 'object']));
        });
    }

    /**
     * Returns whether the given array includes the given element
     *
     * @param array the array to check
     * @param element the element to compare
     *
     * @returns whether the given array includes the given element
     *
     * @example
     * ArrayUtils.includes(['foo', 'bar'], 'foo');    // true
     */
    public static includes<E>(array?: E[] | readonly E[] | null, element?: E | null): boolean {
        return !!array && !!element && array.includes(element);
    }

    /**
     * Returns whether the given array includes all the given elements
     *
     * @param array the array to check
     * @param elements the elements to compare
     *
     * @returns whether the given array includes all the given elements
     *
     * @example
     * ArrayUtils.includesAll(['foo', 'bar'], ['foo', 'bar']);    // true
     * ArrayUtils.includesAll(['foo', 'bar'], ['foo', 'world']);    // false
     */
    public static includesAll<E>(array?: E[] | readonly E[] | null, elements?: E[] | null): boolean {
        return !!array && !!elements && elements.every(item => array.includes(item));
    }

    /**
     * Returns whether the given array includes any of the given elements
     *
     * @param array the array to check
     * @param elements the elements to compare
     *
     * @returns whether the given array includes any of the given elements
     *
     * @example
     * ArrayUtils.includesAny(['foo', 'bar'], ['foo', 'bar']);    // true
     * ArrayUtils.includesAny(['foo', 'bar'], ['foo', 'world']);    // true
     */
    public static includesAny<E>(array?: E[] | readonly E[] | null, elements?: E[] | null): boolean {
        return !!array && !!elements && elements.some(item => array.includes(item));
    }

    /**
     * Returns the array that contains all the given elements at the index of the source array
     *
     * @param array the array to inspect
     * @param index the index to insert, negative or greater than the length of source array, means at the end of the source array
     * @param elements the elements to insert
     *
     * @returns the array that contains all the given elements at the index of the source array
     *
     * @example
     * ArrayUtils.insert(['foo', 'bar'], -1, ['hello', 'world']);    // ['foo', 'bar', 'hello', 'world']
     * ArrayUtils.insert(['foo', 'bar'], 0, ['hello', 'world']);    // ['hello', 'world', 'foo', 'bar']
     * ArrayUtils.insert(['foo', 'bar'], 1, ['hello', 'world']);    // ['foo', 'hello', 'world', 'bar']
     * ArrayUtils.insert(['foo', 'bar'], 9, ['hello', 'world']);    // ['foo', 'bar', 'hello', 'world']
     */
    public static insert<E>(array?: E[] | null, index?: number, elements?: E[] | null): E[] | undefined | null {
        if (index === undefined || !elements || elements.length === 0) {
            return array;
        }
        if (!array || array.length === 0) {
            return elements;
        }
        if (index < 0 || index >= array.length) {
            return array.concat(elements);
        } else if (index === 0) {
            return elements.concat(array);
        }
        const order = Math.min(index, array.length);
        return array.slice(0, order).concat(elements).concat(array.slice(order));
    }

    /**
     * Returns the max length of the given arrays
     *
     * @param arrays the arrays to check
     *
     * @returns the max length of the given arrays
     *
     * @example
     * ArrayUtils.maxLength(['foo', 'bar'], [1, 2, 3]);    // 3
     */
    public static maxLength(...arrays: (any[] | readonly any[])[]): number {
        if (this.isEmpty(arrays)) {
            return 0;
        }
        let result = 0;
        for (const array of arrays) {
            result = Math.max(result, this.getLength(array));
        }
        return result;
    }

    /**
     * Returns the min length of the given arrays
     *
     * @param arrays the arrays to check
     *
     * @returns the min length of the given arrays
     *
     * @example
     * ArrayUtils.minLength(['foo', 'bar'], [1, 2, 3], []);    // 0
     */
    public static minLength(...arrays: (any[] | readonly any[])[]): number {
        if (this.isEmpty(arrays)) {
            return 0;
        }
        let result = arrays[0]?.length;
        for (const array of arrays.slice(1)) {
            result = Math.min(result, this.getLength(array));
            if (result === 0) {
                break;
            }
        }
        return result;
    }

    /**
     * Returns a readonly instance of the given array
     *
     * @param array the arrays to inspect
     *
     * @returns a readonly instance of the given array
     */
    public static readonly<E>(array?: E[] | null): ReadonlyArray<E> | undefined | null {
        return !array ? array : Object.freeze(array);
    }

    /**
     * Returns the array that removes the given element
     *
     * @param array the arrays to inspect
     * @param element the element to remove
     *
     * @returns the array that removes the given element
     *
     * @example
     * ArrayUtils.remove(undefined, 'bar');    // undefined
     * ArrayUtils.remove(['foo', 'bar'], undefined);    // ['foo', 'bar']
     * ArrayUtils.remove(['foo', 'bar'], 'bar');    // ['foo']
     */
    public static remove<E>(array?: E[] | null, element?: E | null): E[] | undefined | null {
        return (!array || !element) ? array : array.filter(item => item !== element);
    }

    /**
     * Returns the array that removes the given elements
     *
     * @param array the arrays to inspect
     * @param elements the elements to remove
     *
     * @returns the array that removes the given elements
     *
     * @example
     * ArrayUtils.removeAll(undefined, ['bar']);    // undefined
     * ArrayUtils.removeAll(['foo', 'bar'], undefined);    // ['foo', 'bar']
     * ArrayUtils.removeAll(['foo', 'bar'], ['bar']);    // ['foo']
     */
    public static removeAll<E>(array?: E[] | null, elements?: E[] | null): E[] | undefined | null {
        return (!array || !elements) ? array : array.filter(item => !elements.includes(item));
    }

    /**
     * Reverses the given array
     *
     * @param array the arrays to inspect
     * @param startInclusive the starting index, inclusive
     * @param endExclusive the ending index, exclusive
     *
     * @example
     * ArrayUtils.reverse(undefined);    // undefined
     * ArrayUtils.reverse(['foo', 'bar']);    // ['bar', 'foo']
     * ArrayUtils.reverse(['foo', 'bar'], 0, 1);    // ['foo']
     */
    public static reverse<E>(array?: E[] | null, startInclusive?: number, endExclusive?: number): E[] | undefined | null {
        if (!array) {
            return array;
        }
        const subarray = array.slice(startInclusive, endExclusive);
        subarray.reverse();
        return subarray;
    }

    /**
     * Returns an array that only contains the given element
     *
     * @param element the element to wrap
     *
     * @returns an array that only contains the given element
     *
     * @example
     * ArrayUtils.singleton('foobar');    // ['foobar']
     */
    public static singleton<E>(element?: E | null): E[] | undefined {
        return !element ? undefined : [element];
    }
}
