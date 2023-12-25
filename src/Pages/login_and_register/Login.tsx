import "./Login.scss";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";



const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const a = useLocation();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [wrong, setWrong] = React.useState<string>("none");

  const navigate = useNavigate();

  async function Login(values: {email: string, password: string}) {
    try {
      const response = await fetch('https://devedu-az.com:7001/api/movies/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        navigate('/');
      } else {
        setWrong('block');
      }
    } catch (error) {
      console.log(error)
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

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="log_check">Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </Form.Item>
        </Form.Item>

        <p style={{color: 'red', display: wrong}}>Email or password is wrong</p>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => Login({email: email, password: password})}
          >
            Log in
          </Button>
          Or{" "}
          <Link
            to="/register"
            className={a.pathname === "/register" ? "active" : "non-active"}
          >
            <span style={{color: 'white'}}>Register Now!</span>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
