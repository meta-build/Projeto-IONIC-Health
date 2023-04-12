import classNames from 'classnames';
import styles from './AcaoProducao.module.scss';

interface Props {
    status: 'New' | 'On Holding' | 'Done';
}

export default function AcaoProducao (props: Props) {

    const cores = {
        ['New']: 'amarelo',
        ['On Holding']: 'verde1',
        ['Done']: 'verde2'
    }

    return (
        <span className={classNames({
            [styles.container]: true,
            [styles[cores[props.status]]]: true
        })}>
            {props.status}
        </span>
    );
}