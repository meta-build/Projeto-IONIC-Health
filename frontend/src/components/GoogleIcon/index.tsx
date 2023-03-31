import styles from './GoogleIcon.module.scss';

interface Props {
    icon: string;
    className?: string
}

export default function GoogleIcon (props: Props) {
    const {className = ''} = props;
    return(
        <span className={`material-symbols-outlined ${className}`}>{props.icon}</span>
    )
}