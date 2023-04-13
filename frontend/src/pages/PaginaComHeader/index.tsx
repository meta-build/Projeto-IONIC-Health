import Menu from "../../components/Menu";

interface Props {
    elemento: JSX.Element;
}

export default function (props: Props) {
    return (
        <>
            <Menu />
            {props.elemento}
        </>
    )   
}