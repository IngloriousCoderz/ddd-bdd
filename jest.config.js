module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  reporters: [
    'default',
    './node_modules/jest-html-reporters',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Blog Test Report',
      },
    ],
  ],
};
