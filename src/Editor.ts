import { OPERATION, Query, EditorOperations } from './typings';
import Document from './Document';
import EditorClipboard from './Clipboard';

class Editor implements EditorOperations {
    documents: Document[] = [];
    clipboard: EditorClipboard = new EditorClipboard();
    versions: string[] = [];
    placeholderDocument: Document = new Document('placeholder', new EditorClipboard());

    get activeDocument(): Document {
        if(this.documents.length > 0) {
            const recentDocument: Document = this.documents[this.documents.length - 1];
            return recentDocument.state === 'OPEN' ? recentDocument : null;
        } else {
            return this.placeholderDocument;
        }
    }

    private processQuery(query: Query): void {
        const { operation, ...rest } = query;
        const documentName = rest.document;

        if(this.activeDocument == null && operation !== OPERATION.OPEN) return;

        switch(operation) {
            case OPERATION.OPEN:
                if(!documentName) break;
                this.open(documentName);
                break;
            case OPERATION.CLOSE:
                if(!documentName) break;
                this.close(documentName);
                break;
            case OPERATION.APPEND:
                this.activeDocument.append(rest.text);
                break;
            case OPERATION.DELETE:
                this.activeDocument.delete();
                break;
            case OPERATION.MOVE:
                this.activeDocument.move(rest.index);
                break;
            case OPERATION.SELECT:
                this.activeDocument.select(rest.left, rest.right);
                break;
            case OPERATION.COPY:
                this.activeDocument.copy();
                break;
            case OPERATION.PASTE:
                this.activeDocument.paste();
                break;
            case OPERATION.UNDO:
                this.activeDocument.undo();
                break;
            case OPERATION.REDO:
                this.activeDocument.redo();
                break;
        }
        
        this.versions.push(this.activeDocument.text);
    }

    public processQueries(queries: Query[]): void {
        queries.forEach(this.processQuery.bind(this));
    } 

    public open(documentName: string): void { 
        const existingDocument: Document = this.documents.find(doc => doc.documentName == documentName);
        if(existingDocument) {
            existingDocument.state = 'OPEN';
            this.documents = [...this.documents.filter(doc => doc.documentName != documentName), existingDocument];
        } else {
            const newDocument: Document = new Document(documentName, this.clipboard);
            this.documents.push(newDocument);
        }
    }

    public close(documentName: string): void {
        const existingDocument: Document = this.documents.find(doc => doc.documentName == documentName);
        if(existingDocument) {
            existingDocument.state = 'CLOSE';
            existingDocument.onClose();
            this.documents = [existingDocument, ...this.documents.filter(doc => doc.documentName != documentName)];
        }
    }
}

export default Editor;