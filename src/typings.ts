export interface EditorOperations {
    open: (documentName: string) => void;
    close: (documentName: string) => void;
}

export interface DocumentTextOperations {
    append: (text: string) => void;
    delete: () => void;
}

export interface DocumentCursorOperations {
    move: (index: number) => void;
    select: (left: number, right: number) => void;
}

export interface DocumentClipboardOperations {
    copy: () => void;
    paste: () => void;
}

export interface DocumentStateOperations {
    undo: () => void;
    redo: () => void;
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
    REDO = "REDO",

    OPEN = "OPEN",
    CLOSE = "CLOSE"
}

export type Query = {
    operation: OPERATION;
    document?: string;
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