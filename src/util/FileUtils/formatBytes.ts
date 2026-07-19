/*
 * Copyright (c) 2023 Unikue Ltd. All rights reserved.
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
 * Formats the given bytes into a human-readable file size string
 *
 * @param bytes - the number of bytes to format (base-1024)
 * @param precision - the number of decimal places to keep (defaults to 2)
 *
 * @returns the formatted size string, e.g. "1.5 KB" or "2.3 MB", or undefined if bytes is absent
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * formatBytes(0);               // "0 B"
 * formatBytes(512);             // "512 B"
 * formatBytes(1536);            // "1.5 KB"
 * formatBytes(1048576);         // "1 MB"
 * formatBytes(1610612736);      // "1.5 GB"
 * formatBytes(1649267441664);   // "1.5 TB"
 * formatBytes(-1);              // "0 B"
 * formatBytes(Infinity);        // "0 B"
 * formatBytes();                // undefined
 * formatBytes(undefined);       // undefined
 * formatBytes(null);            // undefined
 * ```
 */
export function formatBytes(bytes?: number | null, precision: number = 2): string | undefined {
    if (bytes === undefined || bytes === null) {
        return undefined;
    }
    if (bytes <= 0 || !Number.isFinite(bytes)) {
        return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    const base = 1024;
    let unitIndex = 0;
    let value = bytes;

    while (value >= base && unitIndex < units.length - 1) {
        value /= base;
        unitIndex++;
    }

    return `${parseFloat(value.toFixed(precision))} ${units[unitIndex]}`;
}
