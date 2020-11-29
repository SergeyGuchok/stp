import React, { useCallback, useState } from 'react'
import { Button, Modal as AntModal } from "antd";

const Modal = ({ buttonText, modalOptions, modalTitle }) => {
  const [visible, setVisible] = useState(false)

  const showModal = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const hideModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <AntModal
        title={modalTitle}
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
      >
        <span>text</span>
      </AntModal>
    </>
  )
}

export default Modal
