const { TestEnvironment } = require("jest-environment-node");

class AdjustedTestEnvironmentToSupportFloat32Array extends TestEnvironment {
  constructor(config, context) {
    // Make `instanceof Float32Array` return true in tests
    // to avoid https://github.com/xenova/transformers.js/issues/57 and https://github.com/jestjs/jest/issues/2549
    super(config, context);
    this.global.Float32Array = Float32Array;
    // LangSmith 0.6 reads global crypto for run ids. Jest's vm does not expose it.
    if (typeof this.global.crypto === "undefined") {
      this.global.crypto = require("crypto").webcrypto;
    }
  }
}

module.exports = AdjustedTestEnvironmentToSupportFloat32Array;
