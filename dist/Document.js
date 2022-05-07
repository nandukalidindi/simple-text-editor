"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Document {
    constructor(documentName, clipboard) {
        this.state = 'CLOSE';
        this.documentName = '';
        this.cursor = { left: 0, right: 0 };
        this.text = '';
        this.clipboard = null;
        this.undoState = [];
        this.redoState = [];
        this.documentName = documentName;
        this.clipboard = clipboard;
        this.state = 'OPEN';
    }
    onClose() {
        this.cursor = { left: this.text.length, right: this.text.length };
        this.undoState = [];
        this.redoState = [];
    }
    append(text = '') {
        this.undoState.push({ cursor: this.cursor, text: this.text });
        const { left, right } = this.cursor;
        const newText = this.text.substring(0, left) + text + this.text.substring(right);
        this.cursor = { left: left + text.length, right: left + text.length };
        this.text = newText;
    }
    delete() {
        this.undoState.push({ cursor: this.cursor, text: this.text });
        const { left, right } = this.cursor;
        if (left == 0 || this.text == '')
            return;
        const offset = (left == right) ? 1 : 0;
        const newText = this.text.substring(0, left - offset) + this.text.substring(right);
        this.cursor = { left: left - offset, right: left - offset };
        this.text = newText;
    }
    move(index = this.cursor.left) {
        this.cursor = { left: index, right: index };
    }
    select(left = this.cursor.left, right = this.cursor.right) {
        this.cursor = { left, right };
    }
    copy() {
        const { left, right } = this.cursor;
        this.clipboard.text = this.text.substring(left, right);
    }
    paste() {
        this.undoState.push({ cursor: this.cursor, text: this.text });
        this.append(this.clipboard.text);
    }
    undo() {
        if (this.undoState.length > 0) {
            this.redoState.push({ text: this.text, cursor: this.cursor });
            const { cursor, text } = this.undoState.pop();
            this.text = text;
            this.cursor = cursor;
        }
    }
    redo() {
        if (this.redoState.length > 0) {
            this.undoState.push({ text: this.text, cursor: this.cursor });
            const { cursor, text } = this.redoState.pop();
            this.text = text;
            this.cursor = cursor;
        }
    }
}
exports.default = Document;
//# sourceMappingURL=Document.js.map