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
     * Returns the formatted string that represent the given date
     *
     * @param date the date to inspect
     * @param format the date/time format string
     * @return string the formatted string that represent the given date
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
     * @param format the date format string
     * @return string the current date
     */
    public static getCurrentDate(format = 'yyyy-MM-dd'): string {
        return <string>this.formatDateTime(new Date(), format);
    }

    /**
     * Returns the current date time
     *
     * @param format the date time format string
     * @return string the current date time
     */
    public static getCurrentDateTime(format = 'yyyy-MM-dd hh:mm:ss'): string {
        return <string>this.formatDateTime(new Date(), format);
    }

    /**
     * Returns the current time
     *
     * @param format the time format string
     * @return string the current time
     */
    public static getCurrentTime(format = 'hh:mm:ss'): string {
        return <string>this.formatDateTime(new Date(), format);
    }

    /**
     * Returns the timezone of the given date
     *
     * @param date the date to inspect
     * @returns the timezone of the given date
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
     * Returns whether the year is leap year
     *
     * @param year the year to check
     * @return boolean whether the year is leap year
     *
     * @example
     * TimeUtils.isLeapYear(2000);    // true
     */
    public static isLeapYear(year: number): boolean {
        return (!(year % 4) && !!(year % 100)) || !(year % 400);
    }
}
