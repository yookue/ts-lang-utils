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
 * @abstract
 * @hideconstructor
 */
export abstract class ArrayUtils {
    /**
     * Returns whether all the elements in the given array are null or undefined
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether all the elements in the given array are null or undefined
     *
     * @example
     * ArrayUtils.allNil([null, undefined]);    // true
     * ArrayUtils.allNil([null, {}]);    // false
     * ArrayUtils.allNil([null, 'foobar']);    // false
     */
    public static allNil(array?: any[]): boolean {
        // @ts-ignore
        return this.isEmpty(array) || !array.some(item => ObjectUtils.isNotNil(item));
    }

    /**
     * Returns whether all the elements in the given array are not null or undefined
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether all the elements in the given array are not null or undefined
     *
     * @example
     * ArrayUtils.allNotNil([null, undefined]);    // false
     * ArrayUtils.allNotNil([null, {}]);    // false
     * ArrayUtils.allNotNil(['foo', 'bar']);    // true
     */
    public static allNotNil(array?: any[]): boolean {
        // @ts-ignore
        return this.isNotEmpty(array) && !array.some(item => ObjectUtils.isNil(item));
    }

    /**
     * Returns whether any of the elements in the given array is null or undefined
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether any the elements in the given array is null or undefined
     *
     * @example
     * ArrayUtils.anyNil([null, undefined]);    // true
     * ArrayUtils.anyNil([null, {}]);    // true
     * ArrayUtils.anyNil(['foo', 'bar']);    // false
     */
    public static anyNil(array?: any[]): boolean {
        // @ts-ignore
        return this.isEmpty(array) || array.some(item => ObjectUtils.isNil(item));
    }

    /**
     * Returns whether any of the elements in the given array is not null or undefined
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether any of the elements in the given array is not null or undefined
     *
     * @example
     * ArrayUtils.anyNotNil([null, undefined]);    // false
     * ArrayUtils.anyNotNil([null, {}]);    // true
     */
    public static anyNotNil(array?: any[]): boolean {
        // @ts-ignore
        return this.isNotEmpty(array) && array.some(item => ObjectUtils.isNotNil(item));
    }

    /**
     * Returns whether all the elements in the given array are empty
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether all the elements in the given array are empty
     *
     * @example
     * ArrayUtils.allEmpty([null, undefined]);    // true
     * ArrayUtils.allEmpty([null, {}]);    // true
     */
    public static allEmpty(array?: any[]): boolean {
        // @ts-ignore
        return this.isEmpty(array) || !array.some(item => ObjectUtils.isNotEmpty(item));
    }

    /**
     * Returns whether all the elements in the given array are not empty
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether all the elements in the given array are not empty
     *
     * @example
     * ArrayUtils.allNotEmpty([null, undefined]);    // false
     * ArrayUtils.allNotEmpty([null, {}]);    // false
     * ArrayUtils.allNotEmpty(['foo', 'bar']);    // true
     */
    public static allNotEmpty(array?: any[]): boolean {
        // @ts-ignore
        return this.isNotEmpty(array) && !array.some(item => ObjectUtils.isEmpty(item));
    }

    /**
     * Returns whether any of the elements in the given array is empty
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether any of the elements in the given array is empty
     *
     * @example
     * ArrayUtils.anyEmpty([null, undefined]);    // true
     * ArrayUtils.anyEmpty([null, {}]);    // true
     */
    public static anyEmpty(array?: any[]): boolean {
        // @ts-ignore
        return this.isEmpty(array) || array.some(item => ObjectUtils.isEmpty(item));
    }

    /**
     * Returns whether any of the elements in the given array is not empty
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether any of the elements in the given array is not empty
     *
     * @example
     * ArrayUtils.anyNotEmpty([null, undefined]);    // false
     * ArrayUtils.anyNotEmpty([null, {}]);    // false
     */
    public static anyNotEmpty(array?: any[]): boolean {
        // @ts-ignore
        return this.isNotEmpty(array) && array.some(item => ObjectUtils.isNotEmpty(item));
    }

    /**
     * Returns the first not nil element in the given array, or null if all elements are nil
     *
     * @param {Array<any>} array the array to check
     *
     * @return {any} the first not nil element in the given array, or null if all elements are nil
     *
     * @example
     * ArrayUtils.firstNotNil([undefined, 'foo', 'bar', {}]);    // 'foo'
     */
    public static firstNotNil(array?: any[]): any {
        // @ts-ignore
        return this.isEmpty(array) ? undefined : array.find(item => ObjectUtils.isNotNil(item));
    }

    /**
     * Returns the first not empty element in the given array, or null if all elements are nil
     *
     * @param {Array<any>} array the array to check
     *
     * @return {any} the first not empty element in the given array, or null if all elements are nil
     *
     * @example
     * ArrayUtils.firstNotEmpty([undefined, {}, 'foo', 'bar']);    // 'foo'
     */
    public static firstNotEmpty(array?: any[]): any {
        // @ts-ignore
        return this.isEmpty(array) ? undefined : array.find(item => ObjectUtils.isNotEmpty(item));
    }

    /**
     * Returns an array of the given element
     *
     * @param {E} element the element to wrap
     *
     * @return {Array<E>} an array of the given element
     *
     * @example
     * ArrayUtils.asArray('foobar');    // ['foobar']
     */
    public static asArray<E>(element?: E | null): E[] | undefined {
        return !element ? undefined : [element];
    }

    /**
     * Returns the first element of the given array
     *
     * @param {Array<E>} array the array to inspect
     *
     * @return {E} the first element of the given array
     *
     * @example
     * ArrayUtils.getFirst(['foo', 'bar']);    // 'foo'
     */
    public static getFirst<E>(array?: E[] | null): E | undefined {
        return (!array || array.length === 0) ? undefined : array[0];
    }

    /**
     * Returns the last element of the given array
     *
     * @param {Array<E>} array the array to inspect
     *
     * @return {E} the last element of the given array
     *
     * @example
     * ArrayUtils.getLast(['foo', 'bar']);    // 'bar'
     */
    public static getLast<E>(array?: E[] | null): E | undefined {
        return (!array || array.length === 0) ? undefined : array[array.length - 1];
    }

    /**
     * Returns the length of the given array
     *
     * @param {Array<any>} array the array to check
     *
     * @return {number} the length of the given array
     *
     * @example
     * ArrayUtils.getLength([]);    // 0
     * ArrayUtils.getLength(['foo', 'bar']);    // 2
     */
    public static getLength(array?: any[]): number {
        return array ? array.length : 0;
    }

    /**
     * Returns the element types of the given array
     *
     * @param {Array<any>} array the array to check
     *
     * @return {Array<string>} the element types of the given array
     *
     * @example
     * ArrayUtils.getTypeof(['foo', 'bar']);    // ['string', 'string']
     */
    public static getTypeof(array?: any[]): string[] | undefined {
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
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether the given array is empty
     *
     * @example
     * ArrayUtils.isEmpty([]);    // true
     */
    public static isEmpty(array?: any[]): boolean {
        return !array || array.length === 0;
    }

    /**
     * Returns whether the given array is not empty
     *
     * @param {Array<any>} array the array to check
     *
     * @return {boolean} whether the given array is not empty
     *
     * @example
     * ArrayUtils.isNotEmpty(['foo', 'bar']);    // true
     */
    public static isNotEmpty(array?: any[]): boolean {
        return !this.isEmpty(array);
    }

    /**
     * Returns whether each element in the given array is the expected type
     *
     * @param {Array<any>} array the array to check
     * @param {string} type the expected element type
     * @param {boolean} relaxed treat null as string or object
     *
     * @return {boolean} whether each element in the given array is the expected type
     *
     * @example
     * ArrayUtils.isTypeof(['foo', 'bar'], 'string');    // true
     * ArrayUtils.isTypeof(['foo', 'bar', null], 'string', true);    // true
     */
    public static isTypeof(array?: any[], type?: string, relaxed = false): boolean {
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
     * @param {Array<any>} array the array to check
     * @param {any} element the element to compare
     *
     * @return {boolean} whether the given array includes the given element
     *
     * @example
     * ArrayUtils.includes(['foo', 'bar'], 'foo');    // true
     */
    public static includes<E>(array?: E[] | null, element?: E | null): boolean {
        return !!array && !!element && array.includes(element);
    }

    /**
     * Returns the max length of the given arrays
     *
     * @param {Array<any>} arrays the arrays to check
     *
     * @return {number} the max length of the given arrays
     *
     * @example
     * ArrayUtils.maxLength(['foo', 'bar'], [1, 2, 3]);    // 3
     */
    public static maxLength(...arrays: any[][]): number {
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
     * @param {Array<any>} arrays the arrays to check
     *
     * @return {number} the min length of the given arrays
     *
     * @example
     * ArrayUtils.minLength(['foo', 'bar'], [1, 2, 3], []);    // 0
     */
    public static minLength(...arrays: any[][]): number {
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
     * Returns the array that excludes the given elements
     *
     * @param {Array<any>} array the arrays to inspect
     * @param {Array<any>} excludes the elements array to exclude
     *
     * @return the array that excludes the given elements
     *
     * @example
     * ArrayUtils.remove(['foo', 'bar'], ['bar']);    // ['foo']
     */
    public static remove<E>(array?: E[] | null, excludes?: E[] | null): E[] | undefined | null {
        return (!array || array.length === 0 || !excludes || excludes.length === 0) ? array : array.filter(item => !excludes.includes(item));
    }

    /**
     * Reverses the given array
     *
     * @param {Array<any>} array the arrays to inspect
     * @param {number} startInclusive the starting index, inclusive
     * @param {number} endExclusive the ending index, exclusive
     *
     * @example
     * ArrayUtils.reverse(['foo', 'bar']);    // ['bar', 'foo']
     */
    public static reverse(array?: any[], startInclusive?: number, endExclusive?: number): void {
        if (this.isEmpty(array)) {
            return;
        }
        let start = Math.max(startInclusive || 0, 0);
        let end = Math.min(endExclusive || this.getLength(array), this.getLength(array)) - 1;
        while (array && end > start) {
            const tmp = array[end];
            array[end] = array[start];
            array[start] = tmp;
            end--;
            start++;
        }
    }
}
