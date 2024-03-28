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


import {TreeUtils} from '@yookue/ts-lang-utils';


describe('TreeUtils', () => {
    test('Testing forEach', () => {
        const tree = [
            {
                key: '0-0',
                children: [
                    {
                        key: '0-0-0',
                        children: [
                            { key: '0-0-0-0' },
                            { key: '0-0-0-1' },
                            { key: '0-0-0-2' },
                        ],
                    },
                    {
                        key: '0-0-1',
                        children: [
                            { key: '0-0-1-0' },
                            { key: '0-0-1-1' },
                            { key: '0-0-1-2' },
                        ],
                    },
                    {
                        key: '0-0-2',
                    },
                ],
            }
        ];
        const keys = [];
        TreeUtils.forEach(tree, node => keys.push(node?.key));
        expect(keys.length).toEqual(10);
    });
});
