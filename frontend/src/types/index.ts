interface SolicitacaoProps {
  id: number,
  title: string,
  type: string,
  description: string,
  status: 'RATING' | 'NEW' | 'ONHOLDING' | 'DONE',
  requesterId: number,
  createdAt: string,
  updatedAt: string,
  archivedAt: string,
  ratings: RatingProps[],
  attachments: ArquivoProps[]
}

interface RatingProps {
  id: number,
  value: number,
  committee: string,
  comment: string,
  userId: number,
  ticketId: number
}

interface ArquivoProps {
  fileName: string;
  fileType: string;
  id: number;
  storageType: string;
  ticketId: number;
  url: string;
}

interface EditarSolicitacaoProps {
  title: string;
  description: string;
  status: 'RATING' | 'NEW' | 'ONHOLDING' | 'DONE';
  isArchived: boolean;
  assignedRoleId: number | null;
}

interface EditarUsuarioProps {
  name?: string;
  email?: string;
}

interface UsuarioProps {
  id: number,
  name: string,
  email: string,
  roleId: string,
  role: RoleProps
}

interface RoleProps {
  id: number,
  name: string,
  isAdmin: boolean,
  permissions: PermissionProps[]
}

interface PermissionProps {
  id: number,
  permissionName: string,
  huamnizedPermissionName: string,
  entity: string,
  humanizedEntity: string
}

interface UsuarioContext {
  acessToken: string,
  name: string,
  role: RoleProps
}

export type {
  SolicitacaoProps,
  ArquivoProps,
  EditarSolicitacaoProps,
  RatingProps,
  UsuarioProps,
  EditarUsuarioProps,
  UsuarioContext
}