import { useState } from 'react';
import styles from './DropdownOpcoes.module.scss';
import classNames from 'classnames';

interface ItemProps {
  label: string;
  onClick: () => void;
}

interface Props {
  options: ItemProps[];
}

export default function DropdownOpcoes(props: Props) {
  const [open, setOpen] = useState(false)
  const [clickedButton, setClickedButton] = useState(false);
  const [clickedOption, setClicketOption] = useState<number>(undefined);

  return (
    <button
      className={styles.container}
      onBlur={() => setOpen(false)}>
      <div
        className={classNames({
          [styles.button]: true,
          [styles['button-clicked']]: clickedButton
        })}
        onClick={() => {
          setOpen(!open);
          setClickedButton(true);
          setTimeout(() => {
            setClickedButton(false);
          }, 100);
        }}>
          <div className={classNames({
            [styles['button-ball']]: true,
            [styles['ball-clicked']]: clickedButton
          })} />
          <div className={classNames({
            [styles['button-ball']]: true,
            [styles['ball-clicked']]: clickedButton
          })} />
          <div className={classNames({
            [styles['button-ball']]: true,
            [styles['ball-clicked']]: clickedButton
          })} />
      </div>
      {open && <ul className={styles.list}>
        {props.options.map((option, index) => (
          <li
            key={index}
            className={classNames({
              [styles.option]: true,
              [styles['option-clicked']]: index == clickedOption
            })}
            onClick={() => {
              option.onClick();
              setClicketOption(index);
              setTimeout(() => {
                setClicketOption(undefined);
                setOpen(false);
              }, 100);
            }}>
            {option.label}
          </li>
        ))}
      </ul>}
    </button>
  );
}