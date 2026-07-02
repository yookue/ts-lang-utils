/*
 * Copyright (c) 2023 Unikue Ltd. All rights reserved.
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


import { ImageUtils } from '@unikue/ts-lang-utils';


function mockFile(type: string): File {
    return { type } as File;
}


describe('ImageUtils.test', () => {

    // -------------------------------------------------------------------------
    // detectSource
    // -------------------------------------------------------------------------

    test('Testing detectSource with string param', () => {
        const mockResolve = jest.fn();
        ImageUtils.detectSource('https://example.com/image.png', mockResolve);
        expect(mockResolve).toHaveBeenCalledWith('https://example.com/image.png');
    });

    test('Testing detectSource with function returning string', () => {
        const mockResolve = jest.fn();
        ImageUtils.detectSource(() => 'https://example.com/image.png', mockResolve);
        expect(mockResolve).toHaveBeenCalledWith('https://example.com/image.png');
    });

    test('Testing detectSource with function returning undefined', () => {
        const mockResolve = jest.fn();
        const mockReject = jest.fn();
        ImageUtils.detectSource(() => undefined, mockResolve, mockReject);
        expect(mockResolve).not.toHaveBeenCalled();
        expect(mockReject).toHaveBeenCalled();
    });

    test('Testing detectSource with Promise param', async () => {
        const mockResolve = jest.fn();
        ImageUtils.detectSource(Promise.resolve('https://example.com/image.png'), mockResolve);
        // Need to wait for the promise to resolve
        await new Promise(r => setTimeout(r, 10));
        expect(mockResolve).toHaveBeenCalledWith('https://example.com/image.png');
    });

    test('Testing detectSource with function returning Promise (resolve)', async () => {
        const mockResolve = jest.fn();
        ImageUtils.detectSource(() => Promise.resolve('https://example.com/image.png'), mockResolve);
        await new Promise(r => setTimeout(r, 10));
        expect(mockResolve).toHaveBeenCalledWith('https://example.com/image.png');
    });

    test('Testing detectSource with function returning Promise (reject)', async () => {
        const mockResolve = jest.fn();
        const mockReject = jest.fn();
        ImageUtils.detectSource(() => Promise.reject(new Error('fail')), mockResolve, mockReject);
        await new Promise(r => setTimeout(r, 10));
        expect(mockResolve).not.toHaveBeenCalled();
        expect(mockReject).toHaveBeenCalled();
    });

    test('Testing detectSource with null/undefined param', () => {
        const mockResolve = jest.fn();
        ImageUtils.detectSource(undefined, mockResolve);
        expect(mockResolve).not.toHaveBeenCalled();
        ImageUtils.detectSource(null as unknown as string, mockResolve);
        expect(mockResolve).not.toHaveBeenCalled();
    });

    test('Testing detectSource without resolve callback', () => {
        // Should not throw when no resolve callback provided
        expect(() => ImageUtils.detectSource('https://example.com/image.png')).not.toThrow();
        expect(() => ImageUtils.detectSource(() => 'test')).not.toThrow();
    });

    // -------------------------------------------------------------------------
    // detectDimension
    // -------------------------------------------------------------------------

    test('Testing detectDimension with null/undefined file', () => {
        const mockResolve = jest.fn();
        const mockReject = jest.fn();
        ImageUtils.detectDimension(undefined, mockResolve, mockReject);
        expect(mockResolve).not.toHaveBeenCalled();
        expect(mockReject).not.toHaveBeenCalled();
    });

    test('Testing detectDimension with non-image file', () => {
        const mockResolve = jest.fn();
        const mockReject = jest.fn();
        ImageUtils.detectDimension(mockFile('text/plain'), mockResolve, mockReject);
        expect(mockResolve).not.toHaveBeenCalled();
        expect(mockReject).not.toHaveBeenCalled();
    });

    test('Testing detectDimension without resolve callback', () => {
        expect(() => ImageUtils.detectDimension(mockFile('image/png'))).not.toThrow();
    });

    // -------------------------------------------------------------------------
    // extractExtension
    // -------------------------------------------------------------------------

    test('Testing extractExtension with null/undefined source', () => {
        expect(ImageUtils.extractExtension()).toBe('.jpg');
        expect(ImageUtils.extractExtension(null)).toBe('.jpg');
        expect(ImageUtils.extractExtension(undefined)).toBe('.jpg');
    });

    test('Testing extractExtension with URL source', () => {
        expect(ImageUtils.extractExtension('https://example.com/image.png')).toBe('.png');
        expect(ImageUtils.extractExtension('http://example.com/photo.jpeg')).toBe('.jpeg');
        expect(ImageUtils.extractExtension('https://cdn.example.com/avatar.gif')).toBe('.gif');
        expect(ImageUtils.extractExtension('https://example.com/banner.webp')).toBe('.webp');
        expect(ImageUtils.extractExtension('https://example.com/image.bmp')).toBe('.bmp');
        expect(ImageUtils.extractExtension('https://example.com/photo.heic')).toBe('.heic');
        expect(ImageUtils.extractExtension('https://example.com/photo.heif')).toBe('.heif');
    });

    test('Testing extractExtension with URL source and query string', () => {
        expect(ImageUtils.extractExtension('https://example.com/image.png?size=200')).toBe('.png');
        expect(ImageUtils.extractExtension('http://example.com/photo.jpeg?width=800&height=600')).toBe('.jpeg');
        // Query param should not interfere with extension detection (e.g. ?v=1.0)
        expect(ImageUtils.extractExtension('https://example.com/banner.webp?v=1.0')).toBe('.webp');
    });

    test('Testing extractExtension with URL source and fragment', () => {
        expect(ImageUtils.extractExtension('https://example.com/image.png#section')).toBe('.png');
        expect(ImageUtils.extractExtension('https://example.com/photo.jpeg?size=200#anchor')).toBe('.jpeg');
    });

    test('Testing extractExtension with local file path', () => {
        expect(ImageUtils.extractExtension('/vol/images/photo.png')).toBe('.png');
        expect(ImageUtils.extractExtension('/Users/john/Pictures/avatar.jpeg')).toBe('.jpeg');
        expect(ImageUtils.extractExtension('/home/user/images/banner.gif')).toBe('.gif');
        expect(ImageUtils.extractExtension('C:\\Users\\john\\Pictures\\photo.jpg')).toBe('.jpg');
    });

    test('Testing extractExtension with source without extension', () => {
        expect(ImageUtils.extractExtension('https://example.com/images/photo')).toBe('.jpg');
        expect(ImageUtils.extractExtension('/vol/images/avatar')).toBe('.jpg');
        expect(ImageUtils.extractExtension('just_a_filename')).toBe('.jpg');
    });

    test('Testing extractExtension with disallowed extension', () => {
        expect(ImageUtils.extractExtension('https://example.com/photo.tiff')).toBe('.jpg');
        expect(ImageUtils.extractExtension('/vol/images/photo.ico')).toBe('.jpg');
        expect(ImageUtils.extractExtension('https://example.com/image.raw')).toBe('.jpg');
    });

    test('Testing extractExtension with custom allowed extensions', () => {
        expect(ImageUtils.extractExtension('https://example.com/icon.svg', ['.svg'])).toBe('.svg');
        expect(ImageUtils.extractExtension('/vol/images/photo.tiff', ['.tiff', '.png'])).toBe('.tiff');
        expect(ImageUtils.extractExtension('image.ico', ['.jpg', '.ico'])).toBe('.ico');
    });

    test('Testing extractExtension with empty allowed extensions', () => {
        // Empty array means no filtering, returns the raw extension
        expect(ImageUtils.extractExtension('https://example.com/image.png', [])).toBe('.png');
        expect(ImageUtils.extractExtension('image.svg', [])).toBe('.svg');
    });

    test('Testing extractExtension with custom fallback', () => {
        // .tiff is not in the default allowed list, so fallback kicks in
        expect(ImageUtils.extractExtension('https://example.com/photo.tiff', undefined, '.png')).toBe('.png');
        expect(ImageUtils.extractExtension(undefined, undefined, '.jpeg')).toBe('.jpeg');
        expect(ImageUtils.extractExtension(null, ['.jpg'], '.webp')).toBe('.webp');
    });

    test('Testing extractExtension case insensitivity', () => {
        expect(ImageUtils.extractExtension('https://example.com/image.PNG')).toBe('.png');
        expect(ImageUtils.extractExtension('https://example.com/photo.JPEG')).toBe('.jpeg');
        expect(ImageUtils.extractExtension('/vol/images/BANNER.GIF')).toBe('.gif');
    });

    test('Testing extractExtension with mixed case allowed extensions', () => {
        // Allowed extensions should be case-insensitive
        expect(ImageUtils.extractExtension('https://example.com/image.jpg', ['.JPG'])).toBe('.jpg');
        expect(ImageUtils.extractExtension('https://example.com/photo.PNG', ['.Png'])).toBe('.png');
    });

    test('Testing extractExtension with null/undefined in allowed extensions', () => {
        expect(ImageUtils.extractExtension('https://example.com/image.png', ['.jpg', null, '.png', undefined])).toBe('.png');
    });

    // -------------------------------------------------------------------------
    // isImage
    // -------------------------------------------------------------------------

    test('Testing isImage', () => {
        expect(ImageUtils.isImage(mockFile('image/png'))).toBeTruthy();
        expect(ImageUtils.isImage(mockFile('image/jpeg'))).toBeTruthy();
        expect(ImageUtils.isImage(mockFile('image/gif'))).toBeTruthy();
        expect(ImageUtils.isImage(mockFile('image/webp'))).toBeTruthy();
        expect(ImageUtils.isImage(mockFile('image/svg+xml'))).toBeTruthy();
        expect(ImageUtils.isImage(mockFile('application/pdf'))).toBeFalsy();
        expect(ImageUtils.isImage(mockFile('text/plain'))).toBeFalsy();
        expect(ImageUtils.isImage(mockFile(''))).toBeFalsy();
        expect(ImageUtils.isImage(undefined)).toBeFalsy();
        expect(ImageUtils.isImage(null as unknown as File)).toBeFalsy();
    });

    // -------------------------------------------------------------------------
    // isGifImage
    // -------------------------------------------------------------------------

    test('Testing isGifImage', () => {
        expect(ImageUtils.isGifImage(mockFile('image/gif'))).toBeTruthy();
        expect(ImageUtils.isGifImage(mockFile('image/png'))).toBeFalsy();
        expect(ImageUtils.isGifImage(mockFile('image/jpeg'))).toBeFalsy();
        expect(ImageUtils.isGifImage(undefined)).toBeFalsy();
        expect(ImageUtils.isGifImage(null as unknown as File)).toBeFalsy();
    });

    // -------------------------------------------------------------------------
    // isJpgImage
    // -------------------------------------------------------------------------

    test('Testing isJpgImage', () => {
        expect(ImageUtils.isJpgImage(mockFile('image/jpeg'))).toBeTruthy();
        expect(ImageUtils.isJpgImage(mockFile('image/png'))).toBeFalsy();
        expect(ImageUtils.isJpgImage(mockFile('image/gif'))).toBeFalsy();
        expect(ImageUtils.isJpgImage(undefined)).toBeFalsy();
        expect(ImageUtils.isJpgImage(null as unknown as File)).toBeFalsy();
    });

    // -------------------------------------------------------------------------
    // isPngImage
    // -------------------------------------------------------------------------

    test('Testing isPngImage', () => {
        expect(ImageUtils.isPngImage(mockFile('image/png'))).toBeTruthy();
        expect(ImageUtils.isPngImage(mockFile('image/jpeg'))).toBeFalsy();
        expect(ImageUtils.isPngImage(mockFile('image/gif'))).toBeFalsy();
        expect(ImageUtils.isPngImage(undefined)).toBeFalsy();
        expect(ImageUtils.isPngImage(null as unknown as File)).toBeFalsy();
    });

});
