import React, { useEffect, useState, Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import FollowButton from "./FollowButton";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };


class RequestRow extends Component {

    render() {
        const buttonStyle = {
            margin: 5
          };
        
      return (
        <div>
          <span style={{marginRight : 200}} >{this.props.name}</span>
          <Button
            style={buttonStyle}
            onClick={()=>this.props.acceptRequest(this.props._id)}
            variant="primary"
            type="button"
          >
            수락
          </Button>
          <Button
            style={buttonStyle}
            onClick={()=>this.props.deleteRequest(this.props._id)}
            variant="primary"
            type="button"
          >
            거절
          </Button>
          <Button
            style={buttonStyle}
            onClick={()=>this.props.ban(this.props._id,this.props.banUser,this.props.name)}
            variant="primary"
            type="button"
          >
            차단
          </Button>
        </div>
      );
    }
  }


  function FollowRequest(){
  const [requestList,setRequestList] = useState([]);
  useEffect(() => {
    getRequest();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

    const getRequest = async () =>{
        const send_param = {
          headers,
          receiver: $.cookie("login_id"),
        };
        await axios
          .post("http://localhost:4000/follow/getRequest", send_param)
          .then(returnData => {
            let requestList;
              const comments = returnData.data.list;
              requestList = comments.map(item => (
                <RequestRow
                name= {item.sender===$.cookie("login_id")?  item.receiverName : item.senderName}
                banUser = {item.sender===$.cookie("login_id")?  item.receiver : item.sender}
                  _id={item._id} // 고유한 키로 _id 사용
                  deleteRequest = {deleteRequest}
                  acceptRequest={acceptRequest}
                  ban={ban}
                ></RequestRow>
              ));
              setRequestList(requestList);
            
    
      })}
    
      const deleteRequest = async (_id) => {
        const send_param = {
          headers,
          _id,
        };
         await axios
            .post("http://localhost:4000/follow/delete", send_param)
            .then()
            .catch((err) => {
              console.log(err);
              alert("거절 실패");
            });
       await getRequest();
      };

      const acceptRequest = async (_id) => {
        const send_param = {
          headers,
          _id,
        };
        try {
            await axios.post("http://localhost:4000/follow/accept", send_param);
            await getRequest(); // 요청 처리 후에 getRequest() 호출
          } catch (err) {
            console.log(err);
            alert("수락 실패");
          }
        
      };


      const ban = async (_id,banUser,banUserName) => {
        const send_param = {
          headers,
          _id,
        };
        await axios
            .post("http://localhost:4000/follow/delete", send_param)
            .then((returnData) => {
            })
            .catch((err) => {
              console.log(err);
              alert("거절 실패");
            });
            const send_param1 = {
                headers,
                user: $.cookie("login_id"),
                banUser:banUser,
                banUserName : banUserName,
              };
      
        await axios
            .post("http://localhost:4000/ban/create", send_param1)
            .then((returnData) => {
            })
            .catch((err) => {
              console.log(err);
              alert("차단 실패");
            });
        
       await getRequest();
      };
      return(
        <div>
            <FollowButton/>
            <div style={{textAlign: "center", margin: 40}}>친구요청 목록</div>
            <div style={{textAlign: "center", margin: 40}}>{requestList}</div>
        </div>
      );
  }





  export default FollowRequest;