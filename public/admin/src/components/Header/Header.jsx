import { FaFaceFlushed } from "react-icons/fa6";

const Header = () => {
  return (
    <nav className="header navbar navbar-dark bg-royal w-100">
      <div className="container-fluid px-4">
        <a className="navbar-brand d-flex align-items-center " href="#">
          <FaFaceFlushed className="me-2"/>
          Admin
        </a>
      </div>
    </nav>
  )
}

export default Header