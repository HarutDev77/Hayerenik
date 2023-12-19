import React, {FC} from 'react';
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import classes from "./Login.module.scss";

const { Text, Title, Link } = Typography;

const Login:FC = () => {

    return (
        <section className={classes.hk_login_container}>
            <div>
                <div className={classes.hk_login_container_header}>
                    <Title className={classes.hk_login_container_title}>Sign in</Title>
                    <Text className={classes.hk_login_container_text}>
                        Welcome back to Hayerenik! Please enter your details below to
                        sign in.
                    </Text>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className={classes.hk_login_container_forgot_password} href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                            Log in
                        </Button>
                        <div className={classes.hk_login_footer}>
                            <Text className={classes.hk_login_container_text} >{"Don't have an account? "}</Text>{" "}
                            <Link href="">Sign up now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default Login;