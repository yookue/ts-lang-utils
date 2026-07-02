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


import { ElementUtils } from '@unikue/ts-lang-utils';


describe('ElementUtils.test', () => {

    // -------------------------------------------------------------------------
    // getValueDescriptor
    // -------------------------------------------------------------------------

    test('Testing getValueDescriptor with null/undefined', () => {
        expect(ElementUtils.getValueDescriptor(undefined)).toBeUndefined();
        expect(ElementUtils.getValueDescriptor(null)).toBeUndefined();
    });

    test('Testing getValueDescriptor with HTMLInputElement', () => {
        const input = document.createElement('input');
        const descriptor = ElementUtils.getValueDescriptor(input);
        expect(descriptor).toBeDefined();
        expect(descriptor?.get).toBeDefined();
        expect(descriptor?.set).toBeDefined();
    });

    test('Testing getValueDescriptor with HTMLSelectElement', () => {
        const select = document.createElement('select');
        const descriptor = ElementUtils.getValueDescriptor(select);
        expect(descriptor).toBeDefined();
        expect(descriptor?.get).toBeDefined();
        expect(descriptor?.set).toBeDefined();
    });

    test('Testing getValueDescriptor with HTMLTextAreaElement', () => {
        const textarea = document.createElement('textarea');
        const descriptor = ElementUtils.getValueDescriptor(textarea);
        expect(descriptor).toBeDefined();
        expect(descriptor?.get).toBeDefined();
        expect(descriptor?.set).toBeDefined();
    });

    test('Testing getValueDescriptor with other HTMLElement', () => {
        const div = document.createElement('div');
        const descriptor = ElementUtils.getValueDescriptor(div);
        expect(descriptor).toBeUndefined();
    });

    // -------------------------------------------------------------------------
    // getElementValue
    // -------------------------------------------------------------------------

    test('Testing getElementValue with null/undefined', () => {
        expect(ElementUtils.getElementValue(undefined)).toBeUndefined();
        expect(ElementUtils.getElementValue(null)).toBeUndefined();
    });

    test('Testing getElementValue with HTMLInputElement', () => {
        const input = document.createElement('input');
        input.value = 'test value';
        expect(ElementUtils.getElementValue(input)).toBe('test value');
    });

    test('Testing getElementValue with HTMLSelectElement', () => {
        const select = document.createElement('select');
        const option = document.createElement('option');
        option.value = 'option1';
        option.text = 'Option 1';
        select.appendChild(option);
        select.value = 'option1';
        expect(ElementUtils.getElementValue(select)).toBe('option1');
    });

    test('Testing getElementValue with HTMLTextAreaElement', () => {
        const textarea = document.createElement('textarea');
        textarea.value = 'textarea content';
        expect(ElementUtils.getElementValue(textarea)).toBe('textarea content');
    });

    test('Testing getElementValue with other HTMLElement', () => {
        const div = document.createElement('div');
        expect(ElementUtils.getElementValue(div)).toBeUndefined();
    });

    // -------------------------------------------------------------------------
    // setElementValue
    // -------------------------------------------------------------------------

    test('Testing setElementValue with null/undefined element', () => {
        const callback = jest.fn();
        ElementUtils.setElementValue(undefined, 'new value', callback);
        expect(callback).not.toHaveBeenCalled();
        ElementUtils.setElementValue(null, 'new value', callback);
        expect(callback).not.toHaveBeenCalled();
    });

    test('Testing setElementValue with HTMLInputElement', () => {
        const input = document.createElement('input');
        input.value = 'original';
        const callback = jest.fn();
        ElementUtils.setElementValue(input, 'updated', callback);
        expect(input.value).toBe('updated');
        expect(callback).toHaveBeenCalledWith('original');
    });

    test('Testing setElementValue without callback', () => {
        const input = document.createElement('input');
        input.value = 'before';
        ElementUtils.setElementValue(input, 'after');
        expect(input.value).toBe('after');
    });

    test('Testing setElementValue with undefined value', () => {
        const input = document.createElement('input');
        input.value = 'before';
        const callback = jest.fn();
        ElementUtils.setElementValue(input, undefined, callback);
        expect(input.value).toBe('');
        expect(callback).toHaveBeenCalledWith('before');
    });

    test('Testing setElementValue with other HTMLElement (no value descriptor)', () => {
        const div = document.createElement('div');
        const callback = jest.fn();
        ElementUtils.setElementValue(div, 'some value', callback);
        expect(callback).not.toHaveBeenCalled();
    });

    // -------------------------------------------------------------------------
    // clearElementValue
    // -------------------------------------------------------------------------

    test('Testing clearElementValue with null/undefined element', () => {
        const callback = jest.fn();
        ElementUtils.clearElementValue(undefined, callback);
        expect(callback).not.toHaveBeenCalled();
        ElementUtils.clearElementValue(null, callback);
        expect(callback).not.toHaveBeenCalled();
    });

    test('Testing clearElementValue with HTMLInputElement', () => {
        const input = document.createElement('input');
        input.value = 'original';
        const callback = jest.fn();
        ElementUtils.clearElementValue(input, callback);
        expect(input.value).toBe('');
        expect(callback).toHaveBeenCalledWith('original');
    });

    test('Testing clearElementValue without callback', () => {
        const input = document.createElement('input');
        input.value = 'some text';
        ElementUtils.clearElementValue(input);
        expect(input.value).toBe('');
    });

    // -------------------------------------------------------------------------
    // downloadCanvasElement
    // -------------------------------------------------------------------------

    test('Testing downloadCanvasElement with null/undefined element', () => {
        expect(() => ElementUtils.downloadCanvasElement(undefined, 'test.png')).not.toThrow();
        expect(() => ElementUtils.downloadCanvasElement(null, 'test.png')).not.toThrow();
    });

    test('Testing downloadCanvasElement without fileName', () => {
        const div = document.createElement('div');
        expect(() => ElementUtils.downloadCanvasElement(div)).not.toThrow();
        expect(() => ElementUtils.downloadCanvasElement(div, undefined)).not.toThrow();
    });

    // -------------------------------------------------------------------------
    // downloadSvgElement
    // -------------------------------------------------------------------------

    test('Testing downloadSvgElement with null/undefined element', () => {
        expect(() => ElementUtils.downloadSvgElement(undefined, 'test.svg')).not.toThrow();
        expect(() => ElementUtils.downloadSvgElement(null, 'test.svg')).not.toThrow();
    });

    test('Testing downloadSvgElement without fileName', () => {
        const div = document.createElement('div');
        expect(() => ElementUtils.downloadSvgElement(div)).not.toThrow();
        expect(() => ElementUtils.downloadSvgElement(div, undefined)).not.toThrow();
    });

    // -------------------------------------------------------------------------
    // downloadUrlByElement
    // -------------------------------------------------------------------------

    test('Testing downloadUrlByElement with null/undefined url', () => {
        expect(() => ElementUtils.downloadUrlByElement(undefined)).not.toThrow();
        expect(() => ElementUtils.downloadUrlByElement(undefined, 'test.txt')).not.toThrow();
    });

});
