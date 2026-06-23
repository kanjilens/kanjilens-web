export interface FieldValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  details?: string;
}

export interface ValidationErrorResponse extends ApiErrorResponse {
  errors: FieldValidationError[];
}

// Compatible with errors thrown/caught when using the Fetch API.
export interface UnknownError {
  // fetch may provide a Response object, or an object with status/data (e.g. wrapped libraries),
  // or be null for network errors where a TypeError is thrown.
  response?:
    | Response
    | {
        status: number;
        statusText?: string;
        headers?: Record<string, any>;
        data?:
          | {
              error?: string;
              message?: string;
              details?: any;
            }
          | string;
      }
    | null;
  message: string;
  name?: string;
  stack?: string;
}
