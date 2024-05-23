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


/**
 * Utilities for object
 *
 * @author David Hsing
 */
// noinspection JSUnusedGlobalSymbols
export abstract class ObjectUtils {
    /**
     * Returns whether all the elements in the given objects are null or undefined
     *
     * @param objects the objects to check
     *
     * @returns whether all the elements in the given objects are null or undefined
     *
     * @example
     * ObjectUtils.allNil([null, undefined]);    // true
     * ObjectUtils.allNil([null, {}]);    // false
     * ObjectUtils.allNil([null, 'foobar']);    // false
     */
    public static allNil(objects?: any[]): boolean {
        return !objects || objects.length === 0 || objects?.every(item => this.isNil(item));
    }

    /**
     * Returns whether all the elements in the given objects are not null or undefined
     *
     * @param objects the objects to check
     *
     * @returns whether all the elements in the given objects are not null or undefined
     *
     * @example
     * ObjectUtils.allNotNil([null, undefined]);    // false
     * ObjectUtils.allNotNil([null, {}]);    // false
     * ObjectUtils.allNotNil(['foo', 'bar']);    // true
     */
    public static allNotNil(objects?: any[]): boolean {
        return !!objects && objects.length > 0 && objects.every(item => this.isNotNil(item));
    }

    /**
     * Returns whether any of the elements in the given objects is null or undefined
     *
     * @param objects the objects to check
     *
     * @returns whether any the elements in the given objects is null or undefined
     *
     * @example
     * ObjectUtils.anyNil([null, undefined]);    // true
     * ObjectUtils.anyNil([null, {}]);    // true
     * ObjectUtils.anyNil(['foo', 'bar']);    // false
     */
    public static anyNil(objects?: any[]): boolean {
        return !objects || objects.length === 0 || objects.some(item => this.isNil(item));
    }

    /**
     * Returns whether any of the elements in the given objects is not null or undefined
     *
     * @param objects the objects to check
     *
     * @returns whether any of the elements in the given objects is not null or undefined
     *
     * @example
     * ObjectUtils.anyNotNil([null, undefined]);    // false
     * ObjectUtils.anyNotNil([null, {}]);    // true
     */
    public static anyNotNil(objects?: any[]): boolean {
        return !!objects && objects.length > 0 && objects.some(item => this.isNotNil(item));
    }

    /**
     * Returns whether all the elements in the given objects are empty
     *
     * @param objects the objects to check
     *
     * @returns whether all the elements in the given objects are empty
     *
     * @example
     * ObjectUtils.allEmpty([null, undefined]);    // true
     * ObjectUtils.allEmpty([null, {}]);    // true
     */
    public static allEmpty(objects?: any[]): boolean {
        return !objects || objects.length === 0 || objects.every(item => this.isEmpty(item));
    }

    /**
     * Returns whether all the elements in the given objects are not empty
     *
     * @param objects the objects to check
     *
     * @returns whether all the elements in the given objects are not empty
     *
     * @example
     * ObjectUtils.allNotEmpty([null, undefined]);    // false
     * ObjectUtils.allNotEmpty([null, {}]);    // false
     * ObjectUtils.allNotEmpty(['foo', 'bar']);    // true
     */
    public static allNotEmpty(objects?: any[]): boolean {
        return !!objects && objects.length > 0 && objects.every(item => this.isNotEmpty(item));
    }

    /**
     * Returns whether any of the elements in the given objects is empty
     *
     * @param objects the objects to check
     *
     * @returns whether any of the elements in the given objects is empty
     *
     * @example
     * ObjectUtils.anyEmpty([null, undefined]);    // true
     * ObjectUtils.anyEmpty([null, {}]);    // true
     */
    public static anyEmpty(objects?: any[]): boolean {
        return !objects || objects.length === 0 || objects.some(item => this.isEmpty(item));
    }

    /**
     * Returns whether any of the elements in the given objects is not empty
     *
     * @param objects the objects to check
     *
     * @returns whether any of the elements in the given objects is not empty
     *
     * @example
     * ObjectUtils.anyNotEmpty([null, undefined]);    // false
     * ObjectUtils.anyNotEmpty([null, {}]);    // false
     */
    public static anyNotEmpty(objects?: any[]): boolean {
        return !!objects && objects.length > 0 && objects.some(item => this.isNotEmpty(item));
    }

    /**
     * Returns an object that merges the given props when the key of props is missing
     *
     * @param target the object to inspect
     * @param props the properties to assign
     *
     * @returns an object that merges the given props when the key of props is missing
     *
     * @example
     * ObjectUtils.defaultProps({}, {'foo': 'bar'})
     */
    public static defaultProps(target?: object, props?: object): object | undefined {
        if (!target || !this.isPlainObject(target)) {
            return props;
        }
        if (!props || !this.isPlainObject(props)) {
            return target;
        }
        const attributes = {};
        Object.entries(props).filter(item => !Object.prototype.hasOwnProperty.call(target, item[0])).forEach(item => this.setProperty(attributes, item[0], item[1]));
        return Object.assign(target, attributes);
    }

    /**
     * Returns whether the given object is null or undefined
     *
     * @param object the object to check
     *
     * @returns whether the given object is null or undefined
     *
     * @example
     * ObjectUtils.isNil(null);    // true
     * ObjectUtils.isNil(undefined);    // true
     * ObjectUtils.isNil({});    // false
     */
    public static isNil(object: any): boolean {
        return object === undefined || object === null;
    }

    /**
     * Returns whether the given object is not null or undefined
     *
     * @param object the object to check
     *
     * @returns whether the given object is not null or undefined
     *
     * @example
     * ObjectUtils.isNotNil('foobar');    // true
     * ObjectUtils.isNotNil([]);    // true
     */
    public static isNotNil(object: any): boolean {
        return !this.isNil(object);
    }

    /**
     * Returns whether the given object is null
     *
     * @param object the object to check
     *
     * @returns whether the given object is null
     *
     * @example
     * ObjectUtils.isNull(null);    // true
     * ObjectUtils.isNull({});    // false
     */
    public static isNull(object: any): boolean {
        return object === null;
    }

    /**
     * Returns whether the given object is not null
     *
     * @param object the object to check
     *
     * @returns whether the given object is not null
     *
     * @example
     * ObjectUtils.isNotNull('foobar');    // true
     */
    public static isNotNull(object: any): boolean {
        return !this.isNull(object);
    }

    /**
     * Returns whether the given object is undefined
     *
     * @param object the object to check
     *
     * @returns whether the given object is undefined
     *
     * @example
     * ObjectUtils.isUndefined(undefined);    // true
     * ObjectUtils.isUndefined({});    // false
     */
    public static isUndefined(object: any): boolean {
        return object === undefined;
    }

    /**
     * Returns whether the given object is not undefined
     *
     * @param object the object to check
     *
     * @returns whether the given object is not undefined
     *
     * @example
     * ObjectUtils.isNotUndefined('foobar');    // true
     */
    public static isNotUndefined(object: any): boolean {
        return !this.isUndefined(object);
    }

    /**
     * Returns whether the given object is empty
     *
     * @param object the object to check
     *
     * @returns whether the given object is empty
     *
     * @example
     * ObjectUtils.isEmpty(null);    // true
     * ObjectUtils.isEmpty(undefined);    // true
     * ObjectUtils.isEmpty({});    // true
     * ObjectUtils.isEmpty('foobar');    // false
     */
    public static isEmpty(object: any): boolean {
        if (!object) {
            return true;
        }
        if (typeof object === 'string' || Array.isArray(object)) {
            return object.length === 0;
        }
        if (object instanceof Map || object instanceof Set) {
            return object.size === 0;
        }
        if (typeof object === 'object') {
            return this.keys(object)?.length === 0;
        }
        return false;
    }

    /**
     * Returns whether the given object is not empty
     *
     * @param object the object to check
     *
     * @returns whether the given object is not empty
     *
     * @example
     * ObjectUtils.isNotEmpty('foobar');    // true
     * ObjectUtils.isNotEmpty([undefined, null]);    // true
     */
    public static isNotEmpty(object: any): boolean {
        return !this.isEmpty(object);
    }

    /**
     * Returns whether the given object is a plain object
     *
     * @param object the object to check
     *
     * @returns whether the given object is a plain object
     *
     * @example
     * ObjectUtils.isPlainObject(undefined);    // false
     * ObjectUtils.isPlainObject({foo: 'bar'});    // true
     */
    public static isPlainObject(object: any): boolean {
        return typeof object === 'object' && Object.prototype.toString.call(object) === '[object Object]';
    }

    /**
     * Returns whether the given object is a promise
     *
     * @param object the object to check
     *
     * @returns whether the given object is a promise
     *
     * @example
     * ObjectUtils.isPromiseObject({});    // false
     * ObjectUtils.isPromiseObject('foobar');    // false
     */
    public static isPromiseObject(object: any): boolean {
        return typeof object === 'object' && Object.prototype.toString.call(object) === '[object Promise]';
    }

    /**
     * Returns whether the given object is a prototype
     *
     * @param object the object to check
     *
     * @returns whether the given object is a prototype
     *
     * @example
     * ObjectUtils.isPrototype({});    // false
     * ObjectUtils.isPrototype('foobar');    // false
     */
    public static isPrototype(object: any): boolean {
        if (typeof object !== 'object') {
            return false;
        }
        const constructor = object.constructor;
        const prototype = (typeof constructor === 'function') ? constructor.prototype : object.prototype;
        return object === prototype;
    }

    /**
     * Returns whether the given object is a regex
     *
     * @param object the object to check
     *
     * @returns whether the given object is a regex
     *
     * @example
     * ObjectUtils.isRegular(/[0-9a-zA-Z]+/g);    // true
     * ObjectUtils.isRegular('/[0-9a-zA-Z]+/g');    // false
     */
    public static isRegular(object: any): boolean {
        return (object instanceof RegExp) || (typeof object === 'object' && Object.prototype.toString.call(object) === '[object RegExp]');
    }

    /**
     * Returns the property value if property name is present on the given object
     *
     * @param object the object to inspect
     * @param prop the property name to inspect, parent property and child property are concat with dot (.)
     *
     * @returns the property value if property name is present on the given object
     *
     * @example
     * ObjectUtils.getProperty({foo: {bar: 'foobar'}}, 'foo.bar');    // foobar
     */
    public static getProperty(object: any, prop?: string | null): any {
        if (typeof object !== 'object' || !prop || prop.length === 0) {
            return undefined;
        }
        if (!prop.includes('.')) {
            return object[prop];
        }
        const props = prop.replace(/\[/g, '.').replace(/]/g, '').split('.');
        if (!props || props.length === 0) {
            return undefined;
        }
        return (props.length === 1) ? object[props[0]] : props.reduce((value, name) => (value || {})[name], object);
    }

    /**
     * Returns whether the given object has the specified property
     *
     * @param object the object to check
     * @param prop the property name to check
     *
     * @returns whether the object has the specified property
     *
     * @example
     * ObjectUtils.hasProperty({foo: 'bar'}, 'foo');    // true
     * ObjectUtils.hasProperty({foo: 'bar'}, 'bar');    // false
     */
    public static hasProperty(object: any, prop?: string | null): boolean {
        return typeof object === 'object' && !!prop && prop.length > 0 && Object.prototype.hasOwnProperty.call(object, prop);
    }

    /**
     * Sets the property value on the given object
     *
     * @param object the object to inspect
     * @param prop the property name to inspect
     * @param value the value to set
     *
     * @example
     * ObjectUtils.setProperty({}, 'foo', 'bar');
     */
    public static setProperty(object: any, prop?: string | null, value?: any): void {
        if (this.isPlainObject(object) && prop) {
            object[prop as keyof typeof object] = value;
        }
    }

    /**
     * Returns a string array representation of keys in the given object
     *
     * @param object the object to inspect
     *
     * @returns the keys of the given object
     *
     * @example
     * ObjectUtils.keys({foo: 'bar'});    // ['foo']
     */
    public static keys(object: any): string[] {
        if (!object) {
            return [];
        }
        if (!this.isPrototype(object)) {
            return Object.keys(object);
        }
        const result = [];
        for (const key in Object(object)) {
            if (key !== 'constructor' && this.hasProperty(object, key)) {
                result.push(key);
            }
        }
        return result;
    }

    /**
     * Returns the string representation of the given object
     *
     * @param object the object to inspect
     * @param nil the default string if the object is nil
     *
     * @returns a string representation of the given object
     */
    public static toString(object: any, nil?: string | null): string | undefined | null {
        return object ? object.toString() : nil;
    }

    /**
     * Returns the string tag representation of the given object
     *
     * @param object the object to inspect
     * @param nil the default string if the object is nil
     *
     * @returns a string tag representation of the given object
     */
    public static toStringTag(object: any, nil?: string | null): string | undefined | null {
        return object ? object[Symbol.toStringTag] : nil;
    }
}
