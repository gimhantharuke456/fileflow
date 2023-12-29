import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Menu, Dropdown, message, Modal, Input } from "antd";
import TXT from "../assets/TXT.png";
import JPEG from "../assets/JPEG.png";
import DOCX from "../assets/DOCX.png";
import PDF from "../assets/PDF.png";
import { FaReply } from "react-icons/fa";
import {
  addCommentToFile,
  getFiles,
  moveToRecycle,
  renameFile,
} from "../services/project_file_service";
import state from "../store";

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
  position: relative; /* Required for positioning the dropdown */
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

const SingleFile = ({ file, fromRecycle }) => {
  const [visible, setVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [newFileName, setNewFileName] = useState(file.name);
  const [comment, setComment] = useState(null);
  const handleMenuClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    setVisible(false);

    if (key === "addComment") {
      setCommentModalVisible(true);
    } else if (key === "rename") {
      setRenameModalVisible(true);
    } else if (key == "moveToRecycle") {
      moveToRecycle(file.fileId)
        .then(() => {
          getFiles().then((res) => {
            state.files = res;
          });
        })
        .catch((err) => {
          message.error(`${err}`);
        });
    }
  };

  const handleCommentModalCancel = () => {
    setCommentModalVisible(false);
  };
  const handleCommentOk = async () => {
    try {
      if (comment) {
        await addCommentToFile(file.fileId, comment);
        message.success("Comment added successfully");
        setComment("");
      }
      setCommentModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error(`${error}`);
    }
  };

  const handleRenameModalCancel = () => {
    setRenameModalVisible(false);
  };

  const handleRenameModalOk = async () => {
    try {
      await renameFile(file.fileId, newFileName);
      await getFiles().then((res) => {
        state.files = res;
      });
      console.log("Renaming file to:", newFileName);
      setRenameModalVisible(false);
    } catch (err) {
      message.error(`${err}`);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="addComment">Add Comment</Menu.Item>
      <Menu.Item key="open">Open</Menu.Item>
      <Menu.Item key="rename">Rename</Menu.Item>
      <Menu.Item key="download">Download</Menu.Item>
      <Menu.Item key="share">Share</Menu.Item>
      <Menu.Item key="moveToRecycle" style={{ color: "red" }}>
        Move to Recycle
      </Menu.Item>
    </Menu>
  );

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

        {!fromRecycle && (
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={visible}
            onVisibleChange={(vis) => setVisible(vis)}
          >
            <FaReply style={{ cursor: "pointer" }} />
          </Dropdown>
        )}
      </FileContent>
      <FileImage src={folderIcon(file.type)} alt={file.name} />

      {/* Comment Modal */}
      <Modal
        title="Add Comment"
        visible={commentModalVisible}
        onCancel={handleCommentModalCancel}
        onOk={handleCommentOk}
      >
        {/* Implement your comment input logic here */}
        <Input.TextArea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Type your comment here"
        />
      </Modal>

      {/* Rename Modal */}
      <Modal
        title="Rename File"
        visible={renameModalVisible}
        onOk={handleRenameModalOk}
        onCancel={handleRenameModalCancel}
      >
        <Input
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
      </Modal>
    </Container>
  );
};

export default SingleFile;
