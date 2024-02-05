/*
 * Copyright (c) 2023 Yookue Ltd. All rights reserved.
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


import {StringUtils} from './StringUtils';


/**
 * Utility functions for date and time
 *
 * @abstract
 * @hideconstructor
 */
export abstract class DateUtils {
    /**
     * Returns the year calculated date with the source date and the specified amount
     *
     * @param {Date} date the date to inspect
     * @param {number} amount the amount to add, negative number means minus
     *
     * @return {Date} the year calculated date with the source date and the specified amount
     *
     * @example
     * DateUtils.addYear(new Date(2023, 8, 30), 1);    // Date(2024, 8, 30)
     */
    public static addYear(date: Date, amount: number): Date {
        if (!amount) {
            return date;
        }
        const result = new Date(date);
        result.setFullYear(date.getFullYear() + amount);
        return result;
    }

    /**
     * Returns the month calculated date with the source date and the specified amount
     *
     * @param {Date} date the date to inspect
     * @param {number} amount the amount to add, negative number means minus
     *
     * @return {Date} the month calculated date with the source date and the specified amount
     *
     * @example
     * DateUtils.addMonth(new Date(2023, 8, 30), 1);    // Date(2023, 9, 30)
     */
    public static addMonth(date: Date, amount: number): Date {
        if (!amount) {
            return date;
        }
        const result = new Date(date);
        result.setMonth(date.getMonth() + amount);
        return result;
    }

    /**
     * Returns the day calculated date with the source date and the specified amount
     *
     * @param {Date} date the date to inspect
     * @param {number} amount the amount to add, negative number means minus
     *
     * @return {Date} the day calculated date with the source date and the specified amount
     *
     * @example
     * DateUtils.addDay(new Date(2023, 8, 30), 1);    // Date(2023, 9, 1)
     */
    public static addDay(date: Date, amount: number): Date {
        if (!amount) {
            return date;
        }
        const result = new Date(date);
        result.setDate(date.getDate() + amount);
        return result;
    }

    /**
     * Returns the formatted string that represent the given date
     *
     * @param {Date} date the date to inspect
     * @param {string} format the date/time format string
     *
     * @return {string} the formatted string that represent the given date
     */
    public static formatDateTime(date: Date, format: string): string | undefined {
        if (StringUtils.isBlank(format)) {
            return undefined;
        }
        const entries: {[key: string]: number} = {
            'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': (date.getHours() % 12 == 0) ? 12 : date.getHours() % 12,
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds(),
        };
        let result = format;
        for (const entry in entries) {
            const array = new RegExp(`(${entry})`).exec(result);
            if (array) {
                if (/(y+)/.test(entry)) {
                    result = result.replace(array[1], entries[entry].toString().substring(4 - array[1].length))
                } else {
                    result = result.replace(array[1], (array[1].length === 1) ? (entries[entry].toString()) : (entries[entry].toString().padStart(array[1].length, '0')))
                }
            }
        }
        return result;
    }

    /**
     * Returns the current date
     *
     * @param {string} format the date format string
     *
     * @return {string} the current date
     */
    public static getCurrentDate(format = 'yyyy-MM-dd'): string {
        return this.formatDateTime(new Date(), format) as string;
    }

    /**
     * Returns the current date time
     *
     * @param {string} format the date time format string
     *
     * @return {string} the current date time
     */
    public static getCurrentDateTime(format = 'yyyy-MM-dd hh:mm:ss'): string {
        return this.formatDateTime(new Date(), format) as string;
    }

    /**
     * Returns the current time
     *
     * @param {string} format the time format string
     *
     * @return {string} the current time
     */
    public static getCurrentTime(format = 'hh:mm:ss'): string {
        return this.formatDateTime(new Date(), format) as string;
    }

    /**
     * Returns the start year date of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {Date} the start year date of the given date
     *
     * @example
     * DateUtils.getStartOfYear(new Date(2023, 8, 30));    // Date(2023, 0, 1, 0, 0, 0)
     */
    public static getStartOfYear(date: Date): Date {
        const result = new Date(date);
        result.setFullYear(date.getFullYear(), 0, 1);
        result.setHours(0, 0, 0, 0);
        return result;
    }

    /**
     * Returns the start month date of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {Date} the start month date of the given date
     *
     * @example
     * DateUtils.getStartOfMonth(new Date(2023, 8, 30));    // Date(2023, 8, 1, 0, 0, 0)
     */
    public static getStartOfMonth(date: Date): Date {
        const result = new Date(date);
        result.setDate(1);
        result.setHours(0, 0, 0, 0);
        return result;
    }

    /**
     * Returns the start day date of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {Date} the start day date of the given date
     *
     * @example
     * DateUtils.getStartOfDay(new Date(2023, 8, 30, 12, 12, 12));    // Date(2023, 8, 30, 0, 0, 0)
     */
    public static getStartOfDay(date: Date): Date {
        const result = new Date(date);
        result.setHours(0, 0, 0, 0);
        return result;
    }

    /**
     * Returns the end year date of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {Date} the end year date of the given date
     *
     * @example
     * DateUtils.getEndOfYear(new Date(2023, 8, 30));    // Date(2023, 11, 31, 23, 59, 59)
     */
    public static getEndOfYear(date: Date): Date {
        const result = new Date(date);
        result.setFullYear(date.getFullYear() + 1, 0, 0);
        result.setHours(23, 59, 59, 999);
        return result;
    }

    /**
     * Returns the end month date of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {Date} the end month date of the given date
     *
     * @example
     * DateUtils.getEndOfMonth(new Date(2023, 8, 1));    // Date(2023, 8, 30, 23, 59, 59)
     */
    public static getEndOfMonth(date: Date): Date {
        const result = new Date(date);
        result.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
        result.setHours(23, 59, 59, 999);
        return result;
    }

    /**
     * Returns the end day date of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {Date} the end day date of the given date
     *
     * @example
     * DateUtils.getEndOfDay(new Date(2023, 8, 30, 12, 12, 12));    // Date(2023, 8, 30, 23, 59, 59)
     */
    public static getEndOfDay(date: Date): Date {
        const result = new Date(date);
        result.setHours(23, 59, 59, 999);
        return result;
    }

    /**
     * Returns the timezone of the given date
     *
     * @param {Date} date the date to inspect
     *
     * @return {string} the timezone of the given date
     */
    public static getTimezone(date = new Date()) {
        const offset = date.getTimezoneOffset();
        const absOffset = Math.abs(offset);
        const hours = Math.floor(absOffset / 60);
        const minutes = absOffset % 60;
        const minutesOut = minutes > 0 ? ':' + ('0' + minutes).slice(-2) : '';
        return (offset < 0 ? '+' : '-') + hours + minutesOut;
    }

    /**
     * Returns whether the given date is the first day of month
     *
     * @param {Date} date the date to check
     *
     * @return {boolean} whether the date is the first day of month
     *
     * @example
     * DateUtils.isFirstDayOfMonth(new Date(2023, 8, 1));    // true
     * DateUtils.isFirstDayOfMonth(new Date(2023, 8, 30));    // false
     */
    public static isFirstDayOfMonth(date: Date): boolean {
        return date.getDate() === 1;
    }

    /**
     * Returns whether the given date is the last day of month
     *
     * @param {Date} date the date to check
     *
     * @return {boolean} whether the date is the last day of month
     *
     * @example
     * DateUtils.isLastDayOfMonth(new Date(2023, 8, 1));    // false
     * DateUtils.isLastDayOfMonth(new Date(2023, 8, 30));    // true
     */
    public static isLastDayOfMonth(date: Date): boolean {
        return this.isSameDay(this.getEndOfDay(date), this.getEndOfMonth(date));
    }

    /**
     * Returns whether the date or year is a leap year
     *
     * @param {Date | number} dateYear the date or year to check
     *
     * @return {boolean} whether the date or year is a leap year
     *
     * @example
     * DateUtils.isLeapYear(2000);    // true
     * DateUtils.isLeapYear(new Date(2000, 0, 1));    // true
     */
    public static isLeapYear(dateYear: Date | number): boolean {
        const year = (dateYear instanceof Date) ? dateYear.getFullYear() : dateYear;
        return (!(year % 4) && !!(year % 100)) || !(year % 400);
    }

    /**
     * Returns whether the given date is same year with the comparison date
     *
     * @param {Date} date the date to check
     * @param {Date} comparison the date to compare
     *
     * @return {boolean} whether the given date is same year with the comparison date
     *
     * @example
     * DateUtils.isSameYear(new Date(2023, 1, 1), new Date(2023, 8, 30));    // true
     */
    public static isSameYear(date: Date, comparison: Date): boolean {
        return date.getFullYear() === comparison.getFullYear();
    }

    /**
     * Returns whether the given date is same month with the comparison date
     *
     * @param {Date} date the date to check
     * @param {Date} comparison the date to compare
     * @param {boolean} deepCompare whether compare deeply with year
     *
     * @return {boolean} whether the given date is same month with the comparison date
     *
     * @example
     * DateUtils.isSameMonth(new Date(2023, 8, 1), new Date(2023, 8, 30));    // true
     */
    public static isSameMonth(date: Date, comparison: Date, deepCompare = true): boolean {
        return date.getMonth() === comparison.getMonth() && (deepCompare ? date.getFullYear() === comparison.getFullYear() : true);
    }

    /**
     * Returns whether the given date is same day with the comparison date
     *
     * @param {Date} date the date to check
     * @param {Date} comparison the date to compare
     * @param {boolean} deepCompare whether compare deeply with year
     *
     * @return {boolean} whether the given date is same day with the comparison date
     *
     * @example
     * DateUtils.isSameDay(new Date(), new Date());    // true
     */
    public static isSameDay(date: Date, comparison: Date, deepCompare = true): boolean {
        return date.getDate() === comparison.getDate() && (deepCompare ? (date.getFullYear() === comparison.getFullYear() && date.getMonth() === comparison.getMonth()) : true);
    }

    /**
     * Returns whether the date is a weekend
     *
     * @param {Date} date the date to check
     *
     * @return {boolean} whether the date is a weekend
     *
     * @example
     * DateUtils.isWeekend(new Date(2023, 8, 30));    // true
     */
    public static isWeekend(date: Date): boolean {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    /**
     * Returns whether the date is yesterday
     *
     * @param {Date} date the date to check
     *
     * @return {boolean} whether the date is yesterday
     */
    public static isYesterday(date: Date): boolean {
        return this.isSameDay(new Date(), this.addDay(date, 1));
    }

    /**
     * Returns whether the date is tomorrow
     *
     * @param {Date} date the date to check
     *
     * @return {boolean} whether the date is tomorrow
     */
    public static isTomorrow(date: Date): boolean {
        return this.isSameDay(new Date(), this.addDay(date, -1));
    }
}
