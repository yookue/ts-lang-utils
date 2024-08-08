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


import {ObjectUtils} from './ObjectUtils';


/**
 * Utilities for tree
 *
 * @author David Hsing
 * @hideconstructor
 */
// noinspection JSUnusedGlobalSymbols
export abstract class TreeUtils {
    /**
     * Traverses the target nodes with the given callback function
     *
     * @param nodes the nodes to traverse
     * @param callback the function to execute during traversing
     * @param childrenKey the property name to children node
     */
    public static forEach<T>(nodes?: T[], callback?: (node: T, nodes?: T[]) => void, childrenKey: string = 'children'): void {
        if (!nodes || nodes.length === 0 || !callback || !childrenKey) {
            return;
        }
        for (const node of nodes) {
            callback(node, nodes);
            const children = ObjectUtils.getProp(node, childrenKey);
            if (children && Array.isArray(children)) {
                this.forEach(children, callback, childrenKey);
            }
        }
    }
}
