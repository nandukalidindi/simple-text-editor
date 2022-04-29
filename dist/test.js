"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const typings_1 = require("./typings");
const textOperationValidator1 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hey' },
        { operation: typings_1.OPERATION.APPEND, text: ' there' },
        { operation: typings_1.OPERATION.APPEND, text: '!' },
    ],
    output: ['Hey', 'Hey there', 'Hey there!']
};
const textOperationValidator2 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hey you' },
        { operation: typings_1.OPERATION.MOVE, index: 3 },
        { operation: typings_1.OPERATION.APPEND, text: ',' },
    ],
    output: ['Hey you', 'Hey you', 'Hey, you']
};
const cursorOperationValidator1 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hello! world!' },
        { operation: typings_1.OPERATION.MOVE, index: 6 },
        { operation: typings_1.OPERATION.DELETE },
        { operation: typings_1.OPERATION.APPEND, text: ',' },
    ],
    output: ['Hello! world!', 'Hello! world!', 'Hello world!', 'Hello, world!']
};
const cursorOperationValidator2 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: '!' },
        { operation: typings_1.OPERATION.DELETE },
        { operation: typings_1.OPERATION.MOVE, index: 0 },
        { operation: typings_1.OPERATION.DELETE },
        { operation: typings_1.OPERATION.DELETE },
    ],
    output: ['!', '', '', '', '']
};
const cursorOperationValidator3 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hello cruel world!' },
        { operation: typings_1.OPERATION.SELECT, left: 5, right: 11 },
        { operation: typings_1.OPERATION.APPEND, text: ',' }
    ],
    output: ['Hello cruel world!', 'Hello cruel world!', 'Hello, world!']
};
const cursorOperationValidator4 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hello' },
        { operation: typings_1.OPERATION.SELECT, left: 2, right: 5 },
        { operation: typings_1.OPERATION.APPEND, text: 'y there' },
    ],
    output: ['Hello', 'Hello', 'Hey there']
};
const clipboardOperationValidator1 = {
    input: [
        { operation: typings_1.OPERATION.APPEND, text: 'Hello, world!' },
        { operation: typings_1.OPERATION.SELECT, left: 5, right: 12 },
        { operation: typings_1.OPERATION.COPY },
        { operation: typings_1.OPERATION.MOVE, index: 12 },
        { operation: typings_1.OPERATION.PASTE },
        { operation: typings_1.OPERATION.PASTE }
    ],
    output: ['Hello, world!', 'Hello, world!', 'Hello, world!', 'Hello, world!', 'Hello, world, world!', 'Hello, world, world, world!']
};
const validate = (queryProcessor) => {
    [
        textOperationValidator1,
        textOperationValidator2,
        cursorOperationValidator1,
        cursorOperationValidator2,
        cursorOperationValidator3,
        cursorOperationValidator4,
        clipboardOperationValidator1
    ].forEach((validator, index) => {
        const { input, output: expectedOutput } = validator;
        const actualOutput = queryProcessor(input);
        const result = (expectedOutput.length == actualOutput.length) && expectedOutput.every((exOut, index) => exOut == actualOutput[index]);
        console.log(`Test case ${index + 1}: ${result ? 'Correct' : 'Wrong'}`);
        console.log(`Expected: ${expectedOutput}`);
        console.log(`Actual  : ${actualOutput}`);
        console.log('\n\n');
    });
};
exports.validate = validate;
//# sourceMappingURL=test.js.map