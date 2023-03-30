import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button className="round-cyan-button cyan-button" onClick={onClick}>
      <i className="fa fa-plus" aria-hidden="true"></i>
    </button>
  );
};

//icone vazio 
//<FontAwesomeIcon icon="fa-regular fa-circle-plus" style={{color: "#54c5ce",}} />
//icone preenchido
//<FontAwesomeIcon icon="fa-solid fa-circle-plus" style={{color: "#54c5ce",}} />

export default AddButton;

