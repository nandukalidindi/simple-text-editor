"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const typings_1 = require("./typings");
const validator1 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hey' },
        { operation: typings_1.OPERATION.APPEND, text: ' there' },
        { operation: typings_1.OPERATION.APPEND, text: '!' },
    ],
    output: ['Hey', 'Hey there', 'Hey there!']
};
const validator2 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hey you' },
        { operation: typings_1.OPERATION.MOVE, index: 3 },
        { operation: typings_1.OPERATION.APPEND, text: ',' },
    ],
    output: ['Hey you', 'Hey you', 'Hey, you']
};
const validator3 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hello! world!' },
        { operation: typings_1.OPERATION.MOVE, index: 5 },
        { operation: typings_1.OPERATION.DELETE },
        { operation: typings_1.OPERATION.APPEND, text: ',' },
    ],
    output: ['Hello! world!', 'Hello! world!', 'Hello world!', 'Hello, world!']
};
const validator4 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: '!' },
        { operation: typings_1.OPERATION.DELETE },
        { operation: typings_1.OPERATION.MOVE, index: 0 },
        { operation: typings_1.OPERATION.DELETE },
        { operation: typings_1.OPERATION.DELETE },
    ],
    output: ['!', '', '', '', '']
};
const validate = (queryProcessor) => {
    [
        validator1,
        validator2,
        validator3,
        validator4
    ].forEach((validator, index) => {
        const { input, output: expectedOutput } = validator;
        const actualOutput = queryProcessor(input);
        const result = (expectedOutput.length == actualOutput.length) && expectedOutput.every((exOut, index) => exOut == actualOutput[index]);
        console.log(`Test case ${index + 1}: ${result ? 'Correct' : 'Wrong'}`);
        console.log(`Expected: ${expectedOutput} Actual: ${actualOutput}`);
    });
};
exports.validate = validate;
//# sourceMappingURL=test.js.map