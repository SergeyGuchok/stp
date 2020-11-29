import React from 'react'
import { connect } from 'react-redux'

const HomePage = ({ currentUser }) => {
  return (
    <div>
      {currentUser.userName && (
        <div>
          <h1>Username: {currentUser.userName}</h1>
          <h1>Role: {currentUser.role}</h1>
        </div>
      )}
      {!currentUser.userName && (
        <h1>Login first</h1>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HomePage)
