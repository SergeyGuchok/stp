import React, { useCallback } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import Form from '../../components/Form'
import { loginAction } from '../../actions/authentication'
import { FormWrapper } from './LoginPage.styles'

const LoginPage = ({ loginAction }) => {
  const onFinish = useCallback((values) => {
    loginAction(values)
  }, [loginAction])

  const getFormConfig = useCallback(() => [{
    placeholder: 'Username',
    name: 'username',
    required: true,
    message: 'Please input your Username!',
    prefix: <UserOutlined />
  }, {
    placeholder: 'Password',
    name: 'password',
    required: true,
    type: 'password',
    message: 'Please input your Password',
    prefix: <LockOutlined />
  }], [])

  return (
    <div>
      <h1>Login</h1>
      <Form
        config={getFormConfig()}
        onSubmit={onFinish}
        submitButtonText={'Login'}
      />
    </div>
  )
}

export default connect(null, {
  loginAction
})(LoginPage)
