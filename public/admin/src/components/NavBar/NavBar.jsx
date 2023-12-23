import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

import MediaQuery from 'react-responsive'

const NavBars = () => {

  return (
    <>
      <div className='position-fixed vw-100 z-3'>
        <Header/>
      </div>
      <MediaQuery minWidth={991.98} >
        <div className='position-fixed vw-100 vh-100 pt-5'>
          <div className='position-absolute w-100 h-100 row g-0'>
            <div className='col-3 col-xl-2 h-100 shadow'><Sidebar /></div>
          </div>
        </div>
      </MediaQuery>
    </>
  )
}

export default NavBars