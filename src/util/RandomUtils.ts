/*
 * Copyright (c) 2023 Yookue Ltd. All rights reserved.
 *
 * Licensed under the MIT License (the "License")
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
 * Utilities for random
 *
 * @author David Hsing
 */
// noinspection JSUnusedGlobalSymbols
export abstract class RandomUtils {
    /**
     * Returns a random boolean value
     *
     * @returns the random boolean value
     *
     * @example
     * RandomUtils.randomBoolean();
     */
    public static randomBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    /**
     * Returns a random element of the array
     *
     * @param array the array to random
     *
     * @returns a random element of the array
     *
     * @example
     * RandomUtils.randomElement(['1', '2', '3']);
     */
    public static randomElement<E>(array?: E[]): E | undefined {
        return (!array || array.length === 0) ? undefined : array.at(this.randomInteger(0, array.length));
    }

    /**
     * Returns a random element array with the specified length within the given array
     *
     * @param array the array to random
     * @param size the size to generate
     *
     * @returns a random element array with the specified length within the given array
     *
     * @example
     * RandomUtils.randomElements(['1', '2', '3'], 2);
     */
    public static randomElements<E>(array?: E[], size?: number): E[] | undefined {
        if (!array || array.length === 0 || !size || size <= 0) {
            return undefined;
        }
        if (array.length <= size) {
            return array;
        }
        const indexes = new Set<number>();
        while (indexes.size < size) {
            indexes.add(this.randomInteger(0, array.length));
        }
        return array.filter((_value, index) => indexes.has(index));
    }

    /**
     * Returns a random integer that between the min value (inclusive) and the max value (exclusive)
     *
     * @param minInclusive the min value, inclusive
     * @param maxExclusive the max value, exclusive
     *
     * @returns a random integer that between the min value (inclusive) and the max value (exclusive)
     *
     * @example
     * RandomUtils.randomInteger(1, 10);
     * RandomUtils.randomInteger(-6, 8);
     */
    public static randomInteger(minInclusive?: number, maxExclusive?: number): number {
        return Math.floor(this.randomNumber(minInclusive, maxExclusive));
    }

    /**
     * Returns a random integer array that between the min value (inclusive) and the max value (exclusive), matching the given size
     *
     * @param size the size of the expected array
     * @param minInclusive the min value, inclusive
     * @param maxExclusive the max value, exclusive
     *
     * @returns a random integer array that between the min value (inclusive) and the max value (exclusive), matching the given size
     *
     * @example
     * RandomUtils.randomIntegers(3, 1, 10);
     * RandomUtils.randomIntegers(3, -6, 8);
     */
    public static randomIntegers(size?: number, minInclusive?: number, maxExclusive?: number): number[] | undefined {
        if (!size || size <= 0) {
            return undefined;
        }
        const result: number[] = [];
        for (let i = 0; i < size; i++) {
            result.push(this.randomInteger(minInclusive, maxExclusive));
        }
        return result;
    }

    /**
     * Returns a random number that between the min (inclusive) and the max value (exclusive)
     *
     * @param minInclusive the min value, inclusive
     * @param maxExclusive the max value, exclusive
     *
     * @returns a random number that between the min value (inclusive) and the max value (exclusive)
     *
     * @example
     * RandomUtils.randomNumber(1.1, 1.2);
     * RandomUtils.randomNumber(-3.6, 2.8);
     */
    public static randomNumber(minInclusive?: number, maxExclusive?: number): number {
        const min = minInclusive || 0;
        const max = maxExclusive || (Number.MAX_SAFE_INTEGER - 1);
        if (min > max) {
            throw SyntaxError('The min value must not be greater than max value');
        } else if (min === max) {
            return min;
        }
        return min + (max - min) * Math.random();
    }

    /**
     * Returns a random number array that between the min value (inclusive) and the max value (exclusive), matching the given size
     *
     * @param size the size of the expected array
     * @param minInclusive the min value, inclusive
     * @param maxExclusive the max value, exclusive
     *
     * @returns a random number array that between the min value (inclusive) and the max value (exclusive), matching the given size
     *
     * @example
     * RandomUtils.randomNumbers(3, 1.1, 1.2);
     * RandomUtils.randomNumbers(3, -3.6, 2.8);
     */
    public static randomNumbers(size?: number, minInclusive?: number, maxExclusive?: number): number[] | undefined {
        if (!size || size <= 0) {
            return undefined;
        }
        const result: number[] = [];
        for (let i = 0; i < size; i++) {
            result.push(this.randomNumber(minInclusive, maxExclusive));
        }
        return result;
    }

    /**
     * Returns a random string with the given length
     *
     * @param length the length of the expected string
     * @param characters the source characters to be generated from
     *
     * @returns a random string with the given length
     *
     * @example
     * RandomUtils.randomString(8);
     */
    public static randomString(length: number, characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'): string | undefined {
        if (!length || length <= 0 || characters.length === 0) {
            return undefined;
        }
        if (characters.length === 1) {
            return characters.repeat(length);
        }
        const source = StringUtils.toChars(characters) as string[];
        const result: string[] = [];
        for (let i = 0; i < length; i++) {
            result.push(this.randomElement(source) as string);
        }
        return StringUtils.fromChars(result);
    }
}
