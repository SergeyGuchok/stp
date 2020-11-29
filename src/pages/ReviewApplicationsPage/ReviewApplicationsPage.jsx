import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { loadPendingApplications, closeApplication, approveApplication } from "../../actions/application";
import ApplicationCard from "../../components/ApplicationCard";
import { ApplicationsWrapper } from './ReviewApplicationsPage.styles'

const ReviewApplicationsPage = ({ loadPendingApplications, list, approveApplication, closeApplication }) => {
  useEffect(() => {
    loadPendingApplications()
  }, [])

  const onApprove = useCallback((application) => {
    approveApplication(application)
  }, [approveApplication])

  const onDecline = useCallback((application) => {
    closeApplication(application)
  }, [closeApplication])

  if (!list.length) {
    return <h1>No pending applications</h1>
  }

  return (
    <ApplicationsWrapper>
      <ApplicationCard
        list={list}
        onApprove={onApprove}
        onDecline={onDecline}
      />
    </ApplicationsWrapper>
  )
}

const mapStateToProps = (state) => ({
  list: state.applications.pending
})

export default connect(mapStateToProps, {
  loadPendingApplications,
  closeApplication,
  approveApplication,
})(ReviewApplicationsPage)
