// import "mocha";
import { expect } from "chai";
import { ErrorType } from "./modelElement";
import { ErrorBase } from "./errorBase";

describe("ErrorBase", () => {
  it("error creation", () => {
    let sut = new ErrorBase(ErrorType.Warning, "e1", undefined, {
      filename: "file.txt",
      start: {
        line: 13,
        col: 34,
      },
      end: {
        line: 13,
        col: 36,
      },
    });
    expect(sut.element).eql(undefined);
    expect(sut.type).eql(ErrorType.Warning);
    expect(sut.message).eql("e1");
    expect(sut.location.filename).eql("file.txt");
    expect(sut.location.start.line).eql(13);
    expect(sut.location.start.col).eql(34);
    expect(sut.location.end.line).eql(13);
    expect(sut.location.end.col).eql(36);
  });
});
