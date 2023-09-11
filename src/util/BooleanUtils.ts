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
 * Utility functions for boolean
 *
 * @abstract
 * @hideconstructor
 */
export abstract class BooleanUtils {
    /**
     * Returns a boolean value from the string value, or undefined if the value cannot be converted
     *
     * @param value the string value to check
     * @returns boolean a boolean value from the string value, or undefined if the value cannot be converted
     *
     * @example
     * BooleanUtils.fromString('true');    // true
     * BooleanUtils.fromString('yes');    // true
     */
    public static fromString(value?: string) : boolean | undefined {
        if (StringUtils.equalsAnyIgnoreCase(value, ['true', 'yes', 'on', 'y', 't', '1'])) {
            return true;
        }
        if (StringUtils.equalsAnyIgnoreCase(value, ['false', 'no', 'off', 'n', 'f', '0'])) {
            return false;
        }
        return undefined;
    }

    /**
     * Returns a string value from the boolean value
     *
     * @param value the boolean value to check
     * @param truthy the string to represent true
     * @param falsy the string to represent false
     * @param nil the string to represent undefined or null
     * @returns string a string value from the boolean value
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
     * @param value the boolean value to check
     * @returns string the string value of 'true'/'false' from the boolean value
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
     * @param value the boolean value to check
     * @returns string the string value of 'on'/'off' from the boolean value
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
     * @param value the boolean value to check
     * @returns string the string value of 'yes'/'no' from the boolean value
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
     * @param value the boolean value to check
     * @returns string the string value of 'Y'/'N' from the boolean value
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
     * @param value the boolean value to check
     * @returns string the string value of 'T'/'F' from the boolean value
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
     * @param value the boolean value to check
     * @returns string the string value of '1'/'0' from the boolean value
     *
     * @example
     * BooleanUtils.toString10(true);    // '1'
     */
    public static toString10(value?: boolean): string | undefined {
        return this.toString(value, '1', '0', undefined);
    }
}
