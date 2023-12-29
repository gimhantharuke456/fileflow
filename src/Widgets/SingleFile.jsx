import React from "react";
import styled from "styled-components";
import TXT from "../assets/TXT.png";
import JPEG from "../assets/JPEG.png";
import DOCX from "../assets/DOCX.png";
import PDF from "../assets/PDF.png";
import { FaReply } from "react-icons/fa";

const Container = styled.div`
  width: 190px;
  height: 170px;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(73, 145, 48, 0.2);
  margin-bottom: 16px;
  margin-right: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FileContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileName = styled.p`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileImage = styled.img`
  width: 100%;
  max-height: 70%;
  object-fit: contain;
`;

const SingleFile = ({ file }) => {
  const folderIcon = (type) => {
    switch (type) {
      case "application/pdf":
        return PDF;
      case "image/jpeg":
        return JPEG;
      case "image/png":
        return JPEG;
      case "application/txt":
        return TXT;
      case "application/docx":
        return DOCX;
      default:
        return TXT;
    }
  };

  return (
    <Container>
      <FileContent>
        <FileName>{file.name}</FileName>
        <FaReply style={{ cursor: "pointer" }} />
      </FileContent>
      <FileImage src={folderIcon(file.type)} alt={file.name} />
    </Container>
  );
};

export default SingleFile;
