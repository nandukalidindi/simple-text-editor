export interface EditorTextOperations {
    append: (text: string) => void;
    delete: () => void;
}

export interface EditorCursorOperations {
    move: (index: number) => void;
    select: (left: number, right: number) => void;
}

export interface EditorStateOperations {
    undo: () => string;
    redo: () => string;
}

export type Cursor = {
    left: number;
    right: number;
}

export type EditorState = {
    cursor: Cursor;
    text: string;
}

export enum OPERATION {
    APPEND = "APPEND",
    DELETE = "DELETE",

    MOVE = "MOVE",
    SELECT = "SELECT",

    COPY = "COPY",
    PASTE = "PASTE",

    UNDO = "UNDO",
    REDO = "REDO"
}

export type Query = {
    operation: OPERATION;
    text?: string;
    index?: number;
    left?: number;
    right?: number;
}

export type AppendQuery = Query & {
    text: string;
}

export type DeleteQuery = Query;

export type MoveQuery = Query & {
    index: number;
}

export type SelectQuery = Query & {
    left: number;
    right: number;
}

export type Validator = {
    input: Query[];
    output: string[];
}