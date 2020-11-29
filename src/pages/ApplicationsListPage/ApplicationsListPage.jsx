import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ApplicationsWrapper } from './ApplicationsListPage.styles'
import { loadApplications } from '../../actions/application'
import ApplicationCard from "../../components/ApplicationCard";

const ApplicationsListPage = ({ loadApplications, list }) => {
  useEffect(() => {
    loadApplications()
  }, [])

  return (
    list.length ? (
      <ApplicationsWrapper>
        <ApplicationCard list={list} />
      </ApplicationsWrapper>
    ) : <h1>There are currently no applications</h1>
  )
}

const mapStateToProps = (state) => ({
  list: state.applications.list
})

export default connect(mapStateToProps, {
  loadApplications
})(ApplicationsListPage)
