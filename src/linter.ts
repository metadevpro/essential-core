import { ParsingResult } from './parsingResult';

export interface Linter {
  lint(pr: ParsingResult): ParsingResult;
}
