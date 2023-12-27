import React, { useRef } from "react";
import styled from "styled-components";
import login from "../assets/login.png";
import logo from "../assets/logo.png";
import TextFormField from "../Widgets/TextFormField";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Section = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`;

const Logo = styled.div`
  width: 150px;
  height: 52px;
`;

const FormTitle = styled.h1`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 140% */
`;

const LoginScreen = () => {
  const emailRef = useRef();
  return (
    <Container>
      <Section>
        <Image src={login} alt="Login" />
      </Section>
      <Section>
        <div style={{ flex: 1 }} />{" "}
        <FormContainer>
          <Logo>
            <img src={logo} style={{ width: "100%", height: "100%" }} />
          </Logo>
          <FormTitle>Nice to see you again</FormTitle>
          <TextFormField
            ref={emailRef}
            label={"Enter your email"}
            hint={"Email:"}
          />
        </FormContainer>
        <div style={{ flex: 1 }} />
      </Section>
    </Container>
  );
};

export default LoginScreen;
