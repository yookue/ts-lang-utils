/*
 * Copyright (c) 2023 Unikue Ltd. All rights reserved.
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


/**
 * 银行卡号格式正则，卡号由 12 到 19 位数字组成，覆盖 ISO/IEC 7812 的位数区间
 *
 * 该标准为国际通用，因此中国境内外发行的银行卡均可匹配，不校验 Luhn 校验位与发卡行标识
 */
export const BANK_CARD_REGEX = /^\d{12,19}$/;


/**
 * 中国大陆身份证号格式正则（18 位）
 *
 * 仅校验格式，不含校验位与日期真实性，完整校验见 `RegexUtils.isChineseIdCard`
 */
export const CHINESE_ID_CARD_REGEX = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;


/**
 * 中国手机号格式正则（11 位），允许带 `+86` 或 `86` 国家码及单个可选连字符
 *
 * 支持 `13800138000`、`+8613800138000`、`+86-13800138000`、`8613800138000`、`86-13800138000`，
 * 不支持空格分隔、多个连字符以及 `0086` 国际拨号前缀
 */
export const CHINESE_MOBILE_REGEX = /^(?:\+?86-?)?1[3-9]\d{9}$/;


/**
 * 中文姓名格式正则，每段 2 到 20 个汉字，允许多段以间隔号 `·` 分隔
 *
 * 采用 `\p{Script=Han}` 以覆盖 CJK 基本区与扩展 A 到 G 区，含 `龦`、`㐀`、`𠮷` 等生僻字。
 * 间隔号用于维吾尔族、哈萨克族等少数民族姓名，如 `阿依古丽·买买提`。
 * 注意该属性也涵盖日文汉字，故 `山田太郎` 同样会被匹配
 */
export const CHINESE_NAME_REGEX = /^\p{Script=Han}{2,20}(?:·\p{Script=Han}{2,20})*$/u;


/**
 * 通用邮箱格式正则
 *
 * 本地部分保持宽松以支持国际化（如中文本地部分），域名部分按 `.` 逐段约束，
 * 可拦截连续点、结尾点、单字符 TLD 以及 `!#$%^&*` 等非法域名字符
 */
export const EMAIL_REGEX = /^[^\s@]+@[A-Za-z0-9\u00A0-\uFFFF-]+(?:\.[A-Za-z0-9\u00A0-\uFFFF-]+)*\.[A-Za-z\u00A0-\uFFFF]{2,}$/;
