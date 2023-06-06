import { ValidationComposite, RequiredFieldValidation } from '@/application/validation';

export const makeCreateNotificationValidation = (): ValidationComposite => {
  const validations: RequiredFieldValidation[] = [];

  const fields = ['text', 'userId', 'createdAt', 'id'];

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
