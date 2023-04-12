import classNames from 'classnames';
import styles from './InputPopup.module.scss';

interface Props {
    icon?: JSX.Element;
    placeholder?: string;
    className?: string | any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valor?: string
}

export default function InputPopup (props: Props) {
    const {valor = ''} = props;

    return(
        <input
        className={classNames({
            [styles.input]: true,
            [props.className]: true
        })}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        value={valor}
        />
    );
}