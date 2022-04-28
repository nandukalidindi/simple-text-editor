// https://leetcode.com/discuss/interview-question/1596350/Drop-Box-or-OA-or-Text-Editor

import { Query } from "./typings"
import Document from "./Document";
import { validate } from "./test";

const queryProcessor = (queries: Query[]): string[] => {
    const document = new Document();
    document.processQueries(queries);
    return document.versions;
};

validate(queryProcessor);