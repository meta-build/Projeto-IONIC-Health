import styles from './MenuMobile.module.scss';
import iconeIonic from '../../../assets/iconeIonic.png';
import { useContexto } from '../../../context/contexto';
import PopupErro from '../../../popUps/PopupErro';
import { useState } from 'react';
import Opcoes from './Opcoes';

export default function MenuMobile() {
  const { usuario, setUsuario } = useContexto();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav id='mobile'>
        <img
          src={iconeIonic}
          className={styles.logo} />
        <span className={styles.name}>
          {'Olá, '}
          {usuario.name.split(' ')[0]}
        </span>
        <button onClick={() => setOpen(true)}>
          teste
        </button>
      </nav>
      <Opcoes
      visivel={open}
      onClose={() => setOpen(false)}
      />
    </>
  );
}