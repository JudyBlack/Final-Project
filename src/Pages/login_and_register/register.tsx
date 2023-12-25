import "./Login.scss";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repeat, setRepeat] = React.useState<string>("");
  const [nickname, setNickname] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");

  const [wrong, setWrong] = React.useState<string>('none');

  async function register(values: {
    email: string;
    password: string;
    nickname: string;
    phone: string;
    gender: string;
  }) {
    try {
      if (repeat === password) {
        const response = await fetch(
          "https://devedu-az.com:7001/api/movies/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Register successful:", data);
          navigate("/");
        } else {
          console.error("Register failed");
        }
      } else {
        setWrong('block')
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  }

  return (
    <div className="loginPage">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="repeat"
          rules={[
            { required: true, message: "Please input your Password again!" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Repeat Password Again"
            onChange={(event) => {
              setRepeat(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="nickname"
          rules={[{ required: true, message: "Please input your nickname!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Nickname"
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Phone number"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Gender"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </Form.Item>

        <p style={{color: 'red', display: wrong}}>Passwords are not same</p>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => {
              register({
                email: email,
                password: password,
                nickname: nickname,
                phone: phone,
                gender: gender,
              });
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
