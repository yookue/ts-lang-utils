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
        return (!array || array.length === 0) ? undefined : array.at(this.randomInteger(0, array.length) as number);
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
        if (!array || array.length === 0 || !size || size <= 0 || size > Number.MAX_SAFE_INTEGER) {
            return undefined;
        }
        if (array.length <= size) {
            return array;
        }
        const indexes = new Set<number>();
        while (indexes.size < size) {
            indexes.add(this.randomInteger(0, array.length) as number);
        }
        return array.filter((_value, index) => indexes.has(index));
    }

    /**
     * Returns a random integer that between value range
     *
     * @param minValue the min value, inclusive
     * @param maxValue the max value, exclusive
     *
     * @returns a random integer that between value range
     *
     * @example
     * RandomUtils.randomInteger(1, 10);
     * RandomUtils.randomInteger(-6, 8);
     */
    public static randomInteger(minValue?: number, maxValue?: number): number | undefined {
        const value = this.randomNumber(minValue, maxValue);
        return !value ? undefined : Math.floor(value);
    }

    /**
     * Returns a random integer array that between value range, matching the given size
     *
     * @param size the size of the expected array
     * @param minValue the min value, inclusive
     * @param maxValue the max value, exclusive
     *
     * @returns a random integer array that between value range, matching the given size
     *
     * @example
     * RandomUtils.randomIntegers(3, 1, 10);
     * RandomUtils.randomIntegers(3, -6, 8);
     */
    public static randomIntegers(size?: number, minValue?: number, maxValue?: number): number[] | undefined {
        if (!size || size <= 0 || size > Number.MAX_SAFE_INTEGER) {
            return undefined;
        }
        const result: number[] = [];
        for (let i = 0; i < size; i++) {
            const value = this.randomInteger(minValue, maxValue);
            if (!value) {
                break;
            }
            result.push(value);
        }
        return result;
    }

    /**
     * Returns a random number that between the value range
     *
     * @param minValue the min value, inclusive
     * @param maxValue the max value, exclusive
     *
     * @returns a random number that between the value range
     *
     * @example
     * RandomUtils.randomNumber(1.1, 1.2);
     * RandomUtils.randomNumber(-3.6, 2.8);
     * RandomUtils.randomNumber(-3.6, -2.8);
     */
    public static randomNumber(minValue?: number, maxValue?: number): number | undefined {
        const min = (minValue !== undefined) ? minValue : Number.MIN_SAFE_INTEGER;
        const max = (maxValue !== undefined) ? maxValue : Number.MAX_SAFE_INTEGER;
        return (min > max) ? undefined : (min + (max - min) * Math.random());
    }

    /**
     * Returns a random number array that between the value range, matching the given size
     *
     * @param size the size of the expected array
     * @param minValue the min value, inclusive
     * @param maxValue the max value, exclusive
     *
     * @returns a random number array that between value range, matching the given size
     *
     * @example
     * RandomUtils.randomNumbers(3, 1.1, 1.2);
     * RandomUtils.randomNumbers(3, -3.6, 2.8);
     */
    public static randomNumbers(size?: number, minValue?: number, maxValue?: number): number[] | undefined {
        if (!size || size <= 0 || size > Number.MAX_SAFE_INTEGER) {
            return undefined;
        }
        const result: number[] = [];
        for (let i = 0; i < size; i++) {
            const value = this.randomNumber(minValue, maxValue);
            if (!value) {
                break;
            }
            result.push(value);
        }
        return result;
    }

    /**
     * Returns a random string that between the length range
     *
     * @param minLength the min length, inclusive
     * @param maxLength the max length, exclusive
     * @param characters the source characters to be generated from
     *
     * @returns a random string that between the length range
     *
     * @example
     * RandomUtils.randomString(8);
     */
    public static randomString(minLength?: number, maxLength?: number, characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'): string | undefined {
        if (!minLength || minLength <= 0 || (maxLength && maxLength < minLength) || characters.length === 0) {
            return undefined;
        }
        if (maxLength === undefined && characters.length === 1) {
            return characters.repeat(minLength);
        }
        const result: string[] = [];
        const length = (maxLength === undefined) ? minLength : this.randomInteger(minLength, maxLength) as number;
        const source = StringUtils.toChars(characters) as string[];
        for (let i = 0; i < length; i++) {
            result.push(this.randomElement(source) as string);
        }
        return StringUtils.fromChars(result);
    }

    /**
     * Returns a random string array that between the length range, matching the given size
     *
     * @param size the size of the expected array
     * @param minLength the min length, inclusive
     * @param maxLength the max length, exclusive
     * @param characters the source characters to be generated from
     *
     * @returns a random string array that between the length range, matching the given size
     *
     * @example
     * RandomUtils.randomStrings(3, 6, 10);
     */
    public static randomStrings(size?: number, minLength?: number, maxLength?: number, characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'): string[] | undefined {
        if (!size || size <= 0 || size > Number.MAX_SAFE_INTEGER || !minLength || minLength <= 0) {
            return undefined;
        }
        const result: string[] = [];
        for (let i = 0; i < size; i++) {
            const value = this.randomString(minLength, maxLength, characters);
            if (!value) {
                break;
            }
            result.push(value);
        }
        return result;
    }
}
