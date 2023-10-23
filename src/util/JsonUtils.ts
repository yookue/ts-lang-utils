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


import {ObjectUtils} from './ObjectUtils';
import {StringUtils} from './StringUtils';


/**
 * Utility functions for json
 *
 * @abstract
 * @hideconstructor
 */
export abstract class JsonUtils {
    /**
     * Returns whether the given string is a JSON string
     *
     * @param {string} text the string to check
     * @return {boolean} whether the given object is a JSON string
     *
     * @example
     * JsonUtils.isJsonString(`{"foo": "bar"}`);    // true
     * JsonUtils.isJsonString(`[{"foo": "bar"}]`);    // true
     * JsonUtils.isJsonString(`[{"foo": "bar"}, {"hello": "world"}]`);    // true
     */
    public static isJsonString(text: string): boolean {
        if (StringUtils.isBlank(text)) {
            return false;
        }
        try {
            if (typeof JSON.parse(text) === 'object') {
                return true;
            }
        } catch(ex) {
        }
        return false;
    }

    /**
     * Returns a JSON string that represents the given object
     *
     * @param {any} object the object to inspect
     * @return {string} a JSON string that represents the given object
     *
     * @example
     * JsonUtils.toJsonString({foo: 'bar'});    // `{"foo":"bar"}`
     */
    public static toJsonString(object: any): string | undefined {
        if (typeof object === 'string' && (object as string).length > 0) {
            try {
                const json = JSON.parse(object as string);
                if (typeof json === 'object') {
                    return JSON.stringify(json);
                }
            } catch(ex) {
            }
        }
        if (ObjectUtils.isPlainObject(object)) {
            return JSON.stringify(object);
        }
        return undefined;
    }
}
