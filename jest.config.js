module.exports = {
  "displayName": {
    "name": "TEST CASE",
    "color": "blue",
  },
  "globals": { "ts-jest": { "tsConfig": "tsconfig.json" } },
  "moduleFileExtensions": [
      "ts",
      "js",
  ],
  "transform": { "^.+\\.(ts|tsx)$": "ts-jest" },
  "testMatch": ["**/tests_disabled/**/*.specs.(ts)"],
  "testEnvironment": "node",
  "collectCoverageFrom": [
    "src/**/{!(ignore-me),}.ts",
    "!**/helpers/**"
  ]
};
