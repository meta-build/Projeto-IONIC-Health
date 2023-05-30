import GoogleIcon from '../../../GoogleIcon';
import Dropdown from './Dropdown';
import styles from './Opcoes.module.scss';

interface Props {
  visivel: Boolean;
  onClose: () => void;
}

export default function Opcoes(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.top}>
          <h2>Menu</h2>
          <button className={styles.close}>
            <GoogleIcon>
              &#xe5cd;
            </GoogleIcon>
          </button>
        </div>
        <ul className={styles.botoes}>
          <li className={styles.botao}>
            <button
              className={styles['botao-button']}>
              Exemplo
            </button>
          </li>
          <li className={styles.botao}>
            <Dropdown
              label='dropdown'
              opcoes={[
                { label: 'teste 1', onClick: () => console.log('teste') },
                { label: 'teste 2', onClick: () => console.log('teste 2') }
              ]}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}