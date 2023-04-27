import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Input,
  Warning,
} from "../Login/LoginForm.styled";
import axios from "axios";

const SignForm = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [idOk, setIdOk] = useState(false);
  const [pwOk, setPwOk] = useState(false);

  const containsSpecialCharacter = (pw) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(pw);
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!containsSpecialCharacter(pw)) {
    //   alert("비밀번호에는 최소 1개의 특수 문자가 포함되어야 합니다.");
    //   return;
    // }

    if (pw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/login`, {
        id,
        pw,
      });
      alert("회원가입 성공");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.name === "Username already registered") {
        alert("아이디가 이미 존재합니다.");
      }
    }
  };

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <header style={{ marginBottom: "10px" }}>회원가입</header>
          <Input
            type="text"
            style={{ marginBottom: "10px" }}
            placeholder="아이디"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            required
          />
          <br />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              // if (containsSpecialCharacter(e.target.value)) {
              //   setPwOk(true);
              // } else {
              //   setPwOk(false);
              // }
            }}
            required
          />
          {!pwOk ? (
            <Warning> 반드시 특수문자 1개 이상 포함해야 합니다.</Warning>
          ) : (
            <div style={{ marginBottom: "10px" }} />
          )}
          <br />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            required
          />
          <br />
          <Button type="submit">회원가입</Button>
        </form>
      </Container>
    </div>
  );
};

export default SignForm;
