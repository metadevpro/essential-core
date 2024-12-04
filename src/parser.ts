import { ParsingResult } from './parsingResult';

export interface Parser {
  parse(source: string, filename?: string): ParsingResult;
}
