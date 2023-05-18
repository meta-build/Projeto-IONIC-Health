import classNames from "classnames";
import styles from "./TextBox.module.scss";
import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  ajustavel?: boolean;
  valor?: string;
}

export default function TextBox(props: Props) {
  const { ajustavel = true } = props;
  const [valor, setValor] = useState(props.valor);

  useEffect(() => {
    if (props.valor) {
      setValor(props.valor);
    }
  }, [props.valor]);
  return (
    <textarea
      className={classNames({
        [styles.textBox]: true,
        [styles['nao-ajustavel']]: !ajustavel,
        [props.className]: true
      })}
      placeholder={props.placeholder}
      onChange={(e) => {
        setValor(e.target.value);
        props.onChange(e);
      }}
      value={valor}
    />
  );
};