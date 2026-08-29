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


/** 校验位加权因子，对应 ISO 7064:1983 MOD 11-2 */
const CHECKSUM_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];


/** 校验位字符表，以加权和对 11 取模的结果为下标 */
const CHECKSUM_CODES = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];


/**
 * Returns whether the given text is a valid Chinese mainland ID card number
 *
 * @param text The text to check
 * @param checksum Whether to validate the checksum character, which is the 18th character
 *
 * @returns whether the given text is a valid Chinese mainland ID card number
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * isChineseIdCard(undefined);                              // false
 * isChineseIdCard('11010519491231002X');                   // true
 * isChineseIdCard('110105194912310021');                   // false, 校验位错误
 * isChineseIdCard('110105194912310021', false);            // true, 仅校验格式
 * isChineseIdCard('110101199002301234');                   // false, 日期不存在
 * ```
 */
export function isChineseIdCard(text?: string | null, checksum: boolean = true): boolean {
    if (!text || !CHINESE_ID_CARD_REGEX.test(text)) {
        return false;
    }
    const year = parseInt(text.substring(6, 10), 10);
    const month = parseInt(text.substring(10, 12), 10);
    const day = parseInt(text.substring(12, 14), 10);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return false;
    }
    if (!checksum) {
        return true;
    }
    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(text.charAt(i), 10) * CHECKSUM_WEIGHTS[i];
    }
    return CHECKSUM_CODES[sum % 11] === text.charAt(17).toUpperCase();
}
