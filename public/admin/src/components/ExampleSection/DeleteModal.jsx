import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import { deleteExamples } from '../../services/DBRoutes';

const DeleteModal = ({ modalShow, setModalShow, items, setItems, setImgData, setLoading}) => {

  const [status, setStatus] = useState();

  async function onDelete (items) {
    deleteExamples(items)
    .then((res) => {
      setStatus(`Deleted successfully: ${res.status}`)
      setTimeout(() => {
        setImgData([])
        setItems([])
        setModalShow(false)
        setStatus('')
        setLoading(true)
      }, 2000)
    })
    .catch((rej) => {
      console.log(rej)
      setStatus(`Error: ${rej.stauts}`)
    })
  }

  return(
    <Modal
      show={modalShow}
      onHide={setModalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className=' text-center'>Delete records: <span>{items.length}</span> ?</h4>
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex justify-content-around w-100'>
          <Button className="px-5 mx-3" onClick={() => setModalShow(false)}>Close</Button>
          <Button className="px-5 mx-3" onClick={() => onDelete(items)}>Delete</Button>
        </div>
        <div className='w-100 text-center text-info fw-bold'>{status}</div>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal