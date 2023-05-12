import {
  EmailValidation,
  Validation,
  ValidationComposite,
} from "@/application/validation";

export const makeUpdateUserValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  validations.push(new EmailValidation("email"));

  return new ValidationComposite(validations);
};
