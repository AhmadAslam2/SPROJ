import { Table, Input, Modal, Form, Button } from "antd";
import { useState, useContext, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { NGOContext } from "../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import React from "react";
React.useLayoutEffect = React.useEffect;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Members = () => {
  const [state, setState] = useContext(NGOContext);
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const [form] = Form.useForm();

  const router = useRouter();

  console.log(state);

  if (state === null) {
    router.push("/");
  }

  async function getMembers() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/current-ngo/members`,
      {
        params: {
          _id: state && state.ngo && state.ngo._id,
          email: state && state.ngo && state.ngo.email,
        },
      }
    );
    return response.data;
  }

  useEffect(() => {
    getMembers()
      .then((dataS) => {
        const members = dataS.membersQuery[0].members_info;
        console.log(members);
        for (let i = 0; i < members.length; i++) {
          members[i].key = members[i].email;
        }
        setDataSource(members);
        console.log(members);
      })
      .catch((err) => console.log(err));
  }, []);

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
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search Email"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary m-2"
                onClick={() => {
                  clearFilters();
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={() => confirm()}
              >
                Search
              </button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.includes(value);
      },
    },
    {
      title: "Donations",
      dataIndex: "donations",
      key: "donations",
      sorter: (record1, record2) => {
        return record1.donations > record2.donations;
      },
    },
    {
      title: "Blood Type",
      dataIndex: "bloodType",
      key: "bloodType",
      filters: [
        { text: "A+", value: "A+" },
        { text: "A-", value: "A-" },
        { text: "B+", value: "B+" },
        { text: "B-", value: "B-" },
        { text: "AB+", value: "AB+" },
        { text: "AB-", value: "AB-" },
        { text: "O-", value: "O-" },
        { text: "O+", value: "O+" },
      ],
      onFilter: (value, record) => {
        return record.bloodType == value;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search By Phone"
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary m-2"
                onClick={() => {
                  clearFilters();
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={() => confirm()}
              >
                Search
              </button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.phoneNumber.startsWith(value);
      },
    },
    {
      key: "deleteEntry",
      title: "Delete Entry",
      render: (record) => {
        return (
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            className="m-1"
            style={{ color: "red" }}
          />
        );
      },
    },
  ];

  const handleNewMember = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/current-ngo/add-new-member`,
        {
          new_member_info: values,
          ngo_id: state && state.ngo && state.ngo._id,
          ngo_email: state && state.ngo && state.ngo.email,
        }
      );
      console.log(data.userExists);
      const newMember = data.userExists;
      newMember.key = newMember.email;
      setDataSource((pre) => {
        return [data.userExists, ...pre];
      });
      setShowModal(false);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleDelete = async (record) => {
    Modal.confirm({
      title: "Delete the selected member?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/current-ngo/remove-member`,
          {
            ngo_id: state && state.ngo && state.ngo._id,
            user_id: record._id,
          }
        );
        setDataSource((pre) => {
          return pre.filter((member) => member._id != record._id);
        });
      },
    });
    console.log(record);
  };

  return (
    <>
      <Layout hasSider={true} style={{ height: "100vh" }} className="d-flex">
        <Sider collapsible>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item
              key="1"
              icon={<PieChartOutlined />}
              onClick={() => setShowTable(true)}
            >
              Members Table
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<DesktopOutlined />}
              onClick={() => setShowTable(false)}
            >
              NGO Description
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          {showTable ? (
            <>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary m-3"
                  onClick={() => setShowModal(true)}
                >
                  Enter New User
                </button>
              </div>
              <Modal
                title="Enter New Member"
                visible={showModal}
                onCancel={() => setShowModal(false)}
                //onOk={() => setShowModal(false)}
                footer={[]}
              >
                <Form
                  labelCol={{ span: 7 }}
                  onFinish={(values) => handleNewMember(values)}
                  form={form}
                >
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      { required: true, message: "Member's name is required" },
                      { whitespace: true },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type member's name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type member's email" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Phone is required" },
                      { whitespace: true },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Type member's Phone Number" />
                  </Form.Item>
                  <Form.Item>
                    <div className="d-flex justify-content-around">
                      <Button type="primary" htmlType="submit">
                        Register
                      </Button>
                      <button
                        className="btn btn-dark"
                        onClick={() => form.resetFields()}
                      >
                        Reset Fields
                      </button>
                      <button
                        className="btn btn-light"
                        onClick={() => {
                          setShowModal(false);
                          form.resetFields();
                        }}
                      >
                        Return
                      </button>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
              <Table
                dataSource={dataSource}
                columns={columns}
                bordered
                style={{ margin: 10 }}
              />
            </>
          ) : (
            <>
              <div className="d-flex">
                <h3 className="pt-4 px-4">
                  NGO Name: {state && state.ngo && state.ngo.name}
                </h3>
              </div>
              <div className="d-flex">
                <h3 className="pt-4 px-4">
                  NGO Email: {state && state.ngo && state.ngo.email}
                </h3>
              </div>
              <hr />
            </>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Members;
