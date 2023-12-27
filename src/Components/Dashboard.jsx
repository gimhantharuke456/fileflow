import React, { useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { getCurrentUserData } from "../services/auth_service";
import state from "../store";
import { useSnapshot } from "valtio";
import profile_icon from "../assets/profile_icon.svg";
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

const Dashboard = () => {
  const snap = useSnapshot(state);
  useEffect(() => {
    if (state.currentUser == {}) {
      getCurrentUserData().then((res) => {
        state.currentUser = res;
      });
    }
  }, []);
  return (
    <Container>
      <Navbar>
        <div style={{ width: 32 }} />
        <img src={logo} width={170} height={72} alt="Logo" />
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
    </Container>
  );
};

export default Dashboard;
