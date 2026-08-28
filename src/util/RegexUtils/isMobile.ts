/*
 * Copyright (c) 2023 Unikue Ltd. All rights reserved.
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


import { compilePattern } from './compilePattern';


/** 中国手机号校验 */
export const CHINA_MOBILE_REGEX = /^1[3-9]\d{9}$/;


/**
 * Returns whether the given text is a valid mobile phone number
 *
 * @param text The text to check
 * @param pattern The regex or regex pattern for mobile phone numbers
 *
 * @returns whether the given text is a valid mobile phone number
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * isMobile(undefined);                                    // false
 * isMobile('13812345678');                                // true
 * isMobile('12345678901');                                // false
 * isMobile('2125551234', '^[2-9]\\d{2}[2-9]\\d{6}$');     // true, 美国
 * isMobile('2125551234', /^[2-9]\d{2}[2-9]\d{6}$/);       // true, 美国
 * isMobile('1125551234', /^[2-9]\d{2}[2-9]\d{6}$/);       // false, 区号不能以 1 开头
 * ```
 */
export function isMobile(text?: string | null, pattern: string | RegExp = CHINA_MOBILE_REGEX): boolean {
    if (!text) {
        return false;
    }
    if (typeof pattern === 'string') {
        const regex = compilePattern(pattern);
        return !!regex && regex.test(text);
    }
    return pattern.test(text);
}
