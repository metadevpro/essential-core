import { IError, Model } from './modelElement';
import { ModelElementBase } from './modelElementBase';

export class ModelBase extends ModelElementBase implements Model {
  modelName: string;
  version: string = '0';

  constructor(options: any = {}) {
    super(options);
    if (options.modelName) {
      this.modelName = options.modelName;
    }
    if (options.version) {
      this.version = options.version;
    }
  }
  toString(): string {
    return this.getTypeName() + ` ${this.modelName} v. ${this.version}`;
  }
  validate(): IError[] {
    return [];
  }
}
