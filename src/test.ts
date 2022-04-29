import { OPERATION, Query, Validator } from "./typings";

const validator1: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: 'Hey' },
        { operation: OPERATION.APPEND, text: ' there' },
        { operation: OPERATION.APPEND, text: '!' },
    ], 
    output: ['Hey', 'Hey there', 'Hey there!']
};

const validator2: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: 'Hey you' },
        { operation: OPERATION.MOVE, index: 3 },
        { operation: OPERATION.APPEND, text: ',' },
    ], 
    output: ['Hey you', 'Hey you', 'Hey, you']
};

const validator3: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: 'Hello! world!' },
        { operation: OPERATION.MOVE, index: 6 },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.APPEND, text: ',' },
    ], 
    output: ['Hello! world!', 'Hello! world!', 'Hello world!', 'Hello, world!']
};

const validator4: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: '!' },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.MOVE, index: 0 },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.DELETE },
    ], 
    output: ['!', '', '', '', '']
};

const validator5: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello cruel world!' },
        { operation: OPERATION.SELECT, left: 5, right: 11 },
        { operation: OPERATION.APPEND, text: ',' }
    ],
    output: ['Hello cruel world!', 'Hello cruel world!', 'Hello, world!']
};

const validator6: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello' },
        { operation: OPERATION.SELECT, left: 2, right: 5 },
        { operation: OPERATION.APPEND, text: 'y there' },
    ],
    output: ['Hello', 'Hello', 'Hey there']
};

export const validate = (queryProcessor: (queries: Query[]) => string[]): void => {
    [
        validator1,
        validator2,
        validator3,
        validator4,
        validator5,
        validator6
    ].forEach((validator: Validator, index: number) => {
        const { input, output: expectedOutput } = validator;
        const actualOutput = queryProcessor(input);

        const result = (expectedOutput.length == actualOutput.length) && expectedOutput.every((exOut, index) => exOut == actualOutput[index]);
        console.log(`Test case ${index + 1}: ${result ? 'Correct' : 'Wrong'}`);
        console.log(`Expected: ${expectedOutput}`);
        console.log(`Actual  : ${actualOutput}`);
        console.log('\n\n');
    })
}