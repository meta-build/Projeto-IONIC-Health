interface SolicitacaoProps {
    id: number;
    titulo: string,
    tipo: string,
    descricao: string,
    data_criacao: string,
    data_edicao: string | null;
    attachments: ArquivoProps[];
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

export type {
    SolicitacaoProps,
    ArquivoProps,
    EditarSolicitacaoProps
}