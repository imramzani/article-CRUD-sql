import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CTableHeaderCell,
  CNav,
  CNavItem,
  CNavLink,
  CModal,
  CModalBody,
  CModalHeader,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactImg from 'src/assets/images/react.jpg'
import ModalAdd from './ModalAddForm'
import ModalEdit from './ModalEditForm'

const Cards = () => {
  const [articles, setArticles] = useState([])
  const [visible, setVisible] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [stats, setStats] = useState('Publish')
  const [id, setId] = useState()
  const navigate = useNavigate()
  let props = {
    id,
    setEditForm,
  }

  const seeDetails = (id, e) => {
    e.preventDefault()
    navigate(`/article`)
  }

  useEffect(() => {
    console.log(visible, editForm)
    listArticle()
  }, [visible, editForm, offset, limit, stats])

  const deletePost = async (id, e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3001/article/${id}`)
    navigate(`/#/article`)
  }

  const listArticle = async () => {
    await axios
      .get(`http://localhost:3001/article?status=${stats}&limit=${limit}&offset=${offset}`)
      .then((res) => {
        console.log(res.data)
        setArticles(res.data.data)
        console.log(visible)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Article List</strong>
            </CCardHeader>
            <CCardBody>
              {/* <div>{ModalAdd()}</div> */}
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink onClick={() => setStats('Publish')}>Published</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink onClick={() => setStats('Draft')}>Draft</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink onClick={() => setStats('Trash')}>Trashed</CNavLink>
                </CNavItem>
              </CNav>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">No.</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Content</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Category</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {articles.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.title}</strong>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="justify-content">
                        <div>{item.content}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.category}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="info"
                          onClick={() => {
                            setId(item.id)
                            setEditForm(!editForm)
                          }}
                        >
                          Edit
                        </CButton>
                        {/* {ModalEdit(item)} */}
                        <CButton color="danger" onClick={(e) => deletePost(item.id, e)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CButton onClick={() => setVisible(!visible)}>New Article</CButton>
      <CModal backdrop="static" visible={visible}>
        <CModalHeader />
        <CModalBody>
          <ModalAdd passToChild={setVisible} />
        </CModalBody>
      </CModal>
      <CModal backdrop="static" visible={editForm}>
        <CModalHeader />
        <CModalBody>
          <ModalEdit
            passToChild={props}
            onClose={() => {
              setEditForm(!editForm)
            }}
          />
        </CModalBody>
      </CModal>
    </>
  )
}

export default Cards
