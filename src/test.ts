import { OPERATION, Query, Validator } from "./typings";

const textOperationValidator1: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: 'Hey' },
        { operation: OPERATION.APPEND, text: ' there' },
        { operation: OPERATION.APPEND, text: '!' },
    ], 
    output: ['Hey', 'Hey there', 'Hey there!']
};

const textOperationValidator2: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: 'Hey you' },
        { operation: OPERATION.MOVE, index: 3 },
        { operation: OPERATION.APPEND, text: ',' },
    ], 
    output: ['Hey you', 'Hey you', 'Hey, you']
};

const cursorOperationValidator1: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: 'Hello! world!' },
        { operation: OPERATION.MOVE, index: 6 },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.APPEND, text: ',' },
    ], 
    output: ['Hello! world!', 'Hello! world!', 'Hello world!', 'Hello, world!']
};

const cursorOperationValidator2: Validator = { 
    input: [
        { operation: OPERATION.APPEND, text: '!' },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.MOVE, index: 0 },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.DELETE },
    ], 
    output: ['!', '', '', '', '']
};

const cursorOperationValidator3: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello cruel world!' },
        { operation: OPERATION.SELECT, left: 5, right: 11 },
        { operation: OPERATION.APPEND, text: ',' }
    ],
    output: ['Hello cruel world!', 'Hello cruel world!', 'Hello, world!']
};

const cursorOperationValidator4: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello' },
        { operation: OPERATION.SELECT, left: 2, right: 5 },
        { operation: OPERATION.APPEND, text: 'y there' },
    ],
    output: ['Hello', 'Hello', 'Hey there']
};

const clipboardOperationValidator1: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello, world!' },
        { operation: OPERATION.SELECT, left: 5, right: 12 },
        { operation: OPERATION.COPY },
        { operation: OPERATION.MOVE, index: 12 },
        { operation: OPERATION.PASTE },
        { operation: OPERATION.PASTE }
    ],
    output: ['Hello, world!', 'Hello, world!', 'Hello, world!', 'Hello, world!', 'Hello, world, world!', 'Hello, world, world, world!']
};

const undoRedoOperationValidator1: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello, world!' },
        { operation: OPERATION.SELECT, left: 7, right: 12 },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.UNDO },
        { operation: OPERATION.APPEND, text: 'you' },
    ],
    output: ['Hello, world!', 'Hello, world!', 'Hello, !', 'Hello, world!', 'Hello, you!']
};

const undoRedoOperationValidator2: Validator = {
    input: [
        { operation: OPERATION.APPEND, text: 'Hello, world!' },
        { operation: OPERATION.SELECT, left: 7, right: 12 },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.MOVE, index: 6 },
        { operation: OPERATION.UNDO },
        { operation: OPERATION.UNDO },
        { operation: OPERATION.REDO },
        { operation: OPERATION.REDO }
    ],
    output: ['Hello, world!', 'Hello, world!', 'Hello, !', 'Hello, !', 'Hello, world!', '', 'Hello, world!', 'Hello, !']
};

const openCloseOperationValidator1: Validator = {
    input: [
        { operation: OPERATION.OPEN, document: 'document1' },
        { operation: OPERATION.APPEND, text: 'Hello, world!' },
        { operation: OPERATION.SELECT, left: 7, right: 12 },
        { operation: OPERATION.COPY },
        { operation: OPERATION.DELETE },
        { operation: OPERATION.OPEN, document: 'document2' },
        { operation: OPERATION.PASTE },
        { operation: OPERATION.CLOSE, document: 'document2' },
        { operation: OPERATION.UNDO },
        { operation: OPERATION.OPEN, document: 'document2' },
        { operation: OPERATION.UNDO },
    ],
    output: ['', 'Hello, world!', 'Hello, world!', 'Hello, world!', 'Hello, !', '', 'world', 'Hello, !', 'Hello, world!', 'world', 'world']
}

export const validate = (queryProcessor: (queries: Query[]) => string[]): void => {
    [
        textOperationValidator1,
        textOperationValidator2,
        cursorOperationValidator1,
        cursorOperationValidator2,
        cursorOperationValidator3,
        cursorOperationValidator4,
        clipboardOperationValidator1,
        undoRedoOperationValidator1,
        undoRedoOperationValidator2,
        openCloseOperationValidator1
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