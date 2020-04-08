module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts$",
  coverageReporters: ["html", "json", "text"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
}
