import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import emailjs from "emailjs-com";
import { loadReCaptcha } from "react-recaptcha-v3";
import {} from "jquery.cookie";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: {
        email: "",
        id: "",
        pw: "",
      },
      showNewModal: false, // 새로운 모달을 표시할 상태
    };
  }

  componentDidMount() {
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  }

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  };

  email = async() => {
  
    const send_param = {
      headers,
      email: this.state.emailValue.email,
    };
    await axios
      .post("http://localhost:4000/member/getMember", send_param)
      //정상 수행
      .then((returnData) => {
        if(returnData.data.message){
          alert(returnData.data.message);
        }
        else if (returnData.data.member[0]) {
          if(this.props.title==="비밀번호 찾기"){
            const key = this.random4DigitNumber();
            this.setState({
              emailValue: {
               ...this.state.emailValue,
               id: key,
             },
             showNewModal: true,
           });
           alert("인증키를 보냈습니다");
          }
           else{
          this.setState({
            emailValue: {
              ...this.state.emailValue,
              id:returnData.data.member[0].id,
            },
          })
          alert("아이디를 보냈습니다");
        }
          this.sendVerificationEmail();
        }
      })
      //에러
      .catch((err) => {
        console.log("에러");
      });

  };

  sendVerificationEmail = () => {
    const templateParams = {
      to_email: this.state.emailValue.email,
      from_name: "test",
      message: this.state.emailValue.id,
    };

    emailjs
      .send(
        "service_4b86rwr",
        "template_xksfamo",
        templateParams,
        "cncFVxzCpmktfJNo3"
      )
      .then((response) => {
        console.log("이메일이 성공적으로 보내졌습니다:", response);
      })
      .catch((error) => {
        console.error("이메일 보내기 실패:", error);
      });
  };
  random4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
  changePW =() =>{
    if(this.state.emailValue.id===this.key.value){
      const send_param = {
        headers,
        email: this.state.emailValue.email,
        password : this.password.value,
      };
      axios
        .post("http://localhost:4000/member/setPW", send_param)
        //정상 수행
        .then();
      alert("비밀번호가 변경되었습니다.");
    }
    else{
      alert("키가 일치하지 않습니다."+this.key.value+" "+this.state.emailValue.id+ this.password.value);

    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ marginRight: 10 }}>email</label>
          <input
            type="text"
            value={this.state.emailValue.email}
            onChange={(e) =>
              this.setState({
                emailValue: { ...this.state.emailValue, email: e.target.value },
              })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.email}>
            보내기
          </Button>
          <Button variant="secondary" onClick={this.props.onHide}>
            닫기
          </Button>
        </Modal.Footer>

        {this.state.showNewModal &&(
          <Modal
            show={this.state.showNewModal}
            onHide={() => this.setState({ showNewModal: false })}
          >
          <Modal.Header closeButton><Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <label style={{ marginRight: 80 }}>인증키</label>
            <input type="text" ref={ref=>this.key=ref}></input>
            </div>
            <div style={{ marginTop: 20 }}>
            <label style={{ marginRight: 10 }}>새로운 비밀번호</label> 
              <input type="password" ref={ref => {this.password=ref}}></input>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.changePW}>
            인증
          </Button>
          </Modal.Footer>
          </Modal>
          )}
      </Modal>
    );
  }
}

export default ModalComponent;