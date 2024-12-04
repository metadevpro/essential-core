import { ModelElement, IError, ErrorType, Location } from "./modelElement";

export class ErrorBase implements IError {
  type: ErrorType;
  message: string;
  element?: ModelElement;
  location: Location;

  constructor(
    type: ErrorType = ErrorType.Error,
    message: string,
    element: ModelElement | undefined,
    location: Location
  ) {
    this.type = type;
    this.message = message;
    this.element = element;
    this.location = location;
  }
}
