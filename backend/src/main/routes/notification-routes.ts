import { adaptMiddleware, adaptRoute } from '@/main/adapters';
import { makeAuthMiddleware } from '@/main/factories/middlewares';
import { Router } from 'express';
import { makeDeleteNotificationController, makeGetAllByUserIdNotificationsController, makeGetNotificationByIdController } from '../factories/application/controllers';

export default (router: Router): void => {
  router.get(
    '/notification/:id', // Rota para listar todas as notificações
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetAllByUserIdNotificationsController())
  );

  router.delete(
    '/notification/:id', // Rota para deletar uma notificação pelo ID
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeDeleteNotificationController())
  );
};
