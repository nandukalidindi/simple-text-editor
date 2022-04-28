"use strict";
// https://leetcode.com/discuss/interview-question/1596350/Drop-Box-or-OA-or-Text-Editor
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = __importDefault(require("./Document"));
const test_1 = require("./test");
const queryProcessor = (queries) => {
    const document = new Document_1.default();
    document.processQueries(queries);
    return document.versions;
};
(0, test_1.validate)(queryProcessor);
//# sourceMappingURL=index.js.map