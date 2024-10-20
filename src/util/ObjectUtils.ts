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
     * ```ts
     * ObjectUtils.allNil([null, undefined]);    // true
     * ObjectUtils.allNil([null, {}]);    // false
     * ObjectUtils.allNil([null, 'foobar']);    // false
     * ```
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
     * ```ts
     * ObjectUtils.allNotNil([null, undefined]);    // false
     * ObjectUtils.allNotNil([null, {}]);    // false
     * ObjectUtils.allNotNil(['foo', 'bar']);    // true
     * ```
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
     * ```ts
     * ObjectUtils.anyNil([null, undefined]);    // true
     * ObjectUtils.anyNil([null, {}]);    // true
     * ObjectUtils.anyNil(['foo', 'bar']);    // false
     * ```
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
     * ```ts
     * ObjectUtils.anyNotNil([null, undefined]);    // false
     * ObjectUtils.anyNotNil([null, {}]);    // true
     * ```
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
     * ```ts
     * ObjectUtils.allEmpty([null, undefined]);    // true
     * ObjectUtils.allEmpty([null, {}]);    // true
     * ```
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
     * ```ts
     * ObjectUtils.allNotEmpty([null, undefined]);    // false
     * ObjectUtils.allNotEmpty([null, {}]);    // false
     * ObjectUtils.allNotEmpty(['foo', 'bar']);    // true
     * ```
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
     * ```ts
     * ObjectUtils.anyEmpty([null, undefined]);    // true
     * ObjectUtils.anyEmpty([null, {}]);    // true
     * ```
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
     * ```ts
     * ObjectUtils.anyNotEmpty([null, undefined]);    // false
     * ObjectUtils.anyNotEmpty([null, {}]);    // false
     * ```
     */
    public static anyNotEmpty(objects?: any[]): boolean {
        return !!objects && objects.length > 0 && objects.some(item => this.isNotEmpty(item));
    }

    /**
     * Returns an object that cloned from the given object
     *
     * @param source the object to clone
     *
     * @returns an object that cloned from the given object
     *
     * @example
     * ```ts
     * ObjectUtils.clone({'foo': 'bar'});
     * ```
     */
    public static clone(source?: object): object | undefined {
        return (!source || !this.isPlain(source)) ? undefined : Object.assign({}, source);
    }

    /**
     * Returns an object that cloned from the given object, excludes all the given keys
     *
     * @param source the object to clone
     * @param keys the key names to exclude
     *
     * @returns an object that cloned from the given object, excludes all the given keys
     *
     * @example
     * ```ts
     * ObjectUtils.cloneExclusive({'foo': 'bar'}, ['foo']);
     * ```
     */
    public static cloneExclusive(source?: object, keys?: string[]): object | undefined {
        if (!source || !this.isPlain(source)) {
            return undefined;
        }
        if (!keys || keys.length === 0) {
            return this.clone(source);
        }
        const result = {};
        Object.entries(source).filter(item => !keys.includes(item[0])).forEach(item => this.setProp(result, item[0], item[1]));
        return result;
    }

    /**
     * Returns an object that cloned from the given object, includes the given keys only
     *
     * @param source the object to clone
     * @param keys the key names to include
     *
     * @returns an object that cloned from the given object, includes the given keys only
     *
     * @example
     * ```ts
     * ObjectUtils.cloneInclusive({'foo': 'bar'}, ['foo']);
     * ```
     */
    public static cloneInclusive(source?: object, keys?: string[]): object | undefined {
        if (!source || !this.isPlain(source) || !keys || keys.length === 0) {
            return undefined;
        }
        const result = {};
        Object.entries(source).filter(item => keys.includes(item[0])).forEach(item => this.setProp(result, item[0], item[1]));
        return result;
    }

    /**
     * Returns an object that merged the given props, when the key of props is missing, or the value of matching key is null or undefined
     *
     * @param target the object to inspect
     * @param props the properties to assign
     * @param overrideNil whether to override the value of target, when it is null or undefined
     *
     * @returns an object that merged the given props, when the key of props is missing, or the value of matching key is null or undefined
     *
     * @example
     * ```ts
     * ObjectUtils.defaultProps({}, {'foo': 'bar'});
     * ```
     */
    public static defaultProps(target?: object, props?: object, overrideNil = true): object | undefined {
        if (!target || !this.isPlain(target)) {
            return props;
        }
        if (!props || !this.isPlain(props)) {
            return target;
        }
        const attributes = {};
        Object.entries(props).filter(item => {
            return !Object.prototype.hasOwnProperty.call(target, item[0]) || (overrideNil && (target[item[0] as keyof typeof target] === undefined || target[item[0] as keyof typeof target] === null));
        }).forEach(item => this.setProp(attributes, item[0], item[1]));
        return Object.assign(target, attributes);
    }

    /**
     * Processes each prop key in the object
     *
     * @param object the object to inspect
     * @param callback the callback function that processes each prop key
     */
    public static forEachProp(object: any, callback?: (key: string, index: number) => void): void {
        if (!object || !this.isPlain(object) || !callback) {
            return;
        }
        Object.keys(object).filter(key => Object.prototype.hasOwnProperty.call(object, key)).forEach((key: string, index: number) => {
            callback(key, index);
        });
    }

    /**
     * Processes and map each prop key in the object
     *
     * @param object the object to inspect
     * @param callback the callback function that processes each prop key
     */
    public static mapEachProp(object: any, callback?: (key: string, index: number) => any): any[] | undefined {
        if (!object || !this.isPlain(object) || !callback) {
            return undefined;
        }
        return Object.keys(object).filter(key => Object.prototype.hasOwnProperty.call(object, key)).map((key: string, index: number) => {
            return callback(key, index);
        });
    }

    /**
     * Returns whether the given object is null or undefined
     *
     * @param object the object to check
     *
     * @returns whether the given object is null or undefined
     *
     * @example
     * ```ts
     * ObjectUtils.isNil(null);    // true
     * ObjectUtils.isNil(undefined);    // true
     * ObjectUtils.isNil({});    // false
     * ```
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
     * ```ts
     * ObjectUtils.isNotNil('foobar');    // true
     * ObjectUtils.isNotNil([]);    // true
     * ```
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
     * ```ts
     * ObjectUtils.isNull(null);    // true
     * ObjectUtils.isNull({});    // false
     * ```
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
     * ```ts
     * ObjectUtils.isNotNull('foobar');    // true
     * ```
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
     * ```ts
     * ObjectUtils.isUndefined(undefined);    // true
     * ObjectUtils.isUndefined({});    // false
     * ```
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
     * ```ts
     * ObjectUtils.isNotUndefined('foobar');    // true
     * ```
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
     * ```ts
     * ObjectUtils.isEmpty(null);    // true
     * ObjectUtils.isEmpty(undefined);    // true
     * ObjectUtils.isEmpty({});    // true
     * ObjectUtils.isEmpty('foobar');    // false
     * ```
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
     * ```ts
     * ObjectUtils.isNotEmpty('foobar');    // true
     * ObjectUtils.isNotEmpty([undefined, null]);    // true
     * ```
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
     * ```ts
     * ObjectUtils.isPlain(undefined);    // false
     * ObjectUtils.isPlain({foo: 'bar'});    // true
     * ```
     */
    public static isPlain(object: any): boolean {
        return typeof object === 'object' && Object.prototype.toString.call(object) === '[object Object]';
    }

    /**
     * Returns whether the given object is primitive
     *
     * @param object the object to check
     *
     * @returns whether the given object is primitive
     *
     * @example
     * ```ts
     * ObjectUtils.isPrimitive(undefined);    // true
     * ObjectUtils.isPrimitive(true);    // true
     * ObjectUtils.isPrimitive('foobar');    // true
     * ObjectUtils.isPrimitive({foo: 'bar'});    // false
     * ```
     */
    public static isPrimitive(object: any): boolean {
        return object === undefined || object === null || typeof object === 'string' || typeof object === 'boolean' || typeof object === 'number' || typeof object === 'symbol' || typeof object === 'bigint' || typeof object === 'function';
    }

    /**
     * Returns whether the given object is a promise
     *
     * @param object the object to check
     *
     * @returns whether the given object is a promise
     *
     * @example
     * ```ts
     * ObjectUtils.isPromise({});    // false
     * ObjectUtils.isPromise('foobar');    // false
     * ```
     */
    public static isPromise(object: any): boolean {
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
     * ```ts
     * ObjectUtils.isPrototype({});    // false
     * ObjectUtils.isPrototype('foobar');    // false
     * ```
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
     * ```ts
     * ObjectUtils.isRegular(/[0-9a-zA-Z]+/g);    // true
     * ObjectUtils.isRegular('/[0-9a-zA-Z]+/g');    // false
     * ```
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
     * ```ts
     * ObjectUtils.getProp({foo: {bar: 'foobar'}}, 'foo.bar');    // foobar
     * ```
     */
    public static getProp(object: any, prop?: string | null): any {
        if (typeof object !== 'object' || !prop) {
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
     * ```ts
     * ObjectUtils.hasProp({foo: 'bar'}, 'foo');    // true
     * ObjectUtils.hasProp({foo: 'bar'}, 'bar');    // false
     * ```
     */
    public static hasProp(object: any, prop?: string | null): boolean {
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
     * ```ts
     * ObjectUtils.setProp({}, 'foo', 'bar');
     * ```
     */
    public static setProp(object: any, prop?: string | null, value?: any): void {
        if (this.isPlain(object) && prop) {
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
     * ```ts
     * ObjectUtils.keys({foo: 'bar'});    // ['foo']
     * ```
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
            if (key !== 'constructor' && this.hasProp(object, key)) {
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
