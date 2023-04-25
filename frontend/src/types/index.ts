interface SolicitacaoProps {
    id: number;
    titulo: string,
    tipo: string,
    status: string,
    descricao: string,
    data_criacao: string,
    data_edicao: string | null;
    data_arquivado: string | null;
    attachments: ArquivoProps[];
    ratings: RatingProps[];
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
    titulo?: string;
    tipo: string;
    descricao?: string;
}

interface UsuarioProps {
    id: number,
    name: string,
    mail: string,
    password: string,
    grupoId: number
}

export type {
    SolicitacaoProps,
    ArquivoProps,
    EditarSolicitacaoProps,
    RatingProps,
    UsuarioProps
}