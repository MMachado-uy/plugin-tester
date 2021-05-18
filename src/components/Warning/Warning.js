import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import './Warning.scss';

function Warning({dismiss}) {
  const [show, setShow] = useState(true);

  const dismissHandler = () => {
    setShow(false);
    dismiss();
  }

  return <div className='Warning'>
    <Alert show={show} variant="warning">
      <p>Warning</p>
      <p>This is not an actual UPshow UI, but instead a test environment intended to mimic and monitor a synthetic experience.</p>
      <p>For a closer-to-real experience, please contact your representative.</p>
      <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={dismissHandler} variant="outline-warning">
            I understand
          </Button>
        </div>
    </Alert>
  </div>
}

export default Warning;
