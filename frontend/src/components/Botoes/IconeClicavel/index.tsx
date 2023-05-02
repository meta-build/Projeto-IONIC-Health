import classNames from 'classnames';
import styles from './IconeClicavel.module.scss';

interface Props {
  handleClick: () => void;
  onBlur?: () => void;
  icone: JSX.Element;
  className?: string | any;
}

export default function IconeClicavel(props: Props) {
  return (
    <button
      className={classNames({
        [styles.botao]: true,
        [props.className]: true
      })}
      onClick={props.handleClick}
      onBlur={props.onBlur}
    >
      {props.icone}
    </button>
  )
}