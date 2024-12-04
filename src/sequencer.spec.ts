// import "mocha";
import { expect } from 'chai';
import { Sequencer, StaticSequencer } from './sequencer';

describe('Sequencer', () => {
  it('use', () => {
    let sut = new Sequencer('m');

    expect(sut.prefix).eql('m');
    expect(sut.seq).eql(0);
    expect(sut.generateUniqueId()).eql('m0');
    expect(sut.seq).eql(1);
    expect(sut.generateUniqueId()).eql('m1');
    expect(sut.seq).eql(2);
    expect(sut.generateUniqueId()).eql('m2');
    expect(sut.seq).eql(3);
  });
  it('default naming = e*', () => {
    let sut = new Sequencer();

    expect(sut.prefix).eql('e');
    expect(sut.seq).eql(0);
    expect(sut.generateUniqueId()).eql('e0');
  });
  it('reset() works', () => {
    let sut = new Sequencer();

    expect(sut.prefix).eql('e');
    expect(sut.seq).eql(0);
    expect(sut.generateUniqueId()).eql('e0');
    expect(sut.seq).eql(1);
    expect(sut.generateUniqueId()).eql('e1');
    expect(sut.seq).eql(2);
    expect(sut.generateUniqueId()).eql('e2');
    expect(sut.seq).eql(3);

    sut.reset();
    expect(sut.prefix).eql('e');
    expect(sut.seq).eql(0);
    expect(sut.generateUniqueId()).eql('e0');
    expect(sut.seq).eql(1);
  });
});
describe('StaticSequencer', () => {
  it('use', () => {
    let sut = StaticSequencer;

    sut.reset('z');
    expect(sut.generateUniqueId('z')).eql('z0');
    expect(sut.generateUniqueId()).eql('z1');
    expect(sut.generateUniqueId()).eql('z2');
    expect(sut.generateUniqueId()).eql('z3');
    sut.reset('z');
    expect(sut.generateUniqueId()).eql('z0');
    expect(sut.generateUniqueId()).eql('z1');
    expect(sut.generateUniqueId()).eql('z2');
    sut.reset('x');
    expect(sut.generateUniqueId()).eql('x0');
    expect(sut.generateUniqueId()).eql('x1');
    expect(sut.generateUniqueId()).eql('x2');
  });
});
