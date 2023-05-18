import { useRef } from "react"
import styles from './Anexar.module.scss';
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BotaoPreenchido from "../BotaoPreenchido";

interface Props {
  handleFileChange: (file: File) => void;
  className?: string;
}

export default function Anexar(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    props.handleFileChange(file);
  }


  return (
    <>
      <BotaoPreenchido
        handleClick={() => inputRef.current?.click()}
        tipo="button"
        className={classNames({
          [styles.botao]: true,
          [props.className]: true
        })}>
        <FontAwesomeIcon icon={faAdd} className={styles.icon} />
        Anexar arquivo
      </BotaoPreenchido>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}