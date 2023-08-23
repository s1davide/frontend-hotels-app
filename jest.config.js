module.exports = {
    preset: "ts-jest",
    transformIgnorePatterns: ["/node_modules/(?![swiper/swiper-react.mjs])", // verify and replace here the path what are causing issue to you
    "/node_modules/(?![swiper//swiper.mjs])",'node_modules/(?!(swiper|ssr-window|dom7)/)'],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.(mjs|js|jsx|ts)$": "babel-jest"
    },
    testEnvironment: "jsdom",
    roots: ["<rootDir>", "src", "<rootDir>/src", "<rootDir>/__tests__","assets"],
    modulePaths: ["<rootDir>", "src"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__mock__/imagesMock.js",
        "^~/(.*)$": "<rootDir>/src/$1",
    },
}
