import "./Login.scss";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link, useLocation, useNavigate } from "react-router-dom";


const firebaseConfig = {
  apiKey: "AIzaSyAYRhM0hRpdGiaLP6Sj6FbThFhB2hiARYM",
  authDomain: "film-website-bc42f.firebaseapp.com",
  projectId: "film-website-bc42f",
  storageBucket: "film-website-bc42f.appspot.com",
  messagingSenderId: "779630627693",
  appId: "1:779630627693:web:d3db16fa516dabe3e46864",
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const a = useLocation();

  const navigate = useNavigate()

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/moviePage')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="log_check">Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => login()}
          >
            Log in
          </Button>
          Or{" "}
          <Link
            to="/register"
            className={a.pathname === "/register" ? "active" : "non-active"}
          >
            Register now
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
