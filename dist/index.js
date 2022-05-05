"use strict";
// https://leetcode.com/discuss/interview-question/1596350/Drop-Box-or-OA-or-Text-Editor
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Editor_1 = __importDefault(require("./Editor"));
const test_1 = require("./test");
const queryProcessor = (queries) => {
    const editor = new Editor_1.default();
    editor.processQueries(queries);
    return editor.versions;
};
(0, test_1.validate)(queryProcessor);
//# sourceMappingURL=index.js.map