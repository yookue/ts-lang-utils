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


import { SensitiveUtils } from '@unikue/ts-lang-utils';


describe('SensitiveUtils.test', () => {
    test('Testing maskBankCard', () => {
        expect(SensitiveUtils.maskBankCard(undefined)).toBeUndefined();
        expect(SensitiveUtils.maskBankCard('')).toBeUndefined();
        expect(SensitiveUtils.maskBankCard('6222021234567890123')).toBe('**** **** **** *** 0123');
        expect(SensitiveUtils.maskBankCard('4111111111111111')).toBe('**** **** **** 1111');
        expect(SensitiveUtils.maskBankCard('378282246310005')).toBe('**** **** *** 0005');
        expect(SensitiveUtils.maskBankCard('4222222222222')).toBe('**** **** * 2222');
        expect(SensitiveUtils.maskBankCard('62220212')).toBeUndefined();
        expect(SensitiveUtils.maskBankCard('62220212345678901234')).toBeUndefined();
        expect(SensitiveUtils.maskBankCard('622202123456789a')).toBeUndefined();
    });

    test('Testing maskChineseIdCard', () => {
        expect(SensitiveUtils.maskChineseIdCard(undefined)).toBeUndefined();
        expect(SensitiveUtils.maskChineseIdCard('')).toBeUndefined();
        expect(SensitiveUtils.maskChineseIdCard('11010519491231002X')).toBe('110***********002X');
        expect(SensitiveUtils.maskChineseIdCard('11010519491231002x')).toBe('110***********002x');
        expect(SensitiveUtils.maskChineseIdCard('110101199003070011')).toBe('110***********0011');
        expect(SensitiveUtils.maskChineseIdCard('11010519491231')).toBeUndefined();
        expect(SensitiveUtils.maskChineseIdCard('01010519491231002X')).toBeUndefined();
        expect(SensitiveUtils.maskChineseIdCard('11010519491331002X')).toBeUndefined();
    });

    test('Testing maskChineseMobile', () => {
        expect(SensitiveUtils.maskChineseMobile(undefined)).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('13812345678')).toBe('138****5678');
        expect(SensitiveUtils.maskChineseMobile('19912345678')).toBe('199****5678');
        expect(SensitiveUtils.maskChineseMobile('+8613812345678')).toBe('+86138****5678');
        expect(SensitiveUtils.maskChineseMobile('+86-13812345678')).toBe('+86-138****5678');
        expect(SensitiveUtils.maskChineseMobile('8613812345678')).toBe('86138****5678');
        expect(SensitiveUtils.maskChineseMobile('86-13812345678')).toBe('86-138****5678');
        expect(SensitiveUtils.maskChineseMobile('12345678901')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('12812345678')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('1381234567')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('138123456789')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('+8612812345678')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('0086-13812345678')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('+86 13812345678')).toBeUndefined();
        expect(SensitiveUtils.maskChineseMobile('+86--13812345678')).toBeUndefined();
    });

    test('Testing maskChineseName', () => {
        expect(SensitiveUtils.maskChineseName(undefined)).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('张三')).toBe('张*');
        expect(SensitiveUtils.maskChineseName('张三丰')).toBe('张**');
        expect(SensitiveUtils.maskChineseName('欧阳修')).toBe('欧阳*');
        expect(SensitiveUtils.maskChineseName('欧阳修文')).toBe('欧阳**');
        expect(SensitiveUtils.maskChineseName('司马相如')).toBe('司马**');
        expect(SensitiveUtils.maskChineseName('欧阳')).toBe('欧*');
        expect(SensitiveUtils.maskChineseName('张𠮷')).toBe('张*');
        expect(SensitiveUtils.maskChineseName('张㐀丰')).toBe('张**');
        expect(SensitiveUtils.maskChineseName('阿依古丽·买买提')).toBe('阿***·买**');
        expect(SensitiveUtils.maskChineseName('张三·李四')).toBe('张*·李*');
        expect(SensitiveUtils.maskChineseName('张')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('Tom')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('张三1')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('阿依古丽·')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('·买买提')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('张·三')).toBeUndefined();
        expect(SensitiveUtils.maskChineseName('张三··李四')).toBeUndefined();
    });

    test('Testing maskEmail', () => {
        expect(SensitiveUtils.maskEmail(undefined)).toBeUndefined();
        expect(SensitiveUtils.maskEmail('')).toBeUndefined();
        expect(SensitiveUtils.maskEmail('user@example.com')).toBe('u***@example.com');
        expect(SensitiveUtils.maskEmail('zhangsan@example.com')).toBe('z*******@example.com');
        expect(SensitiveUtils.maskEmail('u@example.com')).toBe('*@example.com');
        expect(SensitiveUtils.maskEmail('张三@example.中国')).toBe('张*@example.中国');
        expect(SensitiveUtils.maskEmail('invalid-email')).toBeUndefined();
        expect(SensitiveUtils.maskEmail('user@exa!mple.com')).toBeUndefined();
        expect(SensitiveUtils.maskEmail('user@example.com.')).toBeUndefined();
    });
});
