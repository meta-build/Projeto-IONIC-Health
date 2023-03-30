import { ReactNode } from "react";
import styles from './BotaoDropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHammer } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface Props {
    icon: IconDefinition;
    label: string;
    onClick: () => void;
  }
  
//engrenagem
//<FontAwesomeIcon icon="fa-sharp fa-regular fa-gear" style={{color: "#ffffff",}} />
//martelo
//<FontAwesomeIcon icon="fa-regular fa-hammer" style={{color: "#ffffff",}} />

const IconButton: React.FC<Props> = ({ icon, label, onClick }) => {
    return (
      <button onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
        <span>{label}</span>
      </button>
    );
  };
  
  export default IconButton;
 
  
  
  
  
  
  