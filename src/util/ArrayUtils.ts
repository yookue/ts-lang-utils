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
 * Utility functions for array
 *
 * @abstract
 * @hideconstructor
 */
export abstract class ArrayUtils {
    /**
     * Returns the length of the given array
     *
     * @param array the array to check
     * @return number the length of the given array
     */
    public static getLength(array?: Array<any>): number {
        return array ? array.length : 0;
    }

    /**
     * Returns the element types of the given array
     *
     * @param array the array to check
     * @return the element types of the given array
     */
    public static getTypeof(array?: Array<any>): string[] | undefined {
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
     * @return true if the given array is empty
     *
     * @example
     * ArrayUtils.isEmpty([]);    // true
     */
    public static isEmpty(array?: Array<any>): boolean {
        return !array || array.length === 0;
    }

    /**
     * Returns whether the given array is not empty
     *
     * @param array the array to check
     * @return true if the given array is not empty
     *
     * @example
     * ArrayUtils.isNotEmpty(['foo', 'bar']);    // true
     */
    public static isNotEmpty(array?: Array<any>): boolean {
        return !this.isEmpty(array);
    }

    /**
     * Returns whether each element in the given array is the expected type
     *
     * @param array the array to check
     * @param type the expected element type
     * @param relaxed treat null as string or object
     * @return true if each element in the given array is the expected type
     */
    public static isTypeof(array?: Array<any>, type?: string, relaxed = false): boolean {
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
     * @return true if the given array includes the given element
     *
     * @example
     * ArrayUtils.includes(['foo', 'bar'], 'foo');    // true
     */
    public static includes<T>(array?: Array<T>, element?: T) : boolean {
        // @ts-ignore
        return ObjectUtils.allNotNil(array, element) && array.includes(element);
    }

    /**
     * Returns the max length of the given arrays
     *
     * @param arrays the arrays to check
     * @return number the max length of the given arrays
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
     * @param arrays the arrays to check
     * @return number the min length of the given arrays
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
     * @param array the arrays to inspect
     * @param startInclusive the starting index, inclusive
     * @param endExclusive the ending index, exclusive
     *
     * @example
     * ArrayUtils.reverse(['foo', 'bar']);    // ['bar', 'foo']
     */
    public static reverse(array?: Array<any>, startInclusive?: number, endExclusive?: number): void {
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
