import { IError } from './modelElement';

export interface ParsingResult {
  filename?: string;
  source: string;
  success: boolean;
  errors: IError[];
  ast: unknown;
}
