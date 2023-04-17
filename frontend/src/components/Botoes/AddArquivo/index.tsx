import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

type FileInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
    return (
      <div className="file-input-container">
        <label htmlFor="file-input" className="file-input-label">
          <FontAwesomeIcon icon={faFile} className="file-input-icon" />
          Adicionar Arquivo
        </label>
        <input id="file-input" type="file" onChange={onChange} />
      </div>
    );
  };
  
export default FileInput;