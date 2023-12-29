import React, { useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import { Modal, message, Upload, Button } from "antd";
import BodyTitle from "../Widgets/BodyTitle";
import { createFile, getFiles } from "../services/project_file_service";
import { useSnapshot } from "valtio";
import state from "../store";
import SingleFile from "../Widgets/SingleFile";
import file from "../assets/file-plus-01.svg";
import { uploadFile } from "../services/upload_files";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 0.5px;
  height: 25.8px;
  flex-shrink: 0;
  background-color: #c4cafc;
`;

const Body = styled.div`
  border-radius: 25px;
  background: #f5f5f5;
  width: 100%;
  flex: 1;
  padding: 16px 34px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 64px - 36px - 16px - 16px);
`;

const SearchContainer = styled.div`
  height: 36px;
  width: 360px;
  border-radius: 50px;
  background-color: #eef3ec;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
`;

const ButtonWrapper = styled.div`
  fill: #fff;
  stroke-width: 1px;
  border: 1px solid #4a9230;
  border-radius: 6px;
  padding: 8px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
`;

const ButtonText = styled.div`
  color: #4a9230;
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
  line-height: 22px; /* 146.667% */
`;

const NoFilesMessage = styled.div`
  color: #777;
  font-size: 16px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 12px;
  padding: 16px 0;
  margin-bottom: 16px;
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;
const Project = () => {
  const snap = useSnapshot(state);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const projectFiles = snap.files.filter(
    (file) => file.projectId === snap.selectedProject.projectId
  );

  const handleAddFileClick = () => {
    setUploadModalVisible(true);
  };

  const handleUploadModalCancel = () => {
    setUploadModalVisible(false);
  };

  const UploadModal = ({ visible, onCancel }) => {
    const [selectedFile, setSelectedFile] = useState();

    const handleChange = (info) => {
      setSelectedFile(info);
    };

    const customRequest = ({ file, onSuccess, onError }) => {
      // Implement your file upload logic here
      // onSuccess(file.url);
      // onError("Error message");
    };

    const handleUpload = async () => {
      try {
        const fileType = selectedFile.file.type;
        const url = await uploadFile(selectedFile.file, "uploads");
        await createFile(
          snap.selectedProject.projectId,
          selectedFile.file.name,
          url,
          fileType
        );
        state.files.push({
          projectId: snap.selectedProject.projectId,
          name: selectedFile.file.name,
          downloadUrl: url,
          type: fileType,
        });
        message.success("Files uploaded successfully");
        onCancel();
      } catch (err) {
        message.error(`${err}`);
      }
    };

    return (
      <Modal
        title="Add File"
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpload}>
            Upload
          </Button>,
        ]}
      >
        <Upload
          onChange={handleChange}
          customRequest={customRequest}
          beforeUpload={() => false}
          maxCount={1} // Allow only one file
        >
          <Button icon={<FaSearch />}>Select File</Button>
        </Upload>
      </Modal>
    );
  };

  return (
    <Container>
      <SearchContainer>
        <FaSearch style={{ color: "grey" }} />
        <div style={{ width: 16 }} />
        <SearchInput placeholder="Search Files" />
        <FaWindowClose style={{ color: "grey", cursor: "pointer" }} />
      </SearchContainer>
      <div style={{ height: 16 }} />
      <Body>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BodyTitle title={`Home > ${snap.selectedProject.name}`} />
          <ButtonWrapper onClick={handleAddFileClick}>
            <ButtonText>Add File</ButtonText>
            <Divider />
            <img src={file} />
          </ButtonWrapper>
        </div>
        <div style={{ height: 16 }} />
        <Body>
          {projectFiles.length > 0 ? (
            <FileGrid>
              {projectFiles.map((file) => (
                <SingleFile key={file.fileId} file={file}></SingleFile>
              ))}
            </FileGrid>
          ) : (
            <NoFilesMessage>No files here</NoFilesMessage>
          )}
          <UploadModal
            visible={uploadModalVisible}
            onCancel={handleUploadModalCancel}
          />
        </Body>
      </Body>
    </Container>
  );
};

export default Project;