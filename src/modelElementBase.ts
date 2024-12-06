import { Essential } from './essential';
import { ModelElement, VisitMode, MetaInfo, Location } from './modelElement';
import { ErrorBase } from './errorBase';
import { StaticSequencer } from './sequencer';

export interface ModelElementBaseBuilder {
  id?: string;
  location?: Location;
}

export class ModelElementBase implements ModelElement {
  _meta: MetaInfo;

  constructor(options: ModelElementBaseBuilder = {}) {
    options = options || {};
    this._meta = {
      id: options.id || StaticSequencer.generateUniqueId('e')
    };
    if (options.location) {
      this._meta.location = options.location;
    }
  }
  getId(): string {
    return this._meta.id;
  }
  getTypeName(): string {
    const name = this.constructor.toString().match(/\w+/g);
    return name && name.length > 2 ? name[1] : '';
  }
  toString(): string {
    return this.getTypeName();
  }

  // equality -----------
  /**
   * Identity definition.
   * To be overrided in descendent classes
   */
  identity(): unknown {
    return this.getTypeName() + '_' + this.getId(); // default implementation
  }
  /**
   * sameConcept check. based on same identity
   */
  sameConcept(b: ModelElement | null | undefined): boolean {
    if (!b) {
      return false;
    }
    return this.identity() === b.identity();
  }

  /**
   * equality based on property checking (deep check)
   */
  equals(b: ModelElement): boolean {
    if (!b) {
      return false;
    }
    return this.hashCode() === b.hashCode();
  }
  /**
   * Hash code for all properties of the object + descendants
   * To be overrided in descendent classes.
   */
  hashCodeElement(): number {
    return Essential.getHashCode(this.getTypeName() + this.getId());
  }
  /**
   * Hash code for all model tree (for dirty checking)
   */
  hashCode(): number {
    let acc = 0;
    this.visit(VisitMode.PreOrder, (it) => {
      acc ^= it.hashCodeElement();
      acc = acc << 3;
    });
    return acc;
  }

  visit(visitMode: VisitMode, action: (el: ModelElement) => void): void {
    if (visitMode === VisitMode.PreOrder) {
      this.visitNode(action);
      this.visitChildren(visitMode, action);
    } else if (visitMode === VisitMode.PostOrder) {
      this.visitChildren(visitMode, action);
      this.visitNode(action);
    }
  }
  toJson(): string {
    let res = '{';
    let prefix = '';
    for (const prop in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, prop) &&
        prop !== '_meta'
      ) {
        const value = this[prop];
        let payload = '';
        const el = Essential.asModelElement(value);
        const elCol = Essential.asModelElementCollection(value);
        if (elCol) {
          payload = Essential.collectionToJson(elCol);
        } else if (el) {
          payload = el.toJson();
        } else {
          payload = JSON.stringify(value);
        }
        res += prefix + '"' + prop + '":' + payload;
        prefix = ',';
      }
    }
    return res + '}';
  }
  toEssential(): string {
    let res = this.getTypeName() + ' ' + this.getId() + ' {\n';
    for (const prop in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, prop) &&
        prop !== '_meta'
      ) {
        const value = this[prop];
        let payload = '';
        const el = Essential.asModelElement(value);
        const elCol = Essential.asModelElementCollection(value);
        if (elCol) {
          payload = Essential.collectionToEssential(elCol);
        } else if (el) {
          payload = Essential.refToEssential(el);
        } else {
          payload = Essential.primitiveTypeToEssential(value) || '';
        }
        res += '  ' + prop + ' = ' + payload + ';\n';
      }
    }
    return res + '}\n';
  }
  private visitNode(action: (el: ModelElement) => void) {
    action(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visitChildren(visitMode: VisitMode, action: (el: ModelElement) => void) {
    // Overriden in descendent clases
    //throw new Error('Unimplemented');
  }
  validate(): ErrorBase[] {
    return [];
  }
}
