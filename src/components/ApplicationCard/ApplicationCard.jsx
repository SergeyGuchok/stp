import React, { useCallback } from 'react'
import { Card } from 'antd'
import moment from 'moment'
import {EditOutlined, EllipsisOutlined, SettingOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";

const KEY_TO_VALUE_MAPPER = {
  cityOfBirth: 'City of birth',
  cityOfDisappearing: 'City of disappearing',
  countryOfBirth: 'Country of Birth',
  countryOfDisappearing: 'Country of disappearing',
  dateOfBirth: 'Date of birth',
  dateOfDisappearing: 'Date of disappearing',
  name: 'Name',
  surname: 'Surname',
  state: 'State'
}

const SHOULD_CONVERT_KEY = {
  dateOfBirth: true,
  dateOfDisappearing: true,
}

const ApplicationCard = ({ list, onApprove, onDecline, onDelete }) => list.map((item, index) => {
  const actions = []

  onDelete && actions.push(<CloseOutlined key="delete" onClick={() => onDelete(item)} />)
  onApprove && actions.push(<CheckOutlined key="approve" onClick={() => onApprove(item)} />)
  onDecline && actions.push(<CloseOutlined key="decline" onClick={() => onDecline(item)} />)
  return (
      <Card
      key={index}
      cover={<img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="image" />}
      actions={actions}
    >
      {Object.keys(item).map((descriptionItem, index) => {
        const text = SHOULD_CONVERT_KEY[descriptionItem] ?
          moment(item[descriptionItem]).format('MMM Do YY') :
          item[descriptionItem]
        const title = KEY_TO_VALUE_MAPPER[descriptionItem]

        return title && (
          <p key={index}>{title + ' : ' + text}</p>
        )
      })}
    </Card>
  )}
)

export default ApplicationCard
