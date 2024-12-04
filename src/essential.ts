import { ModelElement, Model, VisitMode } from './modelElement';

export class Essential {
  static load(fileName: string, callback: () => void) {
    callback();
  }
  static save(model: Model, fileName: string, callback: () => void): void {
    callback();
  }

  /**
   * Fast hashcode function for strings
   */
  static getHashCode(input: string): number {
    if (input === null || input === undefined) {
      return 0;
    }
    let hash = 0;
    let i = 0;
    const len = input.length;
    while (i < len) {
      hash = ((hash << 5) - hash + input.charCodeAt(i++)) << 0;
    }
    return hash;
  }

  static isModelElement(obj: unknown): obj is ModelElement {
    if (!obj) {
      return false;
    }
    if (!(typeof obj === <string>'object')) {
      return false;
    }
    // todo (check ModelElement with duck typing)
    if ((obj as unknown[]).length >= 0) {
      return false;
    } // collection
    return Object.prototype.hasOwnProperty.call(obj, '_meta');
  }
  static isModelElementCollection(obj: unknown): obj is ModelElement[] {
    if (!obj) {
      return false;
    }
    if (!(typeof obj === <string>'object')) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(obj, 'length')) {
      const arr = obj as unknown[];
      if (arr.length > 0 && arr[0]) {
        const first = arr[0];
        return Essential.isModelElement(first);
      }
      return true; // Empty array []
    }
    return false; // Not an array
  }
  static asModelElement(obj: unknown): ModelElement | null {
    if (Essential.isModelElement(obj)) {
      return <ModelElement>obj;
    }
    return null;
  }
  static asModelElementCollection(obj: unknown): ModelElement[] | null {
    if (Essential.isModelElementCollection(obj)) {
      return <ModelElement[]>obj;
    }
    return null;
  }

  static collectionToJson(col: ModelElement[]): string {
    if (!col) {
      return 'null';
    }
    const str = col.map((it: ModelElement) => {
      return it.toJson();
    });
    if (str.length === 0) {
      return '[]';
    }
    const res = str.reduce((t1, t2) => {
      return t1 + ',' + t2;
    });
    return '[' + res + ']';
  }

  static toEssential(m: ModelElement): string {
    let res = '';
    if (!m) {
      return '';
    }
    m.visit(VisitMode.PreOrder, (it) => {
      res += it.toEssential();
    });
    return res;
  }
  static refToEssential(me: ModelElement): string {
    return me.getId();
  }
  static collectionToEssential(col: ModelElement[]): string {
    if (!col || col.length === 0) {
      return '[]';
    }
    const strs = col.map((it) => {
      return Essential.refToEssential(it);
    });
    const res = strs.reduce((t1, t2) => {
      return t1 + ', ' + t2;
    });
    return '[' + res + ']';
  }
  static primitiveTypeToEssential(value: unknown): string | null {
    if (!value) {
      return null;
    }
    if (value === true) {
      return 'true';
    }
    if (value === false) {
      return 'false';
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    return '"' + value.toString() + '"';
  }
}
