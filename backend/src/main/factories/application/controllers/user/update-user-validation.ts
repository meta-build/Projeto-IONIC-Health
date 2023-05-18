import { UserRepository } from "@/infra/repositories/mysql/user-repository";
import {
  EmailValidation,
  Validation,
  ValidationComposite,
} from "@/application/validation";

type HttpRequest = {
  param: { id: number };
}
export const makeUpdateUserValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  validations.push(new EmailValidation("email"));

  return new ValidationComposite(validations);
};
