module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
}
