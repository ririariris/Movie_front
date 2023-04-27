import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  ClickUser,
  Home,
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
      <NavButtons>
        <Menu>
          <Menulist>Movies</Menulist>
          <Menulist>Top10</Menulist>
          <Menulist>MyPage</Menulist>
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
                {localStorage.getItem("id")}
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
