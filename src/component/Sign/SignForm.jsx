import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Warning } from "../Login/LoginForm.styled";
import axios from "axios";
import { ServerApi } from "../../api/ServerApi";

const SignForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [idOk, setIdOk] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);

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

    if (!containsSpecialCharacter(password)) {
      alert("비밀번호에는 최소 1개의 특수 문자가 포함되어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(`${ServerApi}/signup/`, {
        username,
        password,
        name,
      });
      alert("회원가입 성공");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.detail === "Username already registered") {
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
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <br />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (containsSpecialCharacter(e.target.value)) {
                setPasswordOk(true);
              } else {
                setPasswordOk(false);
              }
            }}
            required
          />
          {!passwordOk ? (
            <Warning> 반드시 특수문자 1개 이상 포함해야 합니다.</Warning>
          ) : (
            <div style={{ marginBottom: "10px" }} />
          )}
          <br />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <Input
            style={{ marginTop: "10px" }}
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
