// import "mocha";
import { expect } from "chai";
import { Essential } from "./essential";
import { ModelElementBase } from "./modelElementBase";

describe("essential", () => {
  it("isModelElement", () => {
    expect(Essential.isModelElement(1)).eql(false);
    expect(Essential.isModelElement("a")).eql(false);
    expect(Essential.isModelElement(null)).eql(false);
    expect(Essential.isModelElement(false)).eql(false);
    expect(Essential.isModelElement([])).eql(false);
    expect(Essential.isModelElement(["a", "b"])).eql(false);

    const c = [new ModelElementBase(), new ModelElementBase()];
    expect(Essential.isModelElement(c)).eql(false);

    expect(Essential.isModelElement(new ModelElementBase())).eql(true);
  });
  it("isModelElementCollection", () => {
    expect(Essential.isModelElementCollection(1)).eql(false);
    expect(Essential.isModelElementCollection("a")).eql(false);
    expect(Essential.isModelElementCollection(null)).eql(false);
    expect(Essential.isModelElementCollection(false)).eql(false);
    expect(Essential.isModelElementCollection(["a", "b"])).eql(false);
    expect(Essential.isModelElementCollection(new ModelElementBase())).eql(
      false
    );

    expect(Essential.isModelElementCollection([])).eql(true);

    const c = [new ModelElementBase(), new ModelElementBase()];
    expect(Essential.isModelElementCollection(c)).eql(true);
  });
  it("asModelElement", () => {
    expect(Essential.asModelElement(1)).eql(null);
    expect(Essential.asModelElement("a")).eql(null);
    expect(Essential.asModelElement(null)).eql(null);
    expect(Essential.asModelElement(false)).eql(null);
    expect(Essential.asModelElement([])).eql(null);
    expect(Essential.asModelElement(["a", "b"])).eql(null);

    const c = [new ModelElementBase(), new ModelElementBase()];
    expect(Essential.asModelElement(c)).eql(null);

    const me = new ModelElementBase();
    expect(Essential.asModelElement(me)).eql(me);
  });
  it("asModelElementCollection", () => {
    expect(Essential.asModelElementCollection(1)).eql(null);
    expect(Essential.asModelElementCollection("a")).eql(null);
    expect(Essential.asModelElementCollection(null)).eql(null);
    expect(Essential.asModelElementCollection(false)).eql(null);
    expect(Essential.asModelElementCollection([])).eql([]);
    expect(Essential.asModelElementCollection(["a", "b"])).eql(null);

    const c = [new ModelElementBase(), new ModelElementBase()];
    expect(Essential.asModelElementCollection(c)).eql(c);

    const me = new ModelElementBase();
    expect(Essential.asModelElementCollection(me)).eql(null);
  });
});
