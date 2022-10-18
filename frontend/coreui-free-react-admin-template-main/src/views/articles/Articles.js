import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CAvatar,
  CTableHead,
  CTableBody,
  CTableDataCell,
  CProgress,
  CTableRow,
  CTableHeaderCell,
  CNav,
  CNavItem,
  CNavLink,
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
  const [id, setId] = useState()
  const navigate = useNavigate()

  const seeDetails = (id, e) => {
    e.preventDefault()
    navigate(`/article`)
  }

  useEffect(() => {
    listArticle()
  }, [articles])

  // useEffect(() => {

  // }, articles)

  const deletePost = async (id, e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3001/article/${id}`)
    navigate(`/#/article`)
  }

  const listArticle = async () => {
    await axios
      .get('http://localhost:3001/article')
      .then((res) => {
        console.log(res.data)
        setArticles(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Article List</strong>
          </CCardHeader>
          <CCardBody>
            <div>{ModalAdd()}</div>
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
                      <CButton color="info" onClick={(e) => seeDetails(item.id, e)}>
                        Edit
                      </CButton>
                      {/* {ModalEdit(item.id, item.title, item.category, item.content, item.status)} */}
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
  )
}

export default Cards
