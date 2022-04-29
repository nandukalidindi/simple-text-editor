import { Cursor, EditorTextOperations, EditorCursorOperations, EditorClipboardOperations, EditorState, OPERATION, Query, AppendQuery } from './typings';

class Document implements EditorTextOperations, EditorCursorOperations, EditorClipboardOperations {
    versions: string[] = [];
    cursor: Cursor = { left: 0, right: 0 };
    text: string = '';
    clipboard: string = '';
    undoState: EditorState[] = [];
    redoState: EditorState[] = [];

    private processQuery(query: Query): void {
        const { operation, ...rest } = query;

        switch(operation) {
            case OPERATION.APPEND:
                this.append(rest.text);
                break;
            case OPERATION.DELETE:
                this.delete();
                break;
            case OPERATION.MOVE:
                this.move(rest.index);
                break;
            case OPERATION.SELECT:
                this.select(rest.left, rest.right);
                break;
            case OPERATION.COPY:
                this.copy();
                break;
            case OPERATION.PASTE:
                this.paste();
                break;
        }
        
        this.versions.push(this.text);
    }

    public processQueries(queries: Query[]): void {
        queries.forEach(this.processQuery.bind(this));
    }

    public append(text: string = ''): void {
        const { left, right } = this.cursor;
        const newText = this.text.substring(0, left) + text + this.text.substring(right);

        this.cursor = { left: left + text.length, right: left + text.length };
        this.text = newText;
    }

    public delete(): void {
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
        this.clipboard = this.text.substring(left, right);
    }

    public paste(): void {
        this.append(this.clipboard);
    }
}

export default Document;