import { 
    Cursor, EditorState,
    DocumentTextOperations, DocumentCursorOperations, DocumentClipboardOperations, DocumentStateOperations
} from './typings';
import EditorClipboard from './Clipboard';

class Document implements DocumentTextOperations, DocumentCursorOperations, DocumentClipboardOperations, DocumentStateOperations {
    state: string = 'CLOSE';
    documentName: string = '';
    cursor: Cursor = { left: 0, right: 0 };
    text: string = '';
    clipboard: EditorClipboard = null;
    undoState: EditorState[] = [];
    redoState: EditorState[] = [];

    constructor(documentName: string, clipboard: EditorClipboard) {
        this.documentName = documentName;
        this.clipboard = clipboard;
        this.state = 'OPEN';
    }

    public onClose(): void {
        this.cursor = { left: this.text.length, right: this.text.length };
        this.undoState = [];
        this.redoState = [];
    }

    public append(text: string = ''): void {
        this.undoState.push({ cursor: this.cursor, text: this.text });

        const { left, right } = this.cursor;
        const newText = this.text.substring(0, left) + text + this.text.substring(right);

        this.cursor = { left: left + text.length, right: left + text.length };
        this.text = newText;
    }

    public delete(): void {
        this.undoState.push({ cursor: this.cursor, text: this.text });

        const { left, right } = this.cursor;

        if(left == 0 || this.text == '') return;

        const offset: number = (left == right) ? 1 : 0;
        const newText = this.text.substring(0, left - offset) + this.text.substring(right);

        this.cursor = { left: left - offset, right: left - offset };
        this.text = newText;
    }

    public move(index: number = this.cursor.left): void {
        this.cursor = { left: index, right: index };
    }

    public select(left: number = this.cursor.left, right: number = this.cursor.right): void {
        this.cursor = { left, right };
    }

    public copy(): void {
        const { left, right } = this.cursor;
        this.clipboard.text = this.text.substring(left, right);
    }

    public paste(): void {
        this.undoState.push({ cursor: this.cursor, text: this.text });
        this.append(this.clipboard.text);
    }

    public undo(): void {
        if(this.undoState.length > 0) {
            this.redoState.push({ text: this.text, cursor: this.cursor });
            const { cursor, text } = this.undoState.pop()!;
            this.text = text;
            this.cursor = cursor;
        }
    }

    public redo(): void { 
        if(this.redoState.length > 0) {
            this.undoState.push({ text: this.text, cursor: this.cursor });
            const { cursor, text } = this.redoState.pop()!;
            this.text = text;
            this.cursor = cursor;
        }
    }
}

export default Document;