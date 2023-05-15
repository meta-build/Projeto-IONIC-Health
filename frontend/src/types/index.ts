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
  mail?: string;
  password?: string;
  grupoId?: number;
}

interface UsuarioProps {
  id: number,
  name: string,
  mail: string,
  password: string,
  grupoId: number
}

interface UsuarioContext {
  id: number;
  token: string;
  grupo: number;
  nome: string;
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