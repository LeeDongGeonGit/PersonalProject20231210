import React, { useEffect, useState, Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import FollowButton from "./FollowButton";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };


class MessageRow extends Component {

    render() {
        const buttonStyle = {
            backgroundColor: "transparent",
            fontSize: 20,
            border:"none"
          }
        
      return (
        <tr>
        <td>
            {this.props.senderName}
        </td>
        <td>
            {this.props.content}
        </td>
        <button onClick={e=>this.props.deleteMessage(this.props._id)} style={buttonStyle}>x</button>
      </tr>
      );
    }
  }


  function MessageList(){
  const [messageList,setMessageList] = useState([]);
  useEffect(() => {
    getMessage();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

    const getMessage = async () =>{
        const send_param = {
          headers,
          receiver: $.cookie("login_id"),
        };
        await axios
          .post("http://localhost:4000/message/getMessage", send_param)
          .then(returnData => {
            let messageList;
              const comments = returnData.data.list;
              messageList = comments.map(item => (
                <MessageRow
                senderName= {item.senderName}
                content = {item.content}
                  _id={item._id} // 고유한 키로 _id 사용
                  deleteMessage = {deleteMessage}
                ></MessageRow>
              ));
              setMessageList(messageList);
            
    
      })}
    
      const deleteMessage = async (_id) => {
        const send_param = {
          headers,
          _id,
        };
         await axios
            .post("http://localhost:4000/message/delete", send_param)
            .then()
            .catch((err) => {
              console.log(err);
              alert("거절 실패");
            });
       await getMessage();
      };


      return(
        <div>
            <FollowButton/>
            <div style={{marginLeft: 100, marginRight:100}}>
          <Table  bordered hover>
            <thead>
              <tr>
                <th style={{width: 200}}>보낸 사람</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>{messageList}</tbody>
          </Table>
          </div>
        </div>
      );
  }





  export default MessageList;