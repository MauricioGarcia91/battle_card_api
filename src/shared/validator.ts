import { ZodObject } from 'zod';

export class Validator {
  private schema: ZodObject<any>;

  constructor(schema: ZodObject<any>) {
    this.schema = schema;
  }

  validateSchema = async (input: unknown) => {
    const { data, success, error } = await this.schema.safeParseAsync(input);

    if (!success) {
      return {
        error: error.flatten().fieldErrors
      };
    }

    return { data };
  };

  validatePartialSchema = async (input: unknown) => {
    const { data, success, error } = await this.schema
      .partial()
      .safeParseAsync(input);

    if (!success) {
      return {
        error: error.flatten().fieldErrors
      };
    }

    return { data };
  };
}
