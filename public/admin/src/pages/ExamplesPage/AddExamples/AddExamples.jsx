
import { useEffect, useRef, useState } from "react"
import { uploadImages } from "../../../services/DBRoutes"
import { v4 } from "uuid"

const AddExamples = () => {

  const beforeRef = useRef()
  const afterRef = useRef()

  const [allItems, setAllItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);

  useEffect(() =>{
    onCardList()
  }, [allItems])

  function onAdd (e) {
    e.preventDefault();
    const newItems = {
      id: v4(),
      imgBefore: beforeRef.current.files[0], 
      imgAfter: afterRef.current.files[0]
    }
    setAllItems([...allItems, newItems]);
  }

  function onCardList () {
    const prevArr = allItems.map(({imgBefore, imgAfter, id}) => {
      return (
        <div className="col" key={id}>
          <Card  before={imgBefore} after={imgAfter} id={id} remove={removeItem}/>
        </div>
      )
    })
    setCardItems(prevArr)
  }

  function removeItem (id) {
    const newArr = allItems.filter((item) => item.id != id)
    setAllItems(newArr)
  }

  async function upload () {

    allItems.forEach(async (item, index) => {
      new Promise(async (resolve, reject) => {
        const resp = await uploadImages(item)
        if (resp.status != 200) {
          return reject({index: index, status: resp.status})
        }
        resolve({index: index, status: resp.status})
      })
      .then(({index, status}) => {
        const uploadButton = document.getElementById('uploadButton');
        uploadButton.insertAdjacentHTML('afterbegin', 
          `
            <div class="alert alert-success mb-0 mt-2" role="alert">${index + 1} ) uploaded, status: ${status}</div>
          `)
      })
      .catch(({index, status}) => {
        const uploadButton = document.getElementById('uploadButton');
        uploadButton.insertAdjacentHTML('afterbegin',
        `
          <div class="alert alert-danger mb-0 mt-2" role="alert">${index + 1} ) error, status: ${status}</div>
        `)
      })
    })

  }

  function clear () {
    uploadButton.innerHTML = ''
    setAllItems([])
    setCardItems([])
  }

  return (
    <div className="add-examples">
      <div className="container-fluid">
        <h2 className="text-dark ps-5 pt-4 mb-3">Add new examples</h2>
        <div className="row">
          <div className="col col-9">
            <div className="rounded-3 bg-white px-3 py-3">
              <div className="row">
                <div className="col-12 ">
                  <div className="add-form">
                    <form className="form" action="addToList" onSubmit={(e) => onAdd(e)}>
                      <div className="row mb-2">
                        <div className="col-5">
                          {/* <label htmlFor="image">Before Img</label> */}
                          <input type="file" 
                            name="beforeImg"
                            id="image"
                            accept="image/png, image/jpeg, image/jpg"
                            ref={beforeRef} 
                            className="form-control"
                            required/>
                        </div>
                        <div className="col-5">
                          {/* <label htmlFor="image">After Img</label> */}
                          <input type="file" 
                            name="afterImg"
                            id="image"
                            accept="image/png, image/jpeg, image/jpg"
                            ref={afterRef} 
                            className="form-control"
                            required/>
                        </div>
                        <div className="col-2">
                          <div className="d-flex align-items-end h-100">
                            <button type="submit" className="btn btn-regular w-100" >Add</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-cols-4 row-cols-xl-5 px-3 py-3 gx-2">
              {cardItems}
            </div>
          </div>
          <div className="col col-3">
            <div className="rounded-3 bg-white px-3 py-3 pb-4">
              <div className="d-flex justify-content-around align-items-center" >
                <button className="btn btn-dark " onClick={() => upload()}>Upload to server</button>
                <button className="btn btn-outline-dark " onClick={() => clear()}>Clear all</button>
              </div>
              <div className="d-flex justify-content-start align-items-center flex-column" id="uploadButton"></div>
            </div>
          </div>
          {/* <div className="col-9">

          </div> */}
        </div>
      </div>
    </div>
  )
}

const Card = ({before, after, id, remove}) => {

  const [befUrl, setBefUrl] = useState()
  const [aftUrl, setAftUrl] = useState()

  useEffect(() => {
    setBefUrl(URL.createObjectURL(before))
    setAftUrl(URL.createObjectURL(after))
  }, [])
  


  return (
    <div className="card bg-white px-2 py-2 position-relative">
      <div className="mb-2">
        <img src={befUrl} className="card-img" alt="..." />
      </div>
      <img src={aftUrl} className="card-img" alt="..." />
      <div className=" bg-danger-subtle position-absolute end-0 me-2 rounded-2">
        <button className="btn-close fs-6" onClick={() => remove(id)}></button>
      </div>

    </div>
  )
}

export default AddExamples