import classNames from "classnames";
import styles from "./TextBox.module.scss";


interface Props {
    placeholder?:string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    className?: string;
    ajustavel?: boolean;
}

export default function TextBox(props: Props) {
  const {ajustavel = true} = props;

  return ( 
    <textarea 
        className={classNames({
          [styles.textBox]: true,
          [styles['nao-ajustavel']]: !ajustavel,
          [props.className]: true
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
    />
  );
};



