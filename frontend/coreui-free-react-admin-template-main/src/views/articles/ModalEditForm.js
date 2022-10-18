import React, { useEffect } from 'react'
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

const ModalEdit = (props, ttl, ctgry, cntnt, stats) => {
  const [prop, setProps] = useState(props)
  const [id, setId] = useState(props.passToChild.id)
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [category, setCategory] = useState()
  const [status, setStatus] = useState()

  const getArticle = async () => {
    await axios
      .get(`http://localhost:3001/article/${id}`)
      .then((res) => {
        console.log(res.data)
        setTitle(res.data.data.title)
        setContent(res.data.data.content)
        setCategory(res.data.data.category)
        setStatus(res.data.data.status)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getArticle()
  }, [])

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
        props.passToChild(false)
      })
      .catch((err) => {
        console.log(err.data.Error[0])
      })
  }

  const deletePost = async (e) => {
    e.preventDefault()
    await axios
      .delete(`http://localhost:3001/article/${id}`)
      .then(() => {
        props.passToChild.setEditForm(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CForm onSubmit={savePost}>
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
        <CButton color="secondary" onClick={(e) => deletePost(e)}>
          Trash
        </CButton>
        <CButton color="primary" type="submit">
          Save Changes
        </CButton>
      </CForm>
    </>
  )
}

export default ModalEdit
