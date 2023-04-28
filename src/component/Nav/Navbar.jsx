import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LOGOIMG from "../../images/logo192.png";
import {
  Button,
  ClickUser,
  Home,
  Logo,
  Menu,
  Menulist,
  Nav,
  NavButtons,
  UserList,
  UserListForm,
  UserName,
} from "./Navbar.styled";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clickUser, setClickUser] = useState(false);
  const UserInfo = () => {
    setClickUser(!clickUser);
  };

  const menuItems = [
    {
      text: "개인정보",
      onClick: () => {
        navigate(`/home/${localStorage.getItem("id")}`);
        setClickUser(false);
      },
    },
    {
      text: "Logout",
      onClick: () => {
        localStorage.clear();
        navigate("/");
        setClickUser(false);
      },
    },
  ];

  return (
    <Nav>
      <Logo>
        <img
          src={LOGOIMG}
          alt={"logo"}
          style={{ width: "50px", height: "50px" }}
        />
      </Logo>
      <NavButtons>
        <Menu>
          <Link style={{ textDecoration: "none" }} to="/Movies">
            <Button>Movies</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/Top10">
            <Button>Top10</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/MyPage">
            <Button>MyPage</Button>
          </Link>
        </Menu>
      </NavButtons>
      <div>
        {location.pathname === "/sign" ? (
          <Link style={{ textDecoration: "none" }} to="/">
            <Button>로그인</Button>
          </Link>
        ) : location.pathname === "/" ? (
          <Link style={{ textDecoration: "none" }} to="/sign">
            <Button>회원가입</Button>
          </Link>
        ) : (
          <div>
            <div>
              <Home
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </Home>
              <UserName onClick={UserInfo}>
                {localStorage.getItem("name")}
              </UserName>
              {clickUser && (
                <ClickUser>
                  {menuItems.map((item, index) => (
                    <UserListForm key={index}>
                      <UserList onClick={item.onClick}>{item.text}</UserList>
                    </UserListForm>
                  ))}
                </ClickUser>
              )}
            </div>
          </div>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
