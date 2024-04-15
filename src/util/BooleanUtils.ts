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
 * Utilities for boolean
 *
 * @abstract
 * @hideconstructor
 */
export abstract class BooleanUtils {
    /**
     * Returns whether all the given elements are true
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether all the given elements are true
     *
     * @example
     * BooleanUtils.allTrue([null, undefined]);    // false
     * BooleanUtils.allTrue([null, true]);    // false
     * BooleanUtils.allTrue([true, true]);    // true
     */
    public static allTrue(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !!values && values.length > 0 && values.every(item => this.isTrue(item));
    }

    /**
     * Returns whether all the given elements are not true
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether all the given elements are not true
     *
     * @example
     * BooleanUtils.allNotTrue([null, undefined]);    // true
     * BooleanUtils.allNotTrue([null, true]);    // false
     * BooleanUtils.allNotTrue([null, false]);    // true
     */
    public static allNotTrue(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !values || values.length === 0 || values.every(item => this.isNotTrue(item));
    }

    /**
     * Returns whether all the given elements are false
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether all the given elements are false
     *
     * @example
     * BooleanUtils.allFalse([null, undefined]);    // false
     * BooleanUtils.allFalse([null, false]);    // false
     * BooleanUtils.allFalse([false, false]);    // true
     */
    public static allFalse(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !!values && values.length > 0 && values.every(item => this.isFalse(item));
    }

    /**
     * Returns whether all the given elements are not false
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether all the given elements are not false
     *
     * @example
     * BooleanUtils.allNotFalse([null, undefined]);    // true
     * BooleanUtils.allNotFalse([null, false]);    // false
     * BooleanUtils.allNotFalse([null, true]);    // true
     */
    public static allNotFalse(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !values || values.length === 0 || values.every(item => this.isNotFalse(item));
    }

    /**
     * Returns whether any of the given elements is true
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether any of the given elements is true
     *
     * @example
     * BooleanUtils.anyTrue([null, undefined]);    // false
     * BooleanUtils.anyTrue([null, true]);    // true
     * BooleanUtils.anyTrue([null, false]);    // false
     */
    public static anyTrue(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !!values && values.length > 0 && values.some(item => this.isTrue(item));
    }

    /**
     * Returns whether any of the given elements is not true
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether any of the given elements is not true
     *
     * @example
     * BooleanUtils.anyNotTrue([null, undefined]);    // true
     * BooleanUtils.anyNotTrue([null, true]);    // true
     * BooleanUtils.anyNotTrue([null, false]);    // true
     */
    public static anyNotTrue(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !values || values.length === 0 || values.some(item => this.isNotTrue(item));
    }

    /**
     * Returns whether any of the given elements is false
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether any of the given elements is false
     *
     * @example
     * BooleanUtils.anyFalse([null, undefined]);    // false
     * BooleanUtils.anyFalse([null, true]);    // false
     * BooleanUtils.anyFalse([null, false]);    // true
     */
    public static anyFalse(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !!values && values.length > 0 && values.some(item => this.isFalse(item));
    }

    /**
     * Returns whether any of the given elements is not false
     *
     * @param {Array<boolean | number | string>} values the elements to check
     *
     * @return {boolean} whether any of the given elements is not false
     *
     * @example
     * BooleanUtils.anyNotFalse([null, undefined]);    // true
     * BooleanUtils.anyNotFalse([null, false]);    // true
     * BooleanUtils.anyNotFalse([false, false]);    // false
     */
    public static anyNotFalse(values?: Array<boolean | number | string | undefined | null>): boolean {
        return !values || values.length === 0 || values.some(item => this.isNotFalse(item));
    }

    /**
     * Returns whether the given value can be converted to true
     *
     * @param {boolean | number | string | null} value the source value to check
     *
     * @return {boolean} whether the given value can be converted to true
     *
     * @example
     * BooleanUtils.isTrue(true);    // true
     * BooleanUtils.isTrue(1);    // true
     * BooleanUtils.isTrue('true');    // true
     * BooleanUtils.isTrue('yes');    // true
     */
    public static isTrue(value?: boolean | number | string | null): boolean {
        if (typeof value === 'boolean') {
            return (value as boolean);
        } else if (typeof value === 'number') {
            return (value as number) > 0;
        } else if (typeof value === 'string') {
            return StringUtils.equalsAnyIgnoreCase(value, ['true', 'yes', 'on', 'y', 't', '1']);
        }
        return false;
    }

    /**
     * Returns whether the given value is nil or can be converted to false
     *
     * @param {boolean | number | string | null} value the source value to check
     *
     * @return {boolean} whether the given value is nil or can be converted to false
     *
     * @example
     * BooleanUtils.isNotTrue(false);    // true
     * BooleanUtils.isNotTrue(undefined);    // true
     * BooleanUtils.isNotTrue(null);    // true
     * BooleanUtils.isNotTrue('no');    // true
     */
    public static isNotTrue(value?: boolean | number | string | null): boolean {
        if (value === undefined || value === null) {
            return true;
        } else if (typeof value === 'boolean') {
            return !(value as boolean);
        }
        return this.isFalse(value);
    }

    /**
     * Returns whether the given value can be converted to false
     *
     * @param {boolean | number | string | null} value the source value to check
     *
     * @return {boolean} whether the given value can be converted to false
     *
     * @example
     * BooleanUtils.isFalse(false);    // true
     * BooleanUtils.isFalse(0);    // true
     * BooleanUtils.isFalse('false');    // true
     * BooleanUtils.isFalse('no');    // true
     */
    public static isFalse(value?: boolean | number | string | null): boolean {
        if (typeof value === 'boolean') {
            return !(value as boolean);
        } else if (typeof value === 'number') {
            return (value as number) <= 0;
        } else if (typeof value === 'string') {
            return StringUtils.equalsAnyIgnoreCase(value, ['false', 'no', 'off', 'n', 'f', '0']);
        }
        return false;
    }

    /**
     * Returns whether the given value is nil or can be converted to true
     *
     * @param {boolean | number | string | null} value the source value to check
     *
     * @return {boolean} whether the given value is nil or can be converted to true
     *
     * @example
     * BooleanUtils.isNotFalse(true);    // true
     * BooleanUtils.isNotFalse(undefined);    // true
     * BooleanUtils.isNotFalse(null);    // true
     * BooleanUtils.isNotFalse('yes');    // true
     */
    public static isNotFalse(value?: boolean | number | string | null): boolean {
        if (value === undefined || value === null) {
            return true;
        } else if (typeof value === 'boolean') {
            return (value as boolean);
        }
        return this.isTrue(value);
    }

    /**
     * Returns a string value from the boolean value
     *
     * @param {boolean} value the boolean value to check
     * @param {string} truthy the string to represent true
     * @param {string} falsy the string to represent false
     * @param {string} nil the string to represent undefined or null
     *
     * @return {string} a string value from the boolean value
     *
     * @example
     * BooleanUtils.toString(undefined, 'true', 'false');    // 'true'
     */
    public static toString(value?: boolean, truthy?: string, falsy?: string, nil?: string): string | undefined {
        return ObjectUtils.isNil(value) ? nil : (value ? truthy : falsy);
    }

    /**
     * Returns a string value of 'true'/'false' from the boolean value
     *
     * @param {boolean} value the boolean value to check
     *
     * @return {string} the string value of 'true'/'false' from the boolean value
     *
     * @example
     * BooleanUtils.toStringTrueFalse(true);    // 'true'
     */
    public static toStringTrueFalse(value?: boolean): string | undefined {
        return this.toString(value, 'true', 'false', undefined);
    }

    /**
     * Returns a string value of 'on'/'off' from the boolean value
     *
     * @param {boolean} value the boolean value to check
     *
     * @return {string} the string value of 'on'/'off' from the boolean value
     *
     * @example
     * BooleanUtils.toStringOnOff(true);    // 'on'
     */
    public static toStringOnOff(value?: boolean): string | undefined {
        return this.toString(value, 'on', 'off', undefined);
    }

    /**
     * Returns a string value of 'yes'/'no' from the boolean value
     *
     * @param {boolean} value the boolean value to check
     *
     * @return {string} the string value of 'yes'/'no' from the boolean value
     *
     * @example
     * BooleanUtils.toStringYesNo(true);    // 'yes'
     */
    public static toStringYesNo(value?: boolean): string | undefined {
        return this.toString(value, 'yes', 'no', undefined);
    }

    /**
     * Returns a string value of 'Y'/'N' from the boolean value
     *
     * @param {boolean} value the boolean value to check
     *
     * @return {string} the string value of 'Y'/'N' from the boolean value
     *
     * @example
     * BooleanUtils.toStringYN(true);    // 'Y'
     */
    public static toStringYN(value?: boolean): string | undefined {
        return this.toString(value, 'Y', 'N', undefined);
    }

    /**
     * Returns a string value of 'T'/'F' from the boolean value
     *
     * @param {boolean} value the boolean value to check
     *
     * @return {string} the string value of 'T'/'F' from the boolean value
     *
     * @example
     * BooleanUtils.toStringTF(true);    // "T"
     */
    public static toStringTF(value?: boolean): string | undefined {
        return this.toString(value, 'T', 'F', undefined);
    }

    /**
     * Returns a string value of '1'/'0' from the boolean value
     *
     * @param {boolean} value the boolean value to check
     *
     * @return {string} the string value of '1'/'0' from the boolean value
     *
     * @example
     * BooleanUtils.toString10(true);    // '1'
     */
    public static toString10(value?: boolean): string | undefined {
        return this.toString(value, '1', '0', undefined);
    }
}
