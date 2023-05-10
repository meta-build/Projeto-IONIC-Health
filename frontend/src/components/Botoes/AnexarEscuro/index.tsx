import { useRef } from "react"
import styles from './AnexarEscuro.module.scss';
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BotaoPreenchido from "../BotaoPreenchido";
import BotaoPreenchidoEscuro from "../BotaoPreenchidoEscuro";

interface Props {
  handleFileChange: (file: File) => void;
  className?: string;
}

export default function AnexarEscuro(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    props.handleFileChange(file);
  }


  return (
    <>
      <BotaoPreenchidoEscuro
        handleClick={() => inputRef.current?.click()}
        tipo="button"
        className={classNames({
          [styles.botao]: true,
          [props.className]: true
        })}>
        <FontAwesomeIcon icon={faAdd} className={styles.icon} />
        Anexar arquivo
      </BotaoPreenchidoEscuro>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}