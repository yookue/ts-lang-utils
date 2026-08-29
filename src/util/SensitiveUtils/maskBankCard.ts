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


import { BANK_CARD_REGEX } from '@/constant/regex-pattern';


/**
 * Returns a masked bank card number, which keeps the last 4 characters
 *
 * The card number follows ISO/IEC 7812, so cards issued outside China are supported as well.
 * Note that the Luhn checksum is not verified here, since not all issuers follow it
 *
 * @param text The text to mask
 *
 * @returns a masked bank card number, or undefined if the given text is invalid
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * maskBankCard(undefined);    // undefined
 * maskBankCard('6222021234567890123');    // '**** **** **** *** 0123'
 * maskBankCard('4111111111111111');    // '**** **** **** 1111'
 * maskBankCard('378282246310005');    // '**** **** *** 0005'
 * maskBankCard('62220212');    // undefined
 * ```
 */
export function maskBankCard(text?: string | null): string | undefined {
    if (!text || !BANK_CARD_REGEX.test(text)) {
        return undefined;
    }
    const groups: string[] = [];
    let remaining = text.length - 4;
    while (remaining > 0) {
        const size = Math.min(4, remaining);
        groups.push('*'.repeat(size));
        remaining -= size;
    }
    return groups.join(' ') + ' ' + text.substring(text.length - 4);
}
