const commonConfig = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@$': '<rootDir>/src',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@unikue/ts-lang-utils$': '<rootDir>/src',
        '^@unikue/ts-lang-utils/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: './tsconfig.test.json'
        }]
    }
};


export default {
    projects: [
        {
            ...commonConfig,
            displayName: 'node',
            testEnvironment: 'node',
            testMatch: ['**/test/**/*.test.ts'],
            testPathIgnorePatterns: [
                '/ElementUtils\\.test\\.ts$',
                '/FileUtils\\.test\\.ts$'
            ]
        },
        {
            ...commonConfig,
            displayName: 'jsdom',
            testEnvironment: 'jsdom',
            testMatch: [
                '**/test/util/ElementUtils.test.ts',
                '**/test/util/FileUtils.test.ts'
            ],
            moduleNameMapper: {
                ...commonConfig.moduleNameMapper,
                // Force nanoid CJS version in jsdom environment
                '^nanoid$': '<rootDir>/node_modules/nanoid/index.cjs'
            }
        }
    ]
};
