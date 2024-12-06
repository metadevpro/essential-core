import { expect } from 'chai';
import { ModelElementBase } from './modelElementBase';
import { VisitMode } from './modelElement';

let sut!: ModelElementBase;
describe('ModelElementBase', () => {
  beforeEach(() => {
    sut = new ModelElementBase();
  });

  it('getId() is not null', () => {
    expect(sut.getId()).not.eqls(null);
  });
  it('getId() is string', () => {
    expect(sut.getId()).not.eqls(null);
    expect(typeof sut.getId()).eqls('string');
  });
  it('getTypeName() is ModelElementDef', () => {
    expect(sut.getTypeName()).eqls('ModelElementBase');
  });

  it('identity check', () => {
    expect(sut.identity()).eqls(sut.identity());
    const sut2 = new ModelElementBase();
    expect(sut2.identity()).not.eqls(sut.identity());
  });
  it('sameConcept() compared with null', () => {
    expect(sut.sameConcept(null)).eqls(false);
  });
  it('sameConcept() compared with undefined', () => {
    expect(sut.sameConcept(undefined)).eqls(false);
  });
  it('sameConcept() compared with self', () => {
    expect(sut.sameConcept(sut)).eqls(true);
  });
  it('sameConcept() compared with other', () => {
    const sut2 = new ModelElementBase();
    expect(sut.sameConcept(sut2)).eqls(false);
  });
  it('equals() compared with self', () => {
    expect(sut.equals(sut)).eqls(true);
  });
  it('equals() compared with other', () => {
    const sut2 = new ModelElementBase();
    expect(sut.sameConcept(sut2)).eqls(false);
  });
  it('hashCodeElement() compared with other', () => {
    const sut2 = new ModelElementBase();
    const hash1 = sut.hashCodeElement();
    const hash2 = sut2.hashCodeElement();
    expect(hash1).not.eqls(hash2);
  });
  it('hashCodeElement() compared with self', () => {
    const hash1 = sut.hashCodeElement();
    const hash2 = sut.hashCodeElement();
    expect(hash1).eqls(hash2);
  });
  it('visit() preOrder', () => {
    let acc = 0;
    sut.visit(VisitMode.PreOrder, () => {
      acc++;
    });
    expect(acc).eqls(1);
  });
  it('visit() postOrder', () => {
    let acc = 0;
    sut.visit(VisitMode.PostOrder, () => {
      acc++;
    });
    expect(acc).eqls(1);
  });
  it('toJson()', () => {
    expect(sut.toJson()).eqls('{}');
  });
  it('toEssential()', () => {
    const id = sut._meta.id;
    expect(sut.toEssential()).eqls(`ModelElementBase ${id} {\n}\n`);
  });
  it('visitChildren()', () => {
    let acc = 0;
    sut.visitChildren(VisitMode.PreOrder, () => {
      acc++;
    });
    expect(acc).eqls(0);
  });
  it('validate()', () => {
    expect(sut.validate()).eqls([]);
  });
});
