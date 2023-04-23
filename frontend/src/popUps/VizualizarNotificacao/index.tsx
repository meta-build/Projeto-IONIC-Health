import React, { useState } from 'react';

import './VizualizarNotificacao.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { DropdownContornado } from '../../components/Dropdowns';

const BellIconDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="bell-icon-dropdown">
      <FontAwesomeIcon icon={faBell} onClick={toggleDropdown} />
      {isOpen && (
        <div className="dropdown">
          <ul>
            <li>Opção 1</li>
            <li>Opção 2</li>
            <li>Opção 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BellIconDropdown;