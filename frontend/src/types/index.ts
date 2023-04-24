interface SolicitacaoProps {
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

export type {
    SolicitacaoProps,
    ArquivoProps
}