import React, { useEffect, useState, Component, useRef } from "react";
import { Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };

class CommentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  handleEditClick = () => {
    // "수정" 버튼을 클릭할 때 상태를 토글합니다.
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };
  


  render() {
    const buttonStyle = {
      backgroundColor: "transparent",
      fontSize: 10,
      border:"none"
    }
    return (
      <div>
        <span >{this.props.content}</span>
        <button onClick={()=>this.props.deleteComment(this.props._id,this.props.writer)} style={buttonStyle}>삭제</button>
        <button onClick={this.handleEditClick} style={buttonStyle}>수정</button>
        <div style={{ display: this.state.isEditing ? "block" : "none" }}>
        <input type="text" ref={ref=>{this.content=ref}}/>
        <Button onClick={()=>this.props.changeComment(this.props._id, this.content.value,this.props.writer)}>확인</Button>
        </div>
      </div>
    );
  }
}

function BoardDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const comment = useRef();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [commentList,setCommentList] = useState([]);



  
  const deleteBoard = (_id) => {
    if(board.writer!==$.cookie("login_id")){
      alert("권한이 없습니다.");
      return;
    }
    const send_param = {
      headers,
      _id,
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:4000/board/delete", send_param)
        .then((returnData) => {
          alert("게시글이 삭제 되었습니다.");
          navigate("/"); // 글 삭제 후 홈페이지로 이동
        })
        .catch((err) => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  const getDetail = () => {
    const searchParams = new URLSearchParams(location.search);
    const _id = searchParams.get("id");

    if (_id) {
      const send_param = {
        headers,
        _id,
      };

      axios
        .post("http://localhost:4000/board/detail", send_param)
        .then((returnData) => {
          const boardData = returnData.data.board[0];
          if (boardData) {
            setBoard(boardData);
          } else {
            alert("글 상세 조회 실패");
            navigate("/"); // 실패 시 홈페이지로 리디렉션
          }
        })
        .catch((err) => {
          console.log(err);
          alert("글 상세 조회 실패");
          navigate("/"); // 실패 시 홈페이지로 리디렉션
        });
    } else {
      alert("글 ID가 없습니다.");
      navigate("/"); // 유효한 ID가 없을 때 홈페이지로 리디렉션
    }
  };

  useEffect(() => {
    getDetail();
    getComment();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행


  const divStyle = {
    margin: 50,
  };
  const requestFollow = async () => {
    if ($.cookie("login_id") === board.writer) {
      alert("본인입니다.");
      return;
    }
  
    try {
      const send_param = {
        headers,
        user: $.cookie("login_id"),
      };
  
      const returnBanData = await axios.post("http://localhost:4000/ban/isBan", send_param);
  
      if (returnBanData.data.message) {
        alert(returnBanData.data.message);
        return;
      }
      const returnFollowData = await axios.post("http://localhost:4000/follow/isFollow", send_param);
  
      if (returnFollowData.data.message) {
        alert(returnFollowData.data.message);
        return;
      }
  
      const send_param1 = {
        headers,
        sender: $.cookie("login_id"),
        senderName: $.cookie("login_name"),
        receiver: board.writer,
        receiverName: board.writerName,
      };
  
      const returnData1 = await axios.post("http://localhost:4000/follow/request", send_param1);
      alert(returnData1.data.message);
    } catch (error) {
      console.error(error);
      // 오류 처리
    }
  };


  const writeComment = async() => {
    const send_param = {
      headers,
      board:id,
      writer: $.cookie("login_id"),
      content: comment.current.value
    };
   await axios
        .post("http://localhost:4000/comment/write", send_param)
        .then((returnData) => {alert(returnData.data.message)});
        getComment();
  }
  const getComment = () =>{
    const send_param = {
      headers,
      board: id
    };
    axios
      .post("http://localhost:4000/comment/getComment", send_param)
      .then(returnData => {
        let commentList;
          const comments = returnData.data.list;
          commentList = comments.map(item => (
            <CommentRow
            writer={item.writer}
              content={item.content}
              _id={item._id} // 고유한 키로 _id 사용
              deleteComment = {deleteComment}
              changeComment={changeComment}
            ></CommentRow>
          ));
          setCommentList(commentList);
        

  })}
  const deleteComment = async(id,writer) =>{
    if(writer!==$.cookie("login_id")){
      alert("권한이 없습니다.");
      return;
    }
    const send_param = {
      headers,
      _id: id
    };
    await axios
      .post("http://localhost:4000/comment/delete", send_param)
      .then(returnData => {
        alert("삭제되었습니다.");
        
  }
  
  )
  
  getComment();

}
  const changeComment = async(_id,content,writer) => {
    if(writer!==$.cookie("login_id")){
      alert("권한이 없습니다.");
      return;
    }

    const send_param = {
      headers,
      _id: _id,
      content: content
    };
    await axios
      .post("http://localhost:4000/comment/update", send_param)
      .then(returnData => {
        alert(returnData.data.message);
        
  }
  
  )
  getComment();
  }

  return (
    <div style={divStyle}>
      {board ? (
        
        <div>
          <div>
            <label>작성자 : </label>
            <label>{board.writerName}</label>
            <Button
            
            style={{marginLeft : 50}}
            onClick={() => requestFollow()}
          >
            친구 신청
          </Button>
            </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{board.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  dangerouslySetInnerHTML={{
                    __html: board.content,
                  }}
                ></td>
              </tr>
            </tbody>
          </Table>
          <Button
            block
            onClick={() => navigate(`/boardWrite?id=${board._id}`)}
          >
            글 수정
          </Button>
          <Button block onClick={() => deleteBoard(board._id)}>
            글 삭제
          </Button>
          <div style={{fontSize: 29}}>댓글</div>
          
          <div>{commentList}</div>
          <div style={{marginTop: 20}}>

           <textarea ref={comment} style={{resize:"none",  width:500}}/>
      
          </div>
          <Button onClick={writeComment} > 댓글 작성</Button>
        </div>
     
      ) : null}
    </div>
  );
}

export default BoardDetail;