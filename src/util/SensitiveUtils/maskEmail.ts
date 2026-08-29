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


import { EMAIL_REGEX } from '@/constant/regex-pattern';


/**
 * Returns a masked email address, which keeps the first character of the local part and the whole domain
 *
 * @param text The text to mask
 *
 * @returns a masked email address, or undefined if the given text is invalid
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * maskEmail(undefined);    // undefined
 * maskEmail('user@example.com');    // 'u***@example.com'
 * maskEmail('u@example.com');    // '*@example.com'
 * maskEmail('invalid-email');    // undefined
 * ```
 */
export function maskEmail(text?: string | null): string | undefined {
    if (!text || !EMAIL_REGEX.test(text)) {
        return undefined;
    }
    const atIndex = text.indexOf('@');
    const domain = text.substring(atIndex);
    const localPart = text.substring(0, atIndex);
    if (localPart.length <= 1) {
        return '*' + domain;
    }
    return localPart.charAt(0) + '*'.repeat(localPart.length - 1) + domain;
}
