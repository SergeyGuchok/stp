import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import Form from '../../components/Form'
import { registerAction } from '../../actions/authentication'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const RegisterPage = (props) => {
  const onFinish = useCallback((values) => {
    props.register(values)
  }, [props])

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
      <h1>Register</h1>
      <Form
        config={getFormConfig()}
        onSubmit={onFinish}
        submitButtonText={'Register'}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data))
})

export default connect(null, mapDispatchToProps)(RegisterPage)
