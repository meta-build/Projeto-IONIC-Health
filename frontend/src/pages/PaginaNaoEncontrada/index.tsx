import { useNavigate } from 'react-router-dom';
import { Botao } from '../../components/Botoes';
import styles from './PaginaNaoEncontrada.module.scss';

export default function PaginaNaoEncontrada() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.painel}>
        <span className={styles.codigo}>404</span>
        <span className={styles.texto}>Página não encontrada.</span>
      </div>
      <Botao handleClick={() => navigate(-1)}>Voltar</Botao>
    </div>
  );
}