import React from 'react';
import { Alert } from 'react-bootstrap';

interface MissingPidErrorProps {
}

const MissingPidError: React.FC<MissingPidErrorProps> = (props) => {
  return (
    <div>
      <div>
        <Alert variant="danger">
          <h2>
            Er is iets misgegaan.
          </h2>
          <p>
            Zorg ervoor dat je de juiste link uit je uitnodiging gebruikt.
          </p>
        </Alert>
      </div>

    </div>
  );
};

export default MissingPidError;
