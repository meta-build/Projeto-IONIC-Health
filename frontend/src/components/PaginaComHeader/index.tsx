import Menu from "../Menu";
import styles from './PaginaComHeader.module.scss'
interface Props {
  elemento: JSX.Element;
}

export default function (props: Props) {
  return (
    <>
      <Menu />
      <div className={styles.container}>
        {props.elemento}
      </div>
    </>
  )
}