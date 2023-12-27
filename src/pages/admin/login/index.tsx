import React, {FC, useState} from 'react';
import {Button, Checkbox, Form, Input, Modal, Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import classes from "./Login.module.scss";
import {useRouter} from "next/router";
import axiosRequest from "@/api/axiosRequest";
import {setAuthToken} from "@/api/auth";
import {getCookie} from "cookies-next";
import {useMutation} from "@tanstack/react-query";
const { Text, Title, Link } = Typography;

export async function getServerSideProps(context: any) {
    const { req, res } = context;

    const token = getCookie('token', {
        req,
        res,
        httpOnly: false,
        secure: true,
        sameSite: 'none'
    });

    if(token){
       return {
            redirect: {
                destination: "/admin",
                permanent: false,
            }
        }
    }

    return {
        props: {}
    };
}

const Login:FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message,setMessage] = useState("")
    const router = useRouter();

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const loginHandler = async () => {
        try {
            const response = await axiosRequest.post("admin/login", {
                "email": email,
                "password": password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setAuthToken(response.data.resData);

             await router.push('/admin');
        } catch (error) {
            setMessage(error.message)
            setIsModalOpen(prevState => !prevState)
        }
    }



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
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
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
                        <Button block="true" type="primary" htmlType="submit" onClick={loginHandler}>
                            Log in
                        </Button>
                        <div className={classes.hk_login_footer}>
                            <Text className={classes.hk_login_container_text} >{"Don't have an account? "}</Text>{" "}
                            <Link href="">Sign up now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <Modal title="Error" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{message}</p>
            </Modal>
        </section>
    );
}

export default Login;