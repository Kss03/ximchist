import { MdMonochromePhotos, MdAddPhotoAlternate, MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="sidebar nav h-100 d-flex flex-column align-items-center pt-4 px-4 bg-white shadow overflow-y-auto pt-5">

      <div className="row mb-5">
        <div className="col">
          <Link to='/' className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdHome className="me-2 fs-3"/>
            Home Page
          </Link>
        </div>
        <div className="col">
          <Link to='/examples' className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdMonochromePhotos className="me-2 fs-3"/>
            Examples
          </Link>
        </div>
        <div className="col">
          <Link to='/examples/addNew' className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdAddPhotoAlternate  className="me-2 fs-3"/>
            Add Photos
          </Link>
        </div>
      </div>

      <a target="label" href="https://cleancomfort03.ru/" className="btn btn-regular bg-clear-sky w-100 rounded-4 mb-3">Check Page</a>
    </div>
  )
}

export default Sidebar