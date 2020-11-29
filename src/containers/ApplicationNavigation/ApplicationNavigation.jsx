import React, { useCallback } from 'react'
import { withRouter } from "react-router"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeOutlined, ContactsOutlined, FileAddOutlined, ProfileOutlined } from '@ant-design/icons'
import Menu from 'antd/es/menu'
import { Sider } from './ApplicationNavigation.styles'

const DIVIDER_KEY = 'divider'

const ApplicationNavigation = ({ location: { pathname }, userInfo }) => {
  const getNavigationConfig = useCallback(() => {
    const config = []

    config.push({
      path: '/home',
      icon: <HomeOutlined />,
      title: 'Home'
    })
    config.push({
      path: '/application-list',
      title: 'Applications',
      icon: <ProfileOutlined />
    })

    if (userInfo.role === 'moderator' || userInfo.role === 'user' || userInfo.role === 'admin') {
      config.push('divider')
      config.push({
        path: '/new-application',
        icon: <FileAddOutlined />,
        title: 'New Application'
      })
    }

    if (userInfo.role === 'admin') {
      config.push('divider')
      config.push({
        path: '/admin-panel',
        icon: <ContactsOutlined />,
        title: 'Admin Panel'
      })
    }

    return config
  }, [userInfo])

  const renderMenuItems = useCallback(() => (
    getNavigationConfig().map((navItem, index) => navItem !== 'divider' ? (
      <Menu.Item key={navItem.path} icon={navItem.icon}>
        <Link to={navItem.path}>{navItem.title}</Link>
      </Menu.Item>
    ) : <Menu.Divider key={DIVIDER_KEY + index}/>)
  ), [userInfo])

  return (
    <Sider collapsible theme={'light'}>
      <Menu theme="light" mode="inline" style={{ height: '100%' }} defaultSelectedKeys={[pathname]} >
        {renderMenuItems()}
      </Menu>
    </Sider>
  )
}

const mapStateToProps = (state) => ({
  userInfo: state.user.currentUser
})

export default withRouter(connect(mapStateToProps)(ApplicationNavigation))
