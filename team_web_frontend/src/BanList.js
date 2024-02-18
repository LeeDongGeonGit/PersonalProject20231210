import React, { useEffect, useState, Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import FollowButton from "./FollowButton";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };


class BanRow extends Component {

    render() {
        const buttonStyle = {
            margin: 5
          };
        
      return (
        <div>
          <span style={{marginRight : 200}} >{this.props.name}</span>
          <Button
            style={buttonStyle}
            onClick={()=>this.props.deleteBan(this.props._id)}
            variant="primary"
            type="button"
          >
            차단 해제 
          </Button>
        </div>
      );
    }
  }


  function BanList(){
  const [banList,setBanList] = useState([]);
  useEffect(() => {
    getBanList();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

    const getBanList = async () =>{
        const send_param = {
          headers,
          user: $.cookie("login_id"),
        };
        await axios
          .post("http://localhost:4000/ban/getBanList", send_param)
          .then(returnData => {
            let banList;
              const ban = returnData.data.list;
              banList = ban.map(item => (
                <BanRow
                name= {item.banUserName}
                  _id={item._id} // 고유한 키로 _id 사용
                  deleteBan = {deleteBan}
                ></BanRow>
              ));
              setBanList(banList);
            
    
      })}
    
      const deleteBan = async (_id) => {
        const send_param = {
          headers,
          _id,
        };
         await axios
            .post("http://localhost:4000/ban/delete", send_param)
            .then()
            .catch((err) => {
              console.log(err);
              alert("거절 실패");
            });
       await getBanList();
      };


      return(
        <div>
            <FollowButton/>
            <div style={{textAlign: "center", margin: 40}}>차단 목록</div>
            <div style={{textAlign: "center", margin: 40}}>{banList}</div>
        </div>
      );
  }





  export default BanList;