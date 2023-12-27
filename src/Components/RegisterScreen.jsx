import React, { useRef } from "react";
import styled from "styled-components";
import bro from "../assets/bro.png";
import logo from "../assets/logo.png";
import TextFormField from "../Widgets/TextFormField";
import PasswordField from "../Widgets/PasswordField";
import FilledButton from "../Widgets/FilledButton";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../Widgets/DropDownMenu";
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
  gap: 25px;
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

const ForgetPasswordWrapper = styled.div`
  display: flex;
  width: 421px;
  align-items: center;
  height: auto;
  justify-content: center;
  gap: 8px;
`;

const ForgetPasswordText = styled.div`
  color: #007aff;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.3px;
  cursor: pointer;
`;
const DontYouText = styled.p`
  color: #1a1a1a;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.3px;
`;

const RegisterScreen = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileNumber = useRef();
  const nameRef = useRef();
  const userRoleRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  return (
    <Container>
      <Section>
        <Image src={bro} alt="Login" />
      </Section>
      <Section>
        <div style={{ flex: 1 }} />{" "}
        <FormContainer>
          <Logo>
            <img src={logo} style={{ width: "100%", height: "100%" }} />
          </Logo>
          <TextFormField
            ref={nameRef}
            label={"Enter your name"}
            hint={"Name:"}
          />
          <TextFormField
            ref={emailRef}
            label={"Enter your email"}
            hint={"Email:"}
          />
          <DropdownMenu
            options={["Admin"]}
            label={"Select the user role"}
            hint={"User Roler:"}
          />
          <TextFormField
            ref={emailRef}
            label={"Enter your mobile number"}
            hint={"Mobile Number:"}
          />
          <PasswordField
            ref={passwordRef}
            label={"Enter your password"}
            hint={"Password:"}
          />
          <PasswordField
            ref={confirmPasswordRef}
            label={"Enter your password again"}
            hint={"Confirm Password:"}
          />
          <FilledButton
            onClick={() => {}}
            text={"Register"}
            width={"421px"}
            height={"44px"}
          />
          <ForgetPasswordWrapper>
            <DontYouText>Already have an account ? </DontYouText>
            <ForgetPasswordText
              onClick={() => {
                navigate("/login");
              }}
            >
              {" "}
              Login now
            </ForgetPasswordText>
          </ForgetPasswordWrapper>
        </FormContainer>
        <div style={{ flex: 1 }} />
      </Section>
    </Container>
  );
};

export default RegisterScreen;
