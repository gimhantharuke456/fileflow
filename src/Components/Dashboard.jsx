import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { getCurrentUserData, signout } from "../services/auth_service";
import state from "../store";
import { useSnapshot } from "valtio";
import profile_icon from "../assets/profile_icon.svg";
import DashboardMenuItem from "../Widgets/DashboardMenuItem";
import Home from "../Components/Home";
import Upload from "../assets/u_box.svg";
import Notifications from "../assets/u_bell.svg";
import Bin from "../assets/trash-01.svg";
import User from "../assets/profile_icon.svg";
import Uploads from "./Uploads";
import { useNavigate } from "react-router-dom";
import Project from "./Project";
import Recycle from "./Recycle";
import AppNotifications from "./AppNotifications";
import { Menu, Dropdown, message } from "antd";
import Users from "../Widgets/Users";
import home_icon from "../assets/u_home-alt.svg";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.div`
  height: 72px;
  width: 100vw;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 170px;
  height: 65px;
`;

const WelcomeText = styled.p`
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;

const Body = styled.div`
  height: calc(100vh - 72px);
  display: flex;
  width: 100vw;
`;

const LeftMenuContainer = styled.div`
  width: 250px;
  height: 100%;
  border: 1px solid grey;
`;

const RightBody = styled.div`
  flex: 1;
  padding: 16px;
`;

const Dashboard = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      try {
        signout().then(() => {
          navigate("/");
        });
      } catch (err) {
        message.error(`${err}`);
      }
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="userEmail">{snap.currentUser.email}</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getCurrentUserData()
      .then((res) => {
        state.currentUser = res;
        if (state.currentUser.userRole === "Admin") {
          state.canAddFiles = true;
          state.canCreateProject = true;
          state.canDeleteFiles = true;
          state.canSeeUsers = true;
          state.canCommentFiles = true;
        }
        if (state.currentUser.userRole === "Project manager") {
          state.canAddFiles = true;
          state.canCreateProject = true;
          state.canDeleteFiles = true;
          state.canCommentFiles = true;
        }
        if (state.currentUser.userRole === "Document owner") {
          state.canAddFiles = true;
          state.canDeleteFiles = true;
          state.canCommentFiles = true;
        }
        if (state.currentUser.userRole == "Normal user") {
          state.canCommentFiles = true;
        }
      })
      .catch((err) => {
        //   message.error(`${err}`);
        navigate("/");
      });
  }, []);

  return (
    <Container>
      <Navbar>
        <div style={{ width: 32 }} />
        <Logo>
          <img src={logo} width={170} height={72} alt="Logo" />
        </Logo>
        <div style={{ flex: 1 }} />
        <WelcomeText>
          Welcome,
          <span
            style={{ fontWeight: "bold", fontSize: 16 }}
          >{` ${snap.currentUser.name}\n(${snap.currentUser?.userRole})`}</span>
        </WelcomeText>
        <div style={{ width: 16 }} />
        <Dropdown overlay={menu} trigger={["click"]}>
          <img style={{ cursor: "pointer" }} src={profile_icon} alt="Profile" />
        </Dropdown>
        <div style={{ width: 32 }} />
      </Navbar>
      <Body>
        <LeftMenuContainer>
          <DashboardMenuItem title={"Home"} icon={home_icon} index={0} />
          {snap.canAddFiles && (
            <DashboardMenuItem title={"Upload"} icon={Upload} index={1} />
          )}
          <DashboardMenuItem
            title={"Notifications"}
            icon={Notifications}
            index={2}
          />
          {snap.canAddFiles && (
            <DashboardMenuItem title={"Bin"} icon={Bin} index={3} />
          )}
          {snap.canSeeUsers && (
            <DashboardMenuItem title={"Users"} icon={User} index={5} />
          )}
        </LeftMenuContainer>
        <RightBody>
          {snap.dashboardActiveIndex === 0 && <Home />}
          {snap.dashboardActiveIndex == 1 && <Uploads />}
          {snap.dashboardActiveIndex == 2 && <AppNotifications />}
          {snap.dashboardActiveIndex == 3 && <Recycle />}
          {snap.dashboardActiveIndex == 4 && <Project />}
          {snap.dashboardActiveIndex == 5 && <Users />}
        </RightBody>
      </Body>
    </Container>
  );
};

export default Dashboard;
