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


import { CHINESE_NAME_REGEX } from '@/constant/regex-pattern';


/** 常见中文复姓，非穷尽列表，用于判断保留前 2 个字符还是前 1 个字符 */
export const CHINESE_COMPOUND_SURNAMES = [
    '欧阳', '上官', '司马', '诸葛', '东方', '慕容', '尉迟', '公孙',
    '夏侯', '长孙', '宇文', '司徒', '端木', '南宫', '皇甫', '令狐',
    '轩辕', '太史', '万俟', '闻人', '申屠', '宗政', '濮阳', '公冶',
    '太叔', '公羊', '赫连', '澹台', '拓跋', '呼延', '淳于', '单于',
];


/**
 * Returns a masked Chinese name, which keeps the surname only
 *
 * The surname is kept as 2 characters for the common compound surnames, otherwise 1 character.
 * For minority names separated by the middle dot, each segment is masked individually
 *
 * @param text The text to mask
 *
 * @returns a masked Chinese name, or undefined if the given text is invalid
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * maskChineseName(undefined);    // undefined
 * maskChineseName('张三');    // '张*'
 * maskChineseName('张三丰');    // '张**'
 * maskChineseName('欧阳修');    // '欧阳*'
 * maskChineseName('欧阳修文');    // '欧阳**'
 * maskChineseName('阿依古丽·买买提');    // '阿***·买**'
 * maskChineseName('Tom');    // undefined
 * ```
 */
export function maskChineseName(text?: string | null): string | undefined {
    if (!text || !CHINESE_NAME_REGEX.test(text)) {
        return undefined;
    }
    return text.split('·')
    .map((segment, index) => {
        // 按码点切分，避免扩展区生僻字（非 BMP，占两个 UTF-16 码元）被算成两个字符
        const chars = Array.from(segment);
        const keepLength = index === 0 && chars.length > 2 && CHINESE_COMPOUND_SURNAMES.includes(chars.slice(0, 2).join('')) ? 2 : 1;
        return chars.slice(0, keepLength).join('') + '*'.repeat(chars.length - keepLength);
    })
    .join('·');
}
