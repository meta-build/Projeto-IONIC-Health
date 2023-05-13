import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertPermissions1683759321417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			INSERT INTO permission (permissionName, humanizedPermissionName, entity, humanizedEntity)
			VALUES
			('CreateUser', 'Criar Usuário', 'User', 'Usuários'),
			('UpdateUser', 'Editar Usuário', 'User', 'Usuários'),
			('DeleteUser', 'Excluir Usuário', 'User', 'Usuários'),
			('CreateRole', 'Criar Grupo', 'Role', 'Grupos'),
			('UpdateRole', 'Editar Grupo', 'Role', 'Grupos'),
			('DeleteRole', 'Excluir Grupo', 'Role', 'Grupos'),
			('CreateTicket', 'Criar Solicitação', 'Ticket', 'Solicitações'),
			('UpdateTicket', 'Editar Solicitação', 'Ticket', 'Solicitações'),
			('DeleteTicket', 'Excluir Solicitação', 'Ticket', 'Solicitações'),
			('ArchiveTicket', 'Arquivar Solicitação', 'Ticket', 'Solicitações'),
			('ApproveTicketToProd', 'Aprovar solicitação para produção', 'Ticket', 'Solicitações'),
			('ApproveTicketToRating', 'Liberar solicitação para avaliação', 'Ticket', 'Solicitações'),
			('UpdateTicketProd', 'Alterar status de produção da solicitação', 'Ticket', 'Solicitações'),
			('CreateRating', 'Avaliar solicitação', 'Rating', 'Avaliações')
		`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DELETE FROM permission
			WHERE permissionName IN (
				'CreateUser',
				'UpdateUser',
				'DeleteUser',
				'CreateRole',
				'UpdateRole',
				'DeleteRole',
				'CreateTicket',
				'UpdateTicket',
				'DeleteTicket',
				'ArchiveTicket',
				'ApproveTicketToProd',
				'ApproveTicketToRating',
				'UpdateTicketProd',
				'CreateRating'
			)
		`)
  }
}
