import Menu from "../Menu";
import styles from './PaginaComHeader.module.scss'
interface Props {
  elemento: JSX.Element;
}

export default function (props: Props) {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.children}>
        {props.elemento}
      </div>
    </div>
  )
}