import React, { useCallback } from 'react'
import {Button, Form as AntForm, Input, DatePicker} from 'antd'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

const Form = ({ config, onSubmit, submitButtonText }) => {
  const onFinish = useCallback((values) => {
    onSubmit(values)
  }, [onSubmit])

  const renderFormItems = useCallback(() => config.map((item, index) => (
    <AntForm.Item
      key={index}
      name={item.name}
      label={item.placeholder || ''}
      rules={[{
        required: item.required || false,
        message: item.message
      }]}
    >
      {item.type === 'date' ? <DatePicker /> : (
        <Input
          prefix={item.prefix}
          type={item.type || 'text'}
          placeholder={item.placeholder}
        />
      )}
    </AntForm.Item>
  )), [config])

  return (
    <AntForm
      {...formItemLayout}
      onFinish={onFinish}
    >
      {renderFormItems()}
      <AntForm.Item>
        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
          {submitButtonText}
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default Form
