import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BodyTitle from "./BodyTitle";
import { Table, Space, Button, Select, Modal, message } from "antd";
import { getUsers, updateUser, deleteUser } from "../services/auth_service";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          onChange={(value) => handleChangeRole(record, value)}
        >
          <Option value="guest_user">Guest User</Option>
          <Option value="admin">Admin</Option>
          <Option value="project_manager">Project Manager </Option>
          <Option value="document_owner">Document Owner</Option>
          <Option value="normal_user">Normal User</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRole = async (user, value) => {
    try {
      const updatedUser = { ...user, userRole: value };
      await updateUser(updatedUser);

      await fetchUsers();
      message.success("User role updated");
    } catch (error) {
      message.error(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.uid);
      await fetchUsers();
      message.success("User deleted");
    } catch (error) {
      message.error(error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleModalOk = async () => {
    try {
      // Update the selected user with the modified data
      await updateUser(selectedUser);
      // Update the state or refetch users
      fetchUsers();
      setModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <BodyTitle title={"Users"} />
      <Body>
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.uid}
          loading={loading}
        />

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          visible={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          {/* Add your form fields here */}
          {/* For example:
          <Input
            value={selectedUser ? selectedUser.name : ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            placeholder="Name"
          />
          */}
        </Modal>
      </Body>
    </Container>
  );
};

export default Users;