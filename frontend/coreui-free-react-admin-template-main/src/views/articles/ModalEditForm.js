import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ModalEdit = (id, ttl, ctgry, cntnt, stats) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState(ttl)
  const [content, setContent] = useState(cntnt)
  const [category, setCategory] = useState(ctgry)
  const [status, setStatus] = useState(stats)
  const savePost = async (e) => {
    e.preventDefault()
    await axios
      .post(`http://localhost:3001/article/${id}`, {
        title,
        content,
        category,
        status,
      })
      .then(() => {
        setVisible(false)
      })
      .catch((err) => {
        console.log(err.data.Error[0])
      })
  }

  return (
    <>
      <CButton color="info" onClick={() => setVisible(!visible)}>
        Edit
      </CButton>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Edit Post</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={savePost}>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel>Title</CFormLabel>
              <CFormInput
                id="title"
                type="string"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Content</CFormLabel>
              <CFormTextarea
                id="content"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel>Category</CFormLabel>
              <CFormInput
                type="string"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Status</CFormLabel>
              <CFormSelect
                aria-label="select status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option disabled>Select status</option>
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
              </CFormSelect>
            </div>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalBody>
        </CForm>
      </CModal>
    </>
  )
}

export default ModalEdit
