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


/**
 * Utilities for number
 *
 * @author David Hsing
 * @hideconstructor
 */
// noinspection JSUnusedGlobalSymbols
export abstract class NumberUtils {
    /**
     * Returns whether the given value is an integer
     *
     * @param value the number value to check
     *
     * @returns whether the given value is an integer
     *
     * @example
     * NumberUtils.isInteger(1);    // true
     */
    public static isInteger(value?: number): boolean {
        if (!value) {
            return false;
        }
        return Math.floor(value) === Math.ceil(value);
    }

    /**
     * Returns an integer value from the string value, or undefined if the value cannot be converted
     *
     * @param value the string value to check
     *
     * @returns an integer value from the string value, or undefined if the value cannot be converted
     *
     * @example
     * NumberUtils.toInteger('1');    // 1
     */
    public static toInteger(value?: string): number | undefined {
        if (!value) {
            return undefined;
        }
        try {
            // @ts-ignore
            const result = Number.parseInt(value);
            return Number.isNaN(result) ? undefined : result;
        } catch (ignored) {
        }
        return undefined;
    }

    /**
     * Returns a float value from the string value, or undefined if the value cannot be converted
     *
     * @param value the string value to check
     *
     * @returns a float value from the string value, or undefined if the value cannot be converted
     *
     * @example
     * NumberUtils.toFloat('1.0');    // 1.0
     */
    public static toFloat(value?: string): number | undefined {
        if (!value) {
            return undefined;
        }
        try {
            const result = Number.parseFloat(value);
            return Number.isNaN(result) ? undefined : result;
        } catch (ignored) {
        }
        return undefined;
    }

    /**
     * Returns the max value of the given array
     *
     * @param values the array to calculate
     *
     * @returns the max value of the given array
     *
     * @example
     * NumberUtils.max([1, 2, 3]);    // 3
     */
    public static max(values?: number[]): number | undefined {
        if (!values || values.length === 0) {
            return undefined;
        }
        let result = values[0];
        for (let i = 1; i < values.length; i++) {
            if (result < values[i]) {
                result = values[i];
            }
        }
        return result;
    }

    /**
     * Returns the min value of the given array
     *
     * @param values the array to calculate
     *
     * @returns the min value of the given array
     *
     * @example
     * NumberUtils.min([1, 2, 3]);    // 1
     */
    public static min(values?: number[]): number | undefined {
        if (!values || values.length === 0) {
            return undefined;
        }
        let result = values[0];
        for (let i = 1; i < values.length; i++) {
            if (result > values[i]) {
                result = values[i];
            }
        }
        return result;
    }

    /**
     * Returns the sum value of the given array
     *
     * @param values the array to calculate
     *
     * @returns the sum value of the given array
     *
     * @example
     * NumberUtils.sum([1, 2, 3]);    // 6
     */
    public static sum(values?: number[]): number | undefined {
        return !values ? undefined : values.reduce((a, b) => a + b);
    }

    /**
     * Returns the average value of the given array
     *
     * @param values the array to calculate
     *
     * @returns the average value of the given array
     *
     * @example
     * NumberUtils.average([1, 2, 3]);    // 2
     */
    public static average(values?: number[]): number | undefined {
        return !values ? undefined : (this.sum(values) as number / values.length);
    }
}
