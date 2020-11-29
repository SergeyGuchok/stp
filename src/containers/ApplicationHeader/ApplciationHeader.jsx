import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { authenticateAction, logoutAction } from '../../actions/authentication'
import { loadPendingApplications } from "../../actions/application";
import { Logo, Header, AuthOptions, UserOptions, UserName } from './ApplicationHeader.styles'
import LogoIcon from '../../assets/logo.png'
import { Dropdown } from 'antd'
import Button from 'antd/es/button'
import Menu from 'antd/es/menu'
import { Avatar, Badge } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const ApplicationNavigation = ({ authenticateAction, userInfo, logoutAction, loadPendingApplications, list }) => {
  useEffect(() => {
    authenticateAction()
  }, [])

  useEffect(() => {
    userInfo._id && loadPendingApplications()
  }, [userInfo])

  const renderMenu = useCallback(() => {
    return (
      <Menu>
        <Menu.Item>
          <Link to={'/my-applications'}>My applications</Link>
        </Menu.Item>
        {(userInfo.role === 'admin' || userInfo.role === 'moderator') && (
          <Menu.Item>
            <Link to={'/review-applications'}>Review pending applications</Link>
          </Menu.Item>
        )}
      </Menu>
    )
  }, [userInfo])

  const logout = useCallback(() => {
    logoutAction()
  }, [logoutAction])

  return (
    <Header>
      <div>
        <Logo src={LogoIcon} alt="logo" />
      </div>
      <UserOptions>
        {userInfo._id && (
          <div style={{ display: 'flex' }}>
            <UserName>{userInfo.userName}</UserName>
            <Dropdown
              overlay={renderMenu()}
              trigger="click"
            >
            <div style={{ cursor: 'pointer' }}>
              <Badge count={(userInfo.role === 'admin' || userInfo.role === 'moderator') ? list.length : 0}>
                <Avatar size="large" shape="circle" icon={<UserOutlined />} />
              </Badge>
              <DownOutlined style={{ marginLeft: '0.5rem' }}/>
            </div>
            </Dropdown>
          </div>
        )}
        <AuthOptions>
          {!userInfo._id && <Link to={'/login'}><Button>Login</Button></Link>}
          {userInfo._id && <Button onClick={logout}>Logout</Button>}
          {!userInfo._id && <Link to={'/register'}><Button>Register</Button></Link>}
        </AuthOptions>
      </UserOptions>
    </Header>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.user.currentUser,
  list: state.applications.pending
})

export default connect(mapStateToProps, {
  authenticateAction,
  logoutAction,
  loadPendingApplications
})(ApplicationNavigation)
