import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Input } from "./LoginForm.styled";
import { ServerApi } from "../../api/ServerApi";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${ServerApi}/login/`, {
        username,
        password,
      });
      console.log(response);
      alert("로그인 성공");
      navigate("/home");
      localStorage.setItem("id", response.data.username);
      localStorage.setItem("name", response.data.name);
      // localStorage.setItem("username", response.data.name);
    } catch (error) {
      alert("아이디나 비밀번호를 다시 확인해주세요.");
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          style={{ marginBottom: "10px" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Button style={{ marginLeft: "130px" }} type="submit">
          로그인
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
