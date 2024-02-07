import React, { FC, useState } from 'react'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import classes from './Login.module.scss'
import { useRouter } from 'next/router'
import { setAuthToken } from '@/api/auth'
import { getCookie } from 'cookies-next'
import { useMutation } from 'react-query'
import AuthApi from '@/api/auth.api'
import { ILoginData } from '@/types/admin'

const { Text, Title, Link } = Typography

export async function getServerSideProps(context: any) {
   const { req, res } = context

   const token = getCookie('token', {
      req,
      res,
      httpOnly: false,
      secure: true,
      sameSite: 'none',
   })

   if (token) {
      return {
         redirect: {
            destination: '/admin',
            permanent: false,
         },
      }
   }

   return {
      props: {},
   }
}

const Login: FC = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const router = useRouter()

   const { mutate } = useMutation(
      (data: ILoginData) => {
         return AuthApi.login(data)
      },
      {
         onSuccess: (data) => {
            setAuthToken(data.data.resData)
            router.push('/admin')
         },
      },
   )

   return (
      <section className={classes.hk_login_container}>
         <div>
            <div className={classes.hk_login_container_header}>
               <Title className={classes.hk_login_container_title}>Sign in</Title>
               <Text className={classes.hk_login_container_text}>
                  Welcome back to Hayerenik! Please enter your details below to sign in.
               </Text>
            </div>
            <Form
               name='normal_login'
               initialValues={{
                  remember: true,
               }}
               layout='vertical'
               requiredMark='optional'
            >
               <Form.Item
                  name='email'
                  rules={[
                     {
                        type: 'email',
                        required: true,
                        message: 'Please input your Email!',
                     },
                  ]}
               >
                  <Input
                     prefix={<MailOutlined />}
                     placeholder='Email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </Form.Item>
               <Form.Item
                  name='password'
                  rules={[
                     {
                        required: true,
                        message: 'Please input your Password!',
                     },
                  ]}
               >
                  <Input.Password
                     prefix={<LockOutlined />}
                     type='password'
                     placeholder='Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </Form.Item>
               <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                     <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a className={classes.hk_login_container_forgot_password} href=''>
                     Forgot password?
                  </a>
               </Form.Item>
               <Form.Item style={{ marginBottom: '0px' }}>
                  <Button
                     type='primary'
                     htmlType='submit'
                     onClick={() => {
                        mutate({ email, password })
                     }}
                  >
                     Log in
                  </Button>
                  <div className={classes.hk_login_footer}>
                     <Text className={classes.hk_login_container_text}>
                        {"Don't have an account? "}
                     </Text>{' '}
                     <Link href=''>Sign up now</Link>
                  </div>
               </Form.Item>
            </Form>
         </div>
      </section>
   )
}

export default Login
