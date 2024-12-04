// ModelElement, Error definitions

export enum ErrorType {
  None = 0,
  Info = 1,
  Warning = 2,
  Error = 3
}
export interface Location {
  filename: string;
  start: Position;
  end: Position;
}
export interface Position {
  line: number;
  col: number;
}

export interface IError {
  message: string;
  element?: ModelElement;
  type: ErrorType;
  location: Location;
}
export enum VisitMode {
  PreOrder = 0,
  PostOrder = 1
}
export interface MetaInfo {
  id: string;
  model?: Model;
  parent?: ModelElement;
  location?: Location;
}
export interface ModelElement {
  _meta: MetaInfo;

  getId(): string;
  getTypeName(): string;
  toString(): string;
  toJson(): string;
  toEssential(): string;
  validate(): IError[];
  visit(visitMode: VisitMode, action: (el: ModelElement) => void): void;

  // equality. to be overrided
  identity(): unknown;
  hashCodeElement(): number;

  // equality. generic
  hashCode(): number;
  sameConcept(b: ModelElement): boolean;
  equals(b: ModelElement): boolean;

  // mergeWith(b: ModelElement): void;
  // diffWith(b: ModelElement): Difference[];
}

export interface Model extends ModelElement {
  modelName: string;
  version: string;
}
