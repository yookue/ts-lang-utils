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


/**
 * Utilities for regular expression
 *
 * @author David Hsing
 */
export abstract class RegexUtils {
    /**
     * Construct an instance of this class
     *
     * @ignore
     */
    private constructor() {
    }

    /**
     * Returns the array of strings that match the given pattern in the text
     *
     * @param text the text on inspect
     * @param search the string or regular expression to match
     *
     * @return the array of strings that match the given pattern in the text
     *
     * @example
     * RegexUtils.extractWords('foo, & bar');    // ['foo', 'bar']
     */
    public static extractWords(text?: string | null, search: string | RegExp = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g): string[] | undefined {
        return !text ? undefined : (text.match(search) || undefined);
    }
}
