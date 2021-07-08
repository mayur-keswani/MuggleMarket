import React from 'react'
import './ModalWrapper.css'
import {  Modal } from 'semantic-ui-react'

const ModalWrapper=(props) => {
  return (
    <Modal
      closeIcon
      onClose={props.closeModal}
      open={props.isOpen}
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content >
        {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
        <Modal.Description>

          {props.children}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ModalWrapper