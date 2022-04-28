"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("./typings");
class Document {
    constructor() {
        this.versions = [];
        this.cursor = { left: 0, right: 0 };
        this.text = '';
        this.undoState = [];
        this.redoState = [];
    }
    processQuery(query) {
        const { operation } = query, rest = __rest(query, ["operation"]);
        switch (operation) {
            case typings_1.OPERATION.APPEND:
                this.append(rest.text);
                break;
            case typings_1.OPERATION.DELETE:
                this.delete();
                break;
        }
        this.versions.push(this.text);
    }
    processQueries(queries) {
        queries.forEach(this.processQuery.bind(this));
    }
    append(text = '') {
        const { left, right } = this.cursor;
        const newText = this.text.substring(0, left) + text + this.text.substring(right);
        this.cursor = { left: left + text.length, right: left + text.length };
        this.text = newText;
    }
    delete() {
        const { left, right } = this.cursor;
        if (left == 0 || this.text == '')
            return;
        const offset = left == right ? 1 : 0;
        const newText = this.text.substring(0, left - offset) + this.text.substring(right);
        this.cursor = { left: left - offset, right: left - offset };
        this.text = newText;
    }
}
exports.default = Document;
//# sourceMappingURL=Document.js.map