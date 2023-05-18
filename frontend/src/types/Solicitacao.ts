interface NotaProps {
  comite: string;
  nota: number;
}

interface SolicitacaoSimples {
  titulo: string,
  tipo: "Feature" | "Hotfix";
  etapa: {
    data_criacao: string;
    data_edicao: string;
  } | {
    data_arquivado: string,
  } | {
    notas: NotaProps[];
  } | {
    status: string;
  }
}

export type {
  SolicitacaoSimples
}