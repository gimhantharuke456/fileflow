import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { getCurrentUserData } from "../services/auth_service";
import state from "../store";
import { useSnapshot } from "valtio";
import profile_icon from "../assets/profile_icon.svg";
import DashboardMenuItem from "../Widgets/DashboardMenuItem";
import Home from "../Components/Home";
import Upload from "../assets/u_box.svg";
import Notifications from "../assets/u_bell.svg";
import Bin from "../assets/trash-01.svg";
import Uploads from "./Uploads";
import { useNavigate } from "react-router-dom";
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
  line-height: 130%; /* 23.4px */
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
  useEffect(() => {
    getCurrentUserData()
      .then((res) => {
        state.currentUser = res;
      })
      .catch((err) => {
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
          >{` ${snap.currentUser.name}`}</span>
        </WelcomeText>
        <div style={{ width: 16 }} />
        <img style={{ cursor: "pointer" }} src={profile_icon} />
        <div style={{ width: 32 }} />
      </Navbar>
      <Body>
        <LeftMenuContainer>
          <DashboardMenuItem title={"Home"} icon={Home} index={0} />
          <DashboardMenuItem title={"Upload"} icon={Upload} index={1} />
          <DashboardMenuItem
            title={"Notifications"}
            icon={Notifications}
            index={2}
          />
          <DashboardMenuItem title={"Bin"} icon={Bin} index={3} />
        </LeftMenuContainer>
        <RightBody>
          {snap.dashboardActiveIndex === 0 && <Home />}
          {snap.dashboardActiveIndex == 1 && <Uploads />}
        </RightBody>
      </Body>
    </Container>
  );
};

export default Dashboard;
