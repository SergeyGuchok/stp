import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { loadMyApplications, deleteApplication } from '../../actions/application'
import ApplicationCard from "../../components/ApplicationCard";
import { ApplicationsWrapper } from "./MyApplicationsPage.styles";

const MyApplicationsPage = ({ loadMyApplications, list, deleteApplication }) => {
  useEffect(() => {
    loadMyApplications()
  }, [])

  const onDelete = useCallback((application) => {
    deleteApplication(application._id)
  }, [deleteApplication])

  return (
    list.length ? (
      <ApplicationsWrapper>
        <ApplicationCard list={list} onDelete={onDelete}/>
      </ApplicationsWrapper>
    ) : <h1>There are currently no applications</h1>
  )
}

const mapStateToProps = (state) => ({
  list: state.applications.my
})
export default connect(mapStateToProps, {
  loadMyApplications,
  deleteApplication
})(MyApplicationsPage)
