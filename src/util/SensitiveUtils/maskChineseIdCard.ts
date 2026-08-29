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


import { CHINESE_ID_CARD_REGEX } from '@/constant/regex-pattern';


/**
 * Returns a masked Chinese ID card number, which keeps the first 3 and last 4 characters
 *
 * Note that only the format is verified, the checksum character is not validated here,
 * so that malformed data stored in the database can still be masked
 *
 * @param text The text to mask
 *
 * @returns a masked Chinese ID card number, or undefined if the given text is invalid
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * maskChineseIdCard(undefined);    // undefined
 * maskChineseIdCard('11010519491231002X');    // '110***********002X'
 * maskChineseIdCard('11010519491231');    // undefined
 * ```
 */
export function maskChineseIdCard(text?: string | null): string | undefined {
    if (!text || !CHINESE_ID_CARD_REGEX.test(text)) {
        return undefined;
    }
    return text.substring(0, 3) + '*'.repeat(text.length - 7) + text.substring(text.length - 4);
}
