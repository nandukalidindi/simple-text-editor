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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("./typings");
const Document_1 = __importDefault(require("./Document"));
const Clipboard_1 = __importDefault(require("./Clipboard"));
class Editor {
    constructor() {
        this.documents = [];
        this.clipboard = new Clipboard_1.default();
        this.versions = [];
        this.placeholderDocument = new Document_1.default('Placeholder', new Clipboard_1.default());
    }
    get activeDocument() {
        if (this.documents.length > 0) {
            const recentDocument = this.documents[this.documents.length - 1];
            return recentDocument.state === 'OPEN' ? recentDocument : null;
        }
        else {
            return this.placeholderDocument;
        }
    }
    processQuery(query) {
        const { operation } = query, rest = __rest(query, ["operation"]);
        const documentName = rest.document;
        if (this.activeDocument == null)
            return;
        switch (operation) {
            case typings_1.OPERATION.OPEN:
                if (!documentName)
                    break;
                this.open(documentName);
                break;
            case typings_1.OPERATION.CLOSE:
                if (!documentName)
                    break;
                this.close(documentName);
                break;
            case typings_1.OPERATION.APPEND:
                this.activeDocument.append(rest.text);
                break;
            case typings_1.OPERATION.DELETE:
                this.activeDocument.delete();
                break;
            case typings_1.OPERATION.MOVE:
                this.activeDocument.move(rest.index);
                break;
            case typings_1.OPERATION.SELECT:
                this.activeDocument.select(rest.left, rest.right);
                break;
            case typings_1.OPERATION.COPY:
                this.activeDocument.copy();
                break;
            case typings_1.OPERATION.PASTE:
                this.activeDocument.paste();
                break;
            case typings_1.OPERATION.UNDO:
                this.activeDocument.undo();
                break;
            case typings_1.OPERATION.REDO:
                this.activeDocument.redo();
                break;
        }
        this.versions.push(this.activeDocument.text);
    }
    processQueries(queries) {
        queries.forEach(this.processQuery.bind(this));
    }
    open(documentName) {
        const existingDocument = this.documents.find(doc => doc.documentName == documentName);
        if (existingDocument) {
            existingDocument.state = 'OPEN';
            this.documents = [...this.documents.filter(doc => doc.documentName != documentName), existingDocument];
        }
        else {
            const newDocument = new Document_1.default(documentName, this.clipboard);
            this.documents.push(newDocument);
        }
    }
    close(documentName) {
        const existingDocument = this.documents.find(doc => doc.documentName == documentName);
        if (existingDocument) {
            existingDocument.state = 'CLOSE';
            existingDocument.onClose();
            this.documents = [existingDocument, ...this.documents.filter(doc => doc.documentName != documentName)];
        }
    }
}
exports.default = Editor;
//# sourceMappingURL=Editor.js.map