type TestConfiguration = {
  numbers: boolean;
  punctuation: boolean;
  testSize: TestSize;
};

export type TestSize = 10 | 25 | 100;

export default TestConfiguration;
