// https://leetcode.com/discuss/interview-question/1596350/Drop-Box-or-OA-or-Text-Editor

import { Query } from "./typings"
import Document from "./Document";
import Editor from './Editor';
import { validate } from "./test";

const queryProcessor = (queries: Query[]): string[] => {
    const editor: Editor = new Editor();
    editor.processQueries(queries);
    return editor.versions;
};

validate(queryProcessor);