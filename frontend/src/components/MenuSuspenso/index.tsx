import { IconeClicavel } from "../Botoes"
import styles from './MenuSuspenso.module.scss';
import { ReactNode, useState } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  icon: JSX.Element;
  className?: string;
  onOpen?: () => void;
}

export default function MenuSuspenso(props: Props) {
  const [visivel, setVisivel] = useState(false);

  return (
    <IconeClicavel
      className={classNames({
        [styles.icone]: true,
        [styles['icone-hover']]: !visivel,
        [props.className]: true
      })}
      handleClick={() => {
        setVisivel(!visivel);
        if (props.onOpen) { props.onOpen(); }
      }}
      onBlur={() => setVisivel(false)}
      icone={
        <>
          {props.icon}
          {visivel &&
            <div className={styles.container}>
              {props.children}
            </div>}
        </>
      } />
  )
}