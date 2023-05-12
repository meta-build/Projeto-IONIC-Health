import { useState } from 'react'
import styles from './BotaoSwitch.module.scss'
import classNames from 'classnames';

interface Props {
  handleClick: (value: boolean) => void;
}

export default function BotaoSwitch (props:Props) {
  const [ativo, setAtivo] = useState(false);

  return(
    <button
    type="button"
    className={classNames({
      [styles.botao]: true,
      [styles.ativo]: ativo
    })}
    onClick={() => {
      setAtivo(!ativo);
      props.handleClick(!ativo);
    }}>
      <div
      className={classNames({
        [styles.bola]: true,
        [styles.ativo]: ativo
      })}
      />
    </button>
  )
}