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


import {DateUtils} from '@yookue/ts-lang-utils';


describe('DateUtils', () => {
    test('Testing addYear', () => {
        expect(DateUtils.addYear(new Date(2023, 8, 30), 1).getFullYear()).toBe(2024);
    });

    test('Testing addMonth', () => {
        expect(DateUtils.addMonth(new Date(2023, 8, 30), 1).getMonth()).toBe(9);    // Starts with index 0
    });

    test('Testing addDay', () => {
        const result = DateUtils.addDay(new Date(2023, 8, 30), 1);
        expect(result.getMonth()).toBe(9);    // Starts with index 0
        expect(result.getDate()).toBe(1);
    });

    test('Testing getCurrentDate', () => {
        expect(DateUtils.getCurrentDate()).toBeDefined();
    });

    test('Testing getTimezone', () => {
        expect(DateUtils.getTimezone()).toBe('+8');
    });

    test('Testing isFirstDayOfMonth', () => {
        expect(DateUtils.isFirstDayOfMonth(new Date(2023, 8, 1))).toBeTruthy();
        expect(DateUtils.isFirstDayOfMonth(new Date(2023, 8, 30))).toBeFalsy();
    });

    test('Testing isLastDayOfMonth', () => {
        expect(DateUtils.isLastDayOfMonth(new Date(2023, 8, 1))).toBeFalsy();
        expect(DateUtils.isLastDayOfMonth(new Date(2023, 8, 30))).toBeTruthy();
    });

    test('Testing isLeapYear', () => {
        expect(DateUtils.isLeapYear(2000)).toBeTruthy();
        expect(DateUtils.isLeapYear(new Date(2020, 0, 1))).toBeTruthy();
    });

    test('Testing isSameYear', () => {
        expect(DateUtils.isSameYear(new Date(2020, 0, 1), new Date(2020, 11, 31))).toBeTruthy();
    });

    test('Testing isSameMonth', () => {
        expect(DateUtils.isSameMonth(new Date(2023, 8, 1), new Date(2023, 8, 30))).toBeTruthy();
    });

    test('Testing isSameDay', () => {
        expect(DateUtils.isSameDay(new Date(2023, 8, 30), new Date(2023, 8, 30))).toBeTruthy();
    });

    test('Testing isWeekend', () => {
        expect(DateUtils.isWeekend(new Date(2023, 8, 30))).toBeTruthy();
    });
});
