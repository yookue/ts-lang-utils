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
 * Utility functions for thread
 *
 * @abstract
 * @hideconstructor
 */
export abstract class ThreadUtils {
    /**
     * Sleeps current thread for a specified amount of time
     *
     * @param microseconds the amount of time to sleep, in microseconds
     * @return Promise<void> a promise that could be resolved
     *
     * @example
     * TimeUtils.sleep();
     * TimeUtils.sleep().then(() => {});
     */
    public static sleep(microseconds = 1000): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, microseconds);
        });
    }
}
