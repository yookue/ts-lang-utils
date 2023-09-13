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
}
