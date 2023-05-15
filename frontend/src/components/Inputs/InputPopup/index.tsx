import classNames from 'classnames';
import styles from './InputPopup.module.scss';

interface Props {
  icon?: JSX.Element;
  placeholder?: string;
  className?: string | any;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valor: string;
  tipo?: React.HTMLInputTypeAttribute;
  onFocus?: () => void;
}
export default function InputPopup(props: Props) {
  return (
    <>
      <input
        className={classNames({
          [styles.input]: true,
          [props.className]: true
        })}
        onChange={props.handleChange}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        value={props.valor}
        type={props.tipo ?? 'text'}
      />
    </>
  );
}