/**
 * Mock for expo/src/winter - prevents "import outside of scope" in Jest
 */
module.exports = {
  installFormDataPatch: jest.fn(),
};
