import React from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { Link,useLocation, useNavigate } from "react-router-dom"; // React Router v6에서 쿼리 매개변수를 가져오기 위해 useLocation 사용
import {  useState } from "react";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function MessageWrite() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const id = params.get("id");
    const [content, setContent] = useState();
    const contentOnChange = e => {
        setContent(e.target.value)
      };

  const sendMessage = () => {
    let send_param;

    if (content === undefined || content === "") {
      alert("메시지 내용을 입력 해주세요.");
      return;
    }
    

      send_param = {
        headers,
        sender: $.cookie("login_id"),
        senderName: $.cookie("login_name"),
        content: content,
        receiver: id,
      };
    

    axios
      .post("http://localhost:4000/message/send", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          alert("메시지를 보냈습니다.");
          navigate("/follow/list"); // 메시지 성공 시 이동
        } else {
          alert("메시지 보내기 실패");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App" style={{ margin: 50 }}>
      <h2>메시지 보내기</h2>
      <Form.Control
        as="textarea"
        rows={5}
        style={{ marginBottom: 5 }}
        placeholder="메시지 내용"
        onChange={contentOnChange}
      />
      <Button style={{ marginTop: 5 }} onClick={sendMessage} block>
        보내기
      </Button>
      <Link to ="/follow/list">
      <Button style={{ marginTop: 5 }} block>
        취소
      </Button>
      </Link>
    </div>
  );
}

export default MessageWrite;