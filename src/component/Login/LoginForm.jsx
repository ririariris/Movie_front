import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Input } from "./LoginForm.styled";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/info`, {
        id,
        pw,
      });
      console.log(user);
      console.log(response);
      alert("로그인 성공");
      navigate("/home");
      localStorage.setItem("id", response.user.id);
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
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <br />
        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
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
