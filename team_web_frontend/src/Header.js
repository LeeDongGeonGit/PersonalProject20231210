import React, { Component } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
  state = {
    buttonDisplay: "none"
  };

  componentDidMount() {
    if ($.cookie("login_id")) {
      this.setState({
        buttonDisplay: "block"
      });
    } else {
      this.setState({
        buttonDisplay: "none"
      });
    }
  }
  delete = () =>{
    const id = $.cookie("login_id");
    const send_param = {
      headers,
      _id: id,
    }
    axios
      .post("http://localhost:4000/member/delete",send_param)
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("탈퇴되었습니다.");
          window.location.href = "/";
        }
      });

  }

  logout = () => {
    axios
      .get("http://localhost:4000/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다!");
          window.location.href = "/";
        }
      });
  };
  render() {
    const buttonStyle = {
      margin: "0px 5px 0px 10px",
      display: this.state.buttonDisplay
    };

    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/">모두의 개발공간</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <NavLink to="/mypage">
              <Button style={buttonStyle} variant="primary">
                회원정보 수정
              </Button>
            </NavLink> */}
            <NavLink to="/follow/request">
              <Button style={buttonStyle} variant="primary">
                팔로우
              </Button>
            </NavLink>
            <NavLink to="/mypage">
              <Button style={buttonStyle} variant="primary">
                내정보 보기
              </Button>
            </NavLink>
            <NavLink to="/boardWrite">
              <Button style={buttonStyle} variant="primary">
                글쓰기
              </Button>
            </NavLink>
            <Button style={buttonStyle} onClick={this.logout} variant="primary">
              로그아웃
            </Button>
            <Button style={buttonStyle} variant="primary"onClick={this.delete}>
                회원 탈퇴
              </Button>
          </Navbar.Collapse>
        </Navbar>
        <Image src="./img/main.png" fluid style={{width: "100%"}}/>
      </div>
    );
  }
}

export default Header;
