import React, { useState } from 'react';
import styles from './AddArquivo.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import Anexar from '../Anexar';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  
}

const Componente = ({ children, onClose }: Props) => {
  
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    onClose();
  };

  return (
    <div className={styles.componente}>
      <Anexar
        handleFileChange={() => {}}
        corBotao="claro"
        
      >
        Anexar arquivo
      </Anexar>
      <div
        className={classNames({
          [styles.botao]: true,
          [styles.hovered]: hovered,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <span className={styles.children}>{children}</span>
        {hovered && (
          <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} />
        )}
      </div>
    </div>
  );
};

export default Componente;
