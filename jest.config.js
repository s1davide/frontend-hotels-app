module.exports = {
    preset: "ts-jest",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    roots: ["<rootDir>", "src", "<rootDir>/src", "<rootDir>/__tests__"],
    modulePaths: ["<rootDir>", "src"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "^~/(.*)$": "<rootDir>/src/$1",
    },
}
