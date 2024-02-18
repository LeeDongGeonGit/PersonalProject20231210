import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomButtonGroup = () => {
  const buttonStyle = {
    margin: 5,
  };

  return (
    <div style={{ textAlign: "center", margin: 40 }}>
        <Link to="/follow/request">
      <Button
        style={buttonStyle}
        variant="primary"
        type="button"
      >
        친구요청
      </Button>
      </Link>
      <Link to = "/follow/list">
      <Button
        style={buttonStyle}
       
        variant="primary"
        type="button"
      >
        친구 목록
      </Button>
      </Link>
      <Link to="/message">
      <Button
        style={buttonStyle}
        variant="primary"
        type="button"
      >
        메시지
      </Button>
      </Link>
      <Link to="/ban">
      <Button
        style={buttonStyle}
        variant="primary"
        type="button"
      >
        차단 목록
      </Button>
      </Link>
    </div>
  );
};

export default CustomButtonGroup;