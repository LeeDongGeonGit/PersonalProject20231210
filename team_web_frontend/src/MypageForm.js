import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { useState, useRef } from "react";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const MypageForm = () => {
  const [name, setName] = useState($.cookie("login_name"));
  const divStyle = {
    margin: 50
  };
  const pwRef = useRef();
  const nameOnChange = e => {
    setName(e.target.value)
  };
  const marginBottom = {
    marginBottom : 5,
    display: "block"
  };
  const PWChagne = () =>{
    const send_param = {
      headers,
      email: $.cookie("login_email1"),
      password : pwRef.current.value,
    };
    axios
      .post("http://localhost:4000/member/setPW", send_param)
      //정상 수행
      .then();
    alert("비밀번호가 변경되었습니다.");
  }
  const nameChange = ()=>{
    const send_param = {
      headers,
      email: $.cookie("login_email1"),
      name : name,
    };
    axios
    .post("http://localhost:4000/member/setName", send_param)
    //정상 수행
    .then();
  alert("회원정보가 변경되었습니다.");
  $.cookie("login_name", name, { expires: 1 });
  }
  return (
    <>
      <div style={divStyle}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>email</Form.Label>
        <Form.Control type="email" disabled value={$.cookie("login_email1")}/>
        <Form.Label>ID</Form.Label>
        <Form.Control type="email" disabled value={$.cookie("login_email")}/>
        <Form.Label>name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={nameOnChange}/>
      <Button variant="primary"   style={marginBottom} onClick={nameChange}>
      회원정보 수정
      </Button>
      <Form.Label style={{display: "block"}}>new password</Form.Label>
      <Form.Control type="password" placeholder="Enter New Password" ref={pwRef}/>
      <Button variant="primary" block onClick={PWChagne}>
      비밀번호 변경
      </Button>
      </Form.Group>
      </div>
    </>
  );
};

export default MypageForm;
