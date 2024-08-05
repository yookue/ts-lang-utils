/*
 * Copyright (c)  Yookue Ltd. All rights reserved.
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
 * Error for unsupported exceptions
 *
 * @author David Hsing
 */
export interface UnsupportedError extends Error {
}


/**
 * @ignore
 */
export interface UnsupportedErrorConstructor extends ErrorConstructor {
    new(message?: string): UnsupportedError;
    (message?: string): UnsupportedError;
    readonly prototype: UnsupportedError;
}


/**
 * @ignore
 */
export let UnsupportedError: UnsupportedErrorConstructor;
