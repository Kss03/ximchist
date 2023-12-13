
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getImageTable } from '../../services/DBRoutes'

import TableRow from '../../components/ExampleSection/TableRow'
import DeleteModal from '../../components/ExampleSection/DeleteModal'


const ExamplesPage = () => {

  const [imgData, setImgData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  useEffect(() => {
    onGetItems()
  }, [loading])

  function scrollHandler (e) {
    let scrollHeight = e.target.documentElement.scrollHeight
    let scrollTop = e.target.documentElement.scrollTop
    let innerHeight = window.innerHeight

    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      setLoading(true)
    }
    console.log(scrollHeight, scrollTop, innerHeight)
  }

  async function onGetItems () {
    if (loading) {
      await getImageTable(offset, 10)
      .then(resolve => {
        const items = imgData
        items.push(...resolve.data)
        setImgData(items)
        setOffset(items.length-1)
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
    }
  }

  function createTable () {
    const rows = imgData.map(item => {
      const {id, before_img, after_img} = item;
      return <TableRow 
        img1={before_img} 
        img2={after_img} 
        id={id} 
        modalShow={setModalShow} 
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setAmount={setSelectedAmount}
        onDelete={onDelete}/>
    })
    return rows
  }

  function onSelectAll () {
    const idArr = imgData.map((item) => item.id)
    setSelectedItems(idArr)
    setSelectedAmount(idArr.length)
  }
  function onDeselectAll () {
    setSelectedItems([])
    setSelectedAmount(0)
  }

  function onDelete (items) {
    console.log(items)
    setItemsToDelete(items)
    setModalShow(true)
  }

  const table = !error && imgData ? createTable() : null;
  const isLoading = loading && !error ? <div><h2>Loading...</h2></div> : null;
  const isError = error ? <div><h2>Error!!!</h2></div> : null;


  return(
    <div className="example-page ">
      <div className=" container-fluid">
        <h2 className=" text-dark ps-5 pt-4 mb-3">Examples Section</h2>
        <div className=" w-100 rounded-3 bg-white px-3 py-3">
          <div className="row">
            <div className="col-12">
              <h5 className='ps-3 mb-3'>Uploaded Images</h5>
              <div className="btn-group mb-4" role="group" aria-label="Basic outlined">
                <Link to="addNew" type="button" className="btn btn-outline-dark px-4 fs-6">Add new images</Link>
                <button type="button" className="btn btn-outline-dark px-4 fs-6" onClick={onSelectAll}>Select All</button>
                <button type="button" className="btn btn-outline-dark px-4 fs-6" onClick={onDeselectAll}>Deselect All</button>
                <button type="button" className="btn btn-outline-dark px-4 fs-6" disabled={selectedAmount ? false : true} onClick={() => onDelete(selectedItems)}>Remove selected ({selectedAmount})</button>
              </div>
            </div>
            <div className="col-12">

              <div className="row rounded-3 mb-4 py-2 bg-dark">
                <div className="col-1 border-end"><h5 className='text-center text-white m-0'>#</h5></div>
                <div className="col-4 border-end"><h5 className='text-center text-white m-0'>Before</h5></div>
                <div className="col-4 border-end"><h5 className='text-center text-white m-0'>After</h5></div>
                <div className="col"></div>
              </div>

              {table}
              {isLoading}
              {isError}
              <DeleteModal 
                modalShow={modalShow} 
                setModalShow={setModalShow} 
                items={itemsToDelete} 
                setItems={setItemsToDelete} 
                onGetItems={onGetItems}
                setImgData={setImgData}
                setLoading={setLoading}/>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




export default ExamplesPage