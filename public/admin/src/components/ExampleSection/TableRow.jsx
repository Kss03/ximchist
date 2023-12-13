import { useState, useEffect } from "react";

const TableRow = ({img1, img2, id, selectedItems, setSelectedItems, setAmount, onDelete}) => {

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    isChecked()
  }, [selectedItems])

  const isChecked = () => {
    if (selectedItems.includes(id)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }

  const onCheck = (id) => {
    let items = selectedItems
    if (checked == true) {
      setChecked(false)
      items = items.filter((item) => item != id)
      setSelectedItems(items)
      setAmount(items.length)
    } else {
      setChecked(true)
      if (items.includes(id)) {
        return
      } else {
        items.push(id)
        setSelectedItems(items)
        setAmount(items.length)
      }
    }
  }

  const staticUrl = import.meta.env.VITE_API_URL + 'static/';

  return (
    <div className="row border-bottom pb-2 mb-2" key={id}>
      <div className="col-1 border-end">
        <div className="form-check d-flex justify-content-center align-items-center h-100">
          <input 
            className="form-check-input fs-4 border-black" 
            type="checkbox"  
            checked={checked}
            onChange={() => {
              onCheck(id)
            }}/>
        </div>
      </div>
      <div className="col-4 border-end">
        <div className='d-flex justify-content-center'>
          <img className="img img-fluid example-img shadow-sm" src={staticUrl + img1} alt="img" />
        </div>
      </div>
      <div className="col-4 border-end">
        <div className='d-flex justify-content-center'>
          <img className="img img-fluid example-img shadow-sm" src={staticUrl + img2} alt="img" />
        </div>
      </div>
      <div className="col">
        <div className="d-flex justify-content-center align-items-center h-100">
          <button onClick={() => onDelete([id])} className='btn  bg-alive btn-regular px-5 rounded-4 mb-3'>DELETE</button>
        </div>
      </div>
    </div>
  )
}



export default TableRow