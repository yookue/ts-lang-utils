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


import {ArrayUtils} from './ArrayUtils';


/**
 * Utility functions for random
 *
 * @abstract
 * @hideconstructor
 */
export abstract class RandomUtils {
    /**
     * Returns a random boolean value
     *
     * @return boolean the random boolean value
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
     * @return any a random element of the array
     *
     * @example
     * RandomUtils.randomElement(['1', '2', '3']);
     */
    public static randomElement(array: Array<any>): any {
        return ArrayUtils.isNotEmpty(array) ? array.at(this.randomInteger(0, array.length)) : undefined;
    }

    /**
     * Returns a random integer that between the min value (inclusive) and the max value (exclusive)
     *
     * @param minInclusive the min value, inclusive
     * @param maxExclusive the max value, exclusive
     * @return number the random integer that between the min value (inclusive) and the max value (exclusive)
     *
     * @example
     * RandomUtils.randomInteger(1, 10);
     * RandomUtils.randomInteger(-6, 8);
     */
    public static randomInteger(minInclusive?: number, maxExclusive?: number): number {
        return Math.floor(this.randomNumber(minInclusive, maxExclusive));
    }

    /**
     * Returns a random number that between the min (inclusive) and the max value (exclusive)
     *
     * @param minInclusive the min value, inclusive
     * @param maxExclusive the max value, exclusive
     * @return number the random number that between the min value (inclusive) and the max value (exclusive)
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
}
