import styles from './BotaoSwitch.module.scss'
import classNames from 'classnames';

interface Props {
  handleClick: (value: boolean) => void;
  isActive: boolean
}

export default function BotaoSwitch (props:Props) {
  return(
    <button
    type="button"
    className={classNames({
      [styles.botao]: true,
      [styles.ativo]: props.isActive
    })}
    onClick={() => {
      props.handleClick(!props.isActive);
    }}>
      <div
      className={classNames({
        [styles.bola]: true,
        [styles.ativo]: props.isActive
      })}
      />
    </button>
  );
}