import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { useLocation, useNavigate } from "react-router-dom"; // React Router v6에서 쿼리 매개변수를 가져오기 위해 useLocation 사용

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function BoardWriteForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [boardTitle, setBoardTitle] = React.useState(query.get("title") || "");
  const [boardContent, setBoardContent] = React.useState("");

  const writeBoard = () => {
    let url;
    let send_param;

    if (boardTitle === undefined || boardTitle === "") {
      alert("글 제목을 입력 해주세요.");
      return;
    } else if (boardContent === undefined || boardContent === "") {
      alert("글 내용을 입력 해주세요.");
    }

    if (query.get("id") !== null) {
      url = "http://localhost:4000/board/update";
      send_param = {
        headers,
        _id: query.get("id"),
        type: $.cookie("board_type"),
        title: boardTitle,
        content: boardContent,
      };
    } else {
      url = "http://localhost:4000/board/write";
      send_param = {
        headers,
        _id: $.cookie("login_id"),
        type: $.cookie("board_type"),
        title: boardTitle,
        content: boardContent,
        writerName: $.cookie("login_name"),
      };
    }

    axios
      .post(url, send_param)
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          navigate("/"); // 글쓰기 성공 시 홈으로 이동
        } else {
          alert("글쓰기 실패");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getBoardContent= () =>{
    if(id===null){
      return;
    }
    const send_param = {
      headers,
      _id:id,
    };

    axios
      .post("http://localhost:4000/board/detail", send_param)
      .then((returnData) => {
        const boardData = returnData.data.board[0];
        setBoardTitle(boardData.title);
        setBoardContent(boardData.content);      
      });
    
  }
  useEffect(()=>{
    getBoardContent();
  },[]);

  return (
    <div className="App" style={{ margin: 50 }}>
      <h2>글쓰기</h2>
      <Form.Control
        type="text"
        style={{ marginBottom: 5 }}
        placeholder="글 제목"
        value={boardTitle}
        onChange={e => setBoardTitle(e.target.value)}
      />
      <Form.Control
        as="textarea"
        rows={5}
        style={{ marginBottom: 5 }}
        placeholder="글 내용"
        value={boardContent}
        onChange={e => setBoardContent(e.target.value)}
      />
      <Button style={{ marginTop: 5 }} onClick={writeBoard} block>
        저장하기
      </Button>
    </div>
  );
}

export default BoardWriteForm;