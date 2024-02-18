import React, { Component } from "react";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";
import FollowRequest from "./FollowRequest";
import FollowList from "./FollowList";
import MessageWrite from "./MessageWrite";
import MessageList from "./MessageList";
import BanList from "./BanList";
import { Routes, Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

class Body extends Component {
  render() {
    let resultForm;

    if ($.cookie("login_id")) {
      resultForm = <BoardForm />;
    } else {
      resultForm = <LoginForm />;
    }

    return (
      <div>
        <Routes>
          <Route path="/" element={resultForm} />
          <Route path="/mypage" element={<MypageForm />} />
          <Route path="/boardWrite" element={<BoardWriteForm />} />
          <Route path="/board/detail" element={<BoardDetail />} />
          <Route path="/follow/request" element={<FollowRequest/>}/>
          <Route path="/follow/list" element={<FollowList/>}/>
          <Route path="/message/write" element={< MessageWrite/>}/>
          <Route path="/message" element={< MessageList/>}/>
          <Route path="/ban" element={<BanList/>}/>
        </Routes>
      </div>
    );
  }
}

export default Body;