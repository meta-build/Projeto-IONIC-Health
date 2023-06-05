import { adaptMiddleware, adaptRoute } from '@/main/adapters';
import { makeAuthMiddleware } from '@/main/factories/middlewares';
import { Router } from 'express';
import { makeDeleteNotificationController, makeGetAllNotificationsController, makeGetNotificationByIdController,  } from '../factories/application/controllers';

export default (router: Router): void => {
  // Outras rotas existentes...
  router.get(
    '/notification/:id', // Rota para obter uma notificação pelo ID
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetNotificationByIdController())
  );

  router.get(
    '/notification', // Rota para listar todas as notificações
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetAllNotificationsController())
  );

  router.delete(
    '/notification/:id', // Rota para deletar uma notificação pelo ID
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeDeleteNotificationController())
  );
};
