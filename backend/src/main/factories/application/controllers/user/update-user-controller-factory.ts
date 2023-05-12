import { Controller } from "@/application/controllers";
import { UserRepository } from "@/infra/repositories/mysql/user-repository";
import { UpdateUserController } from "@/application/controllers/user/update-user-controller";
import { makeUpdateUserValidation } from "./update-user-validation";

export const makeUpdateUserController = (): Controller => {
  const userRepository = new UserRepository();
  return new UpdateUserController(makeUpdateUserValidation(), userRepository);
};
