import { MdMonochromePhotos, MdAddPhotoAlternate, MdHome, MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { ADD_NEW_ROUTE, AUTH_ROUTE, EXAMPLES_ROUTE, ROOT_ROUTE } from "../../utils/consts";

const Sidebar = ({handleClose}) => {

  return (
    <div className="sidebar nav h-100 d-flex flex-column align-items-center pt-4 px-4 bg-white overflow-y-auto pt-5">

      <div className="row mb-5">
        <div className="col-12 ">
          <Link to={AUTH_ROUTE} onClick={handleClose} className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdLogin className="me-2 fs-3"/>
            Login
          </Link>
        </div>
        <div className="col-12 ">
          <Link to={ROOT_ROUTE} onClick={handleClose} className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdHome className="me-2 fs-3"/>
            Home Page
          </Link>
        </div>
        <div className="col-12 ">
          <Link to={EXAMPLES_ROUTE} onClick={handleClose} className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdMonochromePhotos className="me-2 fs-3"/>
            Examples
          </Link>
        </div>
        <div className="col-12 ">
          <Link to={ADD_NEW_ROUTE} onClick={handleClose} className="btn d-flex align-items-center fs-4 rounded-0 w-100">
            <MdAddPhotoAlternate  className="me-2 fs-3"/>
            Add Photos
          </Link>
        </div>
      </div>

      <a target="label" href="https://cleancomfort03.ru/" onClick={handleClose} className="btn btn-regular bg-clear-sky w-100 rounded-4 mb-3">Check Page</a>
    </div>
  )
}

export default Sidebar