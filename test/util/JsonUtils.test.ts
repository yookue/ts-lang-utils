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


import {JsonUtils} from '@yookue/ts-lang-utils';


describe('JsonUtils', () => {
    test('Testing isJsonString', () => {
        expect(JsonUtils.isJsonString('foobar')).toBeFalsy();
        expect(JsonUtils.isJsonString(`{"foo": "bar"}`)).toBeTruthy();
        expect(JsonUtils.isJsonString(`[{"foo": "bar"}]`)).toBeTruthy();
        expect(JsonUtils.isJsonString(`[{"foo": "bar"}, {"hello": "world"}]`)).toBeTruthy();
    });

    test('Testing toJsonString', () => {
        expect(JsonUtils.toJsonString(undefined)).toBe(undefined);
        expect(JsonUtils.toJsonString(null)).toBe(undefined);
        expect(JsonUtils.toJsonString('foobar')).toBe(undefined);
        expect(JsonUtils.toJsonString(`{"foo": "bar"}`)).toBe(`{"foo":"bar"}`);
        expect(JsonUtils.toJsonString({foo: 'bar'})).toBe(`{"foo":"bar"}`);
    });
});
