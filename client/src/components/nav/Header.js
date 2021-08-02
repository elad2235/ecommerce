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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [state, setState] = useState({ current: "Home" });
  let dispatch = useDispatch();
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

    history.pushState("/login");
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
      <Menu.SubMenu key="Username" icon={<SettingOutlined />} title="Username">
        <Menu.Item key="setting:1">1</Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key="Register"
        icon={<UserAddOutlined />}
        className="float-right"
      >
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="Login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
