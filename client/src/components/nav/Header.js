import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [state, setState] = useState({ current: "Home" });
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setState({ current: e.key });
  };

  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[state.current]}
      mode="horizontal"
    >
      <Menu.Item key="Home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {user && (
        <Menu.SubMenu
          key="Username"
          icon={<SettingOutlined />}
          title={user.email.split("@")[0]}
        >
          <Menu.Item key="setting:1">1</Menu.Item>
          <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      )}
      {!user && (
        <Menu.Item
          key="Register"
          icon={<UserAddOutlined />}
          className="float-right"
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key="Login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
