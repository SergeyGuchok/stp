import React, { useState, useCallback } from 'react'
import { Card, Button, Dropdown, Menu } from "antd";
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { findUserByUsername, removeUser, blockUser, unblockUser, updateUser } from "../../actions/user";
import { StyledInput } from "./AdminPanelPage.styles";

const KEY_TO_VALUE_MAPPER = {
  userName: 'Username',
  role: 'Role',
  blocked: 'Banned'
}

const AdminPanelPage = ({ user, findUserByUsername, removeUser, blockUser, unblockUser, updateUser }) => {
  const [value, setValue] = useState('')

  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, [setValue])

  const onSearch = useCallback(() => {
    value && findUserByUsername(value)
  }, [findUserByUsername, value])

  const onRemove = useCallback(() => {
    removeUser(user.userName)
  }, [removeUser, user])

  const onBlock = useCallback(() => {
    blockUser(user.userName)
  }, [blockUser, user])

  const onUnblock = useCallback(() => {
    unblockUser(user.userName)
  }, [unblockUser, user])

  const onPromoteToAdmin = useCallback(() => {
    updateUser({ userName: user.userName, role: 'admin' })
  }, [updateUser, user])

  const onPromoteToModerator = useCallback(() => {
    updateUser({ userName: user.userName, role: 'moderator' })
  }, [updateUser, user])

  const renderMenu = useCallback(() => {
    return (
      <Menu>
        {user.blocked ?
          <Menu.Item onClick={onUnblock}>Unban User</Menu.Item> :
          <Menu.Item onClick={onBlock}>Ban User</Menu.Item>
        }
        <Menu.Item onClick={onRemove}>Remove User</Menu.Item>
        <Menu.Item onClick={onPromoteToAdmin}>Promote to Admin</Menu.Item>
        <Menu.Item onClick={onPromoteToModerator}>Promote to Moderator</Menu.Item>
      </Menu>
    )
  }, [user])

  const renderCardExtra = useCallback(() => {
    return (
      <Dropdown
        overlay={renderMenu()}
        trigger="click"
        getPopupContainer={(trigger) => trigger}
      >
        <Button>User Actions</Button>
      </Dropdown>
    )
  }, [renderMenu])

  return (
    <div>
      <StyledInput
        onChange={onChange}
        value={value}
        addonBefore={'Search for user'}
        placeholder={'Type username'}
        prefix={<UserOutlined />}
      />
      <Button
        type="primary"
        onClick={onSearch}
        style={{ marginBottom: '2rem' }}
      >
        Find User
      </Button>
      {Object.keys(user).length > 0 && (
        <Card
          title={'User info'}
          extra={renderCardExtra()}
        >
          {
            Object.keys(user).map((item, index) => (
              KEY_TO_VALUE_MAPPER[item] && <p key={index}>{KEY_TO_VALUE_MAPPER[item] + ' : ' + user[item]}</p>
            ))
          }
        </Card>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.searchUser
})

export default connect(mapStateToProps, {
  findUserByUsername,
  removeUser,
  blockUser,
  unblockUser,
  updateUser
})(AdminPanelPage)
