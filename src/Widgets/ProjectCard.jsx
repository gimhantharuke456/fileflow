import { Divider } from "antd";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 95%;
  height: auto;
`;

const ProjectName = styled.p`
  color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <ProjectName>{project.name}</ProjectName>
      <Divider />
    </Card>
  );
};

export default ProjectCard;
