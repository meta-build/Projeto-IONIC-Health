import classNames from 'classnames';
import styles from './InputContornado.module.scss'

interface Props {
  icon?: JSX.Element;
  placeholder?: string;
  className?: string | any;
  tipo?: React.HTMLInputTypeAttribute;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputContornado(props: Props) {
  const { tipo = 'text' } = props;

  return (
    <label className={classNames({
      [styles.label]: true,
      [props.className]: true
    })}>
      <span className={styles.icon}>
        {props.icon && props.icon}
      </span>
      <input
        className={styles.input}
        onChange={props.handleChange}
        type={tipo}
        placeholder={props.placeholder} />
    </label>
  );
}