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
 * Utilities for map
 *
 * @author David Hsing
 */
// noinspection JSUnusedGlobalSymbols
export abstract class MapUtils {
    /**
     * Processes each entry in the map
     *
     * @param map the map to inspect
     * @param callback a callback function that processes each entry
     */
    public static forEach<K, V>(map?: Map<K, V>, callback?: (value: V, key: K) => void): void {
        if (!map || map.size === 0 || !callback) {
            return;
        }
        for (const [key, value] of map.entries()) {
            callback(value, key);
        }
    }

    /**
     * Processes each entry in the map, with breakable ability
     *
     * @param map the map to inspect
     * @param callback the callback function that processes each entry, returns `false` means break
     */
    public static forEachBreakable<K, V>(map?: Map<K, V>, callback?: (value: V, key: K) => boolean): void {
        if (!map || map.size === 0 || !callback) {
            return;
        }
        for (const [key, value] of map.entries()) {
            if (!callback(value, key)) {
                break;
            }
        }
    }

    /**
     * Processes each entry in the map, with indexing ability
     *
     * @param map the map to inspect
     * @param callback a callback function that processes each entry
     */
    public static forEachIndexing<K, V>(map?: Map<K, V>, callback?: (value: V, key: K, index: number) => void): void {
        if (!map || map.size === 0 || !callback) {
            return;
        }
        let index = 0;
        for (const [key, value] of map.entries()) {
            callback(value, key, index++);
        }
    }

    /**
     * Processes each entry in the map, with indexing and breakable ability
     *
     * @param map the map to inspect
     * @param callback the callback function that processes each entry, returns `false` means break
     */
    public static forEachIndexingBreakable<K, V>(map?: Map<K, V>, callback?: (value: V, key: K, index: number) => boolean): void {
        if (!map || map.size === 0 || !callback) {
            return;
        }
        let index = 0;
        for (const [key, value] of map.entries()) {
            if (!callback(value, key, index++)) {
                break;
            }
        }
    }

    /**
     * Processes each entry in the map, with indexing ability, but not the tailing entry, and returns it
     *
     * @param map the map to inspect
     * @param callback the callback function that processes each entry
     *
     * @returns the tailing entry in the source map
     */
    public static forEachIndexingTailing<K, V>(map?: Map<K, V>, callback?: (value: V, key: K, index: number) => void): [K, V] | undefined {
        if (!map || map.size === 0 || !callback) {
            return undefined;
        }
        let index = 0;
        for (const [key, value] of map.entries()) {
            if (index < map.size - 1) {
                callback(value, key, index++);
            } else {
                return [key, value];
            }
        }
        return undefined;
    }

    /**
     * Processes each entry in the map, but not the tailing entry, and returns it
     *
     * @param map the map to inspect
     * @param callback the callback function that processes each entry
     *
     * @returns the tailing entry in the source map
     */
    public static forEachTailing<K, V>(map?: Map<K, V>, callback?: (value: V, key: K) => void): [K, V] | undefined {
        if (!map || map.size === 0 || !callback) {
            return undefined;
        }
        let index = 0;
        for (const [key, value] of map.entries()) {
            if (index < map.size - 1) {
                callback(value, key);
            } else {
                return [key, value];
            }
            index++;
        }
        return undefined;
    }
}
