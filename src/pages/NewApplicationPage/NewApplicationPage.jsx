import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { createApplication } from '../../actions/application'
import Form from '../../components/Form'

const NewApplicationPage = ({ createApplication }) => {
  const onFinish = useCallback((values) => {
    createApplication(values)
  }, [])

  const getFormConfig = useCallback(() => [{
    placeholder: 'Name',
    name: 'name',
    required: true,
    message: 'Please input missing`s name!'
  }, {
    placeholder: 'Surname',
    name: 'surname',
    required: true,
    message: 'Please input missing`s surname!'
  }, {
    placeholder: 'Date of Birth',
    name: 'dateOfBirth',
    type: 'date',
    required: true,
    message: 'Please input date of birth'
  }, {
    placeholder: 'Country of birth',
    name: 'countryOfBirth',
    required: true,
    message: 'Please input country of birth'
  }, {
    placeholder: 'City of birth',
    name: 'cityOfBirth',
    required: true,
    message: 'Please input city of birth'
  }, {
    placeholder: 'Date of disappearing',
    name: 'dateOfDisappearing',
    type: 'date',
    required: true,
    message: 'Please input date of disappearing',
  }, {
    placeholder: 'Country of disappearing',
    name: 'countryOfDisappearing',
    required: true,
    message: 'Please input country of disappearing'
  }, {
    placeholder: 'City of disappearing',
    name: 'cityOfDisappearing',
    required: true,
    message: 'Please input city of disappearing'
  }], [])

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Please provide information about disappeared person.</h1>
      <Form
        config={getFormConfig()}
        onSubmit={onFinish}
        submitButtonText={'Submit application'}
      />
    </div>
  )
}

export default connect(null, {
  createApplication
})(NewApplicationPage)
