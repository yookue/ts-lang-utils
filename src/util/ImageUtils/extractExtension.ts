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


import { isHttp } from '@/util/UriUtils';
import { isHttps } from '@/util/UriUtils';


const DEFAULT_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.heic', '.heif', '.svg'];


/**
 * Extracts the file extension from an image source (URL or local file path) and returns it if allowed, otherwise returns the fallback
 *
 * @param imageSource The image URL or local file path to extract the extension from
 * @param allowedExtensions The list of allowed extensions (with leading dot, e.g. ['.jpg', '.png']).
 *                          Defaults to ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.heic', '.heif']
 * @param fallback The fallback extension with leading dot (defaults to '.jpg')
 *
 * @returns the extracted extension if allowed, otherwise the fallback extension
 *
 * @author David Hsing
 *
 * @example
 * ```ts
 * extractExtension('https://example.com/image.png');    // '.png'
 * extractExtension('http://example.com/image.webp?size=200');   // '.webp'
 * extractExtension('/vol/images/photo.svg');   // '.jpg' (svg not in default allowed list)
 * extractExtension('image.svg', ['.jpg', '.png', '.svg']);    // '.svg'
 * ```
 */
export function extractExtension(imageSource?: string | null, allowedExtensions: Array<string | null | undefined> = DEFAULT_EXTENSIONS, fallback: string = '.jpg'): string {
    if (!imageSource) {
        return fallback;
    }
    // For HTTP/HTTPS URLs, strip query string and fragment before extracting extension,
    // otherwise lastIndexOf('.') may match dots in query params (e.g. ?v=1.0)
    // For local file paths, the path is already clean
    let pathOnly = imageSource;
    if (isHttp(imageSource) || isHttps(imageSource)) {
        const qIndex = pathOnly.indexOf('?');
        const hIndex = pathOnly.indexOf('#');
        let cutoff = pathOnly.length;
        if (qIndex !== -1) {
            cutoff = Math.min(cutoff, qIndex);
        }
        if (hIndex !== -1) {
            cutoff = Math.min(cutoff, hIndex);
        }
        pathOnly = pathOnly.substring(0, cutoff);
    }

    const lastDot = pathOnly.lastIndexOf('.');
    if (lastDot === -1) {
        return fallback;
    }
    const ext = pathOnly.substring(lastDot).toLowerCase();
    // Ignore trailing dot with no extension (e.g. "image.")
    if (ext === '.') {
        return fallback;
    }
    if (allowedExtensions && allowedExtensions.length) {
        const lowerExtensions = allowedExtensions.map(e => e?.toLowerCase());
        return lowerExtensions.includes(ext) ? ext : fallback;
    }
    return ext;
}
