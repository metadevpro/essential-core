import { ModelElement, Model, VisitMode } from "./modelElement";

export class Essential {
  static load(fileName: string, callback: Function) {
    callback();
  }
  static save(model: Model, fileName: string, callback: Function): void {
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
    let len = input.length;
    while (i < len) {
      hash = ((hash << 5) - hash + input.charCodeAt(i++)) << 0;
    }
    return hash;
  }

  static isModelElement(obj: any): obj is ModelElement {
    if (!obj) {
      return false;
    }
    if (!(typeof obj === <string>"object")) {
      return false;
    }
    // todo (check ModelElement with duck typing)
    if (obj.length >= 0) {
      return false;
    } // collection
    return obj.hasOwnProperty("_meta");
  }
  static isModelElementCollection(obj: any): obj is ModelElement[] {
    if (!obj) {
      return false;
    }
    if (!(typeof obj === <string>"object")) {
      return false;
    }
    if (obj.hasOwnProperty("length")) {
      if (obj.length > 0 && obj[0]) {
        let first = obj[0];
        return Essential.isModelElement(first);
      }
      return true; // Empty array []
    }
    return false; // Not an array
  }
  static asModelElement(obj: any): ModelElement | null {
    if (Essential.isModelElement(obj)) {
      return <ModelElement>obj;
    }
    return null;
  }
  static asModelElementCollection(obj: any): ModelElement[] | null {
    if (Essential.isModelElementCollection(obj)) {
      return <ModelElement[]>obj;
    }
    return null;
  }

  static collectionToJson(col: ModelElement[]): string {
    if (!col) {
      return "null";
    }
    let str = col.map((it: ModelElement) => {
      return it.toJson();
    });
    if (str.length === 0) {
      return "[]";
    }
    let res = str.reduce((t1, t2) => {
      return t1 + "," + t2;
    });
    return "[" + res + "]";
  }

  static toEssential(m: ModelElement): string {
    let res = "";
    if (!m) {
      return "";
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
      return "[]";
    }
    let strs = col.map((it) => {
      return Essential.refToEssential(it);
    });
    let res = strs.reduce((t1, t2) => {
      return t1 + ", " + t2;
    });
    return "[" + res + "]";
  }
  static primitiveTypeToEssential(value: any): string | null {
    if (!value) {
      return null;
    }
    if (value === true) {
      return "true";
    }
    if (value === false) {
      return "false";
    }
    if (typeof value === "number") {
      return value.toString();
    }
    return '"' + value.toString() + '"';
  }
}
