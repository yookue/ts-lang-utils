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


import { FileUtils } from '@unikue/ts-lang-utils';


function mockFile(type: string): File {
    return new File(['content'], 'test.png', { type });
}


describe('FileUtils.test', () => {

    // -------------------------------------------------------------------------
    // formatBytes
    // -------------------------------------------------------------------------

    test('Testing formatBytes', () => {
        expect(FileUtils.formatBytes(undefined)).toBeUndefined();
        expect(FileUtils.formatBytes(null)).toBeUndefined();
        expect(FileUtils.formatBytes()).toBeUndefined();

        expect(FileUtils.formatBytes(0)).toBe('0 B');
        expect(FileUtils.formatBytes(-1)).toBe('0 B');
        expect(FileUtils.formatBytes(Infinity)).toBe('0 B');

        expect(FileUtils.formatBytes(500)).toBe('500 B');
        expect(FileUtils.formatBytes(1024)).toBe('1 KB');
        expect(FileUtils.formatBytes(1536)).toBe('1.5 KB');
        expect(FileUtils.formatBytes(1048576)).toBe('1 MB');
        expect(FileUtils.formatBytes(1610612736)).toBe('1.5 GB');
        expect(FileUtils.formatBytes(1649267441664)).toBe('1.5 TB');

        // precision
        expect(FileUtils.formatBytes(1500, 0)).toBe('1 KB');
        expect(FileUtils.formatBytes(1500, 3)).toBe('1.465 KB');
    });

    // -------------------------------------------------------------------------
    // readAsDataUrl
    // -------------------------------------------------------------------------

    test('Testing readAsDataUrl with null/undefined file', () => {
        const mockResolve = jest.fn();
        const mockReject = jest.fn();
        FileUtils.readAsDataUrl(undefined, mockResolve, mockReject);
        expect(mockResolve).not.toHaveBeenCalled();
        expect(mockReject).not.toHaveBeenCalled();
    });

    test('Testing readAsDataUrl without resolve callback', () => {
        const file = mockFile('image/png');
        expect(() => FileUtils.readAsDataUrl(file)).not.toThrow();
    });

    test('Testing readAsDataUrl with null resolve callback', () => {
        const file = mockFile('image/png');
        expect(() => FileUtils.readAsDataUrl(file, undefined)).not.toThrow();
    });

    test('Testing readAsDataUrl reads file and resolves with data URL', async () => {
        const file = mockFile('image/png');
        const mockResolve = jest.fn();
        const mockReject = jest.fn();

        FileUtils.readAsDataUrl(file, mockResolve, mockReject);

        // FileReader is async, wait for the load event
        await new Promise(r => setTimeout(r, 50));

        expect(mockResolve).toHaveBeenCalled();
        const result = mockResolve.mock.calls[0][0];
        expect(result).toEqual(expect.stringContaining('data:image/png;base64,'));
    });

    test('Testing readAsDataUrl rejects on invalid read', async () => {
        // Create a mock that forces FileReader to error
        const originalReadAsDataURL = FileReader.prototype.readAsDataURL;
        FileReader.prototype.readAsDataURL = jest.fn(function(this: FileReader) {
            // Dispatch error event immediately
            const event = new ProgressEvent('error', {});
            this.dispatchEvent(event);
        });

        const file = mockFile('image/png');
        const mockResolve = jest.fn();
        const mockReject = jest.fn();

        FileUtils.readAsDataUrl(file, mockResolve, mockReject);

        await new Promise(r => setTimeout(r, 50));

        expect(mockResolve).not.toHaveBeenCalled();
        expect(mockReject).toHaveBeenCalled();

        // Restore
        FileReader.prototype.readAsDataURL = originalReadAsDataURL;
    });

});
