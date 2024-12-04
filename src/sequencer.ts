export class Sequencer {
  seq: number = 0;
  prefix: string = '';

  constructor(prefix: string = 'e') {
    this.prefix = prefix;
  }
  generateUniqueId(): string {
    return this.prefix + this.seq++;
  }
  reset() {
    this.seq = 0;
  }
}

export class StaticSequencer {
  static seq?: Sequencer;
  static prefix: string = 'e';

  static generateUniqueId(prefix: string = 'e'): string {
    StaticSequencer.lazyInit(prefix);
    return StaticSequencer.seq!.generateUniqueId();
  }
  static reset(prefix: string) {
    StaticSequencer.seq = undefined;
    StaticSequencer.lazyInit(prefix);
  }
  private static lazyInit(prefix: string) {
    if (!StaticSequencer.seq) {
      StaticSequencer.prefix = prefix || 'e';
      StaticSequencer.seq = new Sequencer(StaticSequencer.prefix);
    }
  }
}
