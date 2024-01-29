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


import {StringUtils} from './StringUtils';


/**
 * Utility functions for array
 *
 * @abstract
 * @hideconstructor
 */
export abstract class ArrayUtils {
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
    public static getFirst<E>(array?: E[] | null) : E | undefined {
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
    public static getLast<E>(array?: E[] | null) : E | undefined {
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
    public static includes<T>(array?: T[] | null, element?: T | null): boolean {
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
