import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom"; // NavLink 대신 Link 사용
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import {  Button } from "react-bootstrap";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={`/board/detail?id=${this.props._id}`}> 
            {this.props.createdAt.substring(0, 10)}
          </Link>
        </td>
        <td>
          <Link to={`/board/detail?id=${this.props._id}`}>
            {this.props.title}
          </Link>
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    boardList: []
  };

  componentDidMount() {
    this.getBoardList("team");
  }

  getMyBoardList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:4000/board/getMyBoardList", send_param)
      .then(returnData => {
        let boardList;
        if (returnData.data.list.length > 0) {
          const boards = returnData.data.list;
          boardList = boards.map(item => (
            <BoardRow
              key={item._id} // 고유한 키로 _id 사용
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
            ></BoardRow>
          ));
          this.setState({
            boardList: boardList
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList: boardList
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  getBoardList = (e) => {
    const send_param = {
      headers,
      type: e
    };
    $.cookie("board_type", e, { expires: 1 })
    axios
      .post("http://localhost:4000/board/getBoardList", send_param)
      .then(returnData => {
        let boardList;
        if (returnData.data.list.length > 0) {
          const boards = returnData.data.list;
          boardList = boards.map(item => (
            <BoardRow
              key={item._id} // 고유한 키로 _id 사용
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
            ></BoardRow>
          ));
          this.setState({
            boardList: boardList
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList: boardList
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  

  render() {
    const divStyle = {
      margin: 50
    };
    const buttonStyle = {
      margin: 10
    };
  
    return (
      <div>
         <Button variant="primary" style={buttonStyle} onClick={() => this.getBoardList("team")}>팀 구인</Button>
         <Button variant="primary" style={buttonStyle} onClick={() => this.getBoardList("pm")}>PM 구인</Button>
         <Button variant="primary" style={buttonStyle }onClick={() => this.getBoardList("qna")}>질문 게시판</Button>
         <Button variant="primary" style={buttonStyle }onClick={this.getMyBoardList}>내 글 목록 보기</Button>
        <div style={divStyle}>
          <Table  bordered hover>
            <thead>
              <tr>
                <th>날짜</th>
                <th>글 제목</th>
              </tr>
            </thead>
            <tbody>{this.state.boardList}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default BoardForm;