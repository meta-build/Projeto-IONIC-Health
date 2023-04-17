import styles from "./TextBox.module.scss";


interface Props {
    placeholder?:string;
}

export default function TextBox(props: Props) {
    
  return ( 
    <textarea 
        className={styles.textBox}
        style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
        placeholder={props.placeholder}

    />
  );
};



