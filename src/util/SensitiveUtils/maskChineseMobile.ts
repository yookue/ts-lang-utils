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


import { CHINESE_MOBILE_REGEX } from '@/constant/regex-pattern';


/**
 * Returns a masked Chinese mobile phone number, which keeps the first 3 and last 4 characters
 *
 * The `+86` or `86` country code prefix is kept as-is if present in the given text
 *
 * @param text The text to mask
 *
 * @returns a masked Chinese mobile phone number, or undefined if the given text is invalid
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * maskChineseMobile(undefined);    // undefined
 * maskChineseMobile('13812345678');    // '138****5678'
 * maskChineseMobile('+8613812345678');    // '+86138****5678'
 * maskChineseMobile('+86-13812345678');    // '+86-138****5678'
 * maskChineseMobile('8613812345678');    // '86138****5678'
 * maskChineseMobile('12345678901');    // undefined
 * ```
 */
export function maskChineseMobile(text?: string | null): string | undefined {
    if (!text || !CHINESE_MOBILE_REGEX.test(text)) {
        return undefined;
    }
    const offset = text.length - 11;
    return text.substring(0, offset + 3) + '****' + text.substring(offset + 7);
}
