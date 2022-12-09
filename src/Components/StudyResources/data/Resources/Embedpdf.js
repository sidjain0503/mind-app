import React, { useState } from 'react'
import './StudyResources.css'



function Embedpdf({ pyqembed, pyqname }) {

    const [show, setShow] = useState(false)

    return (
        <div className='embed-pdf'>
            <a href={pyqembed} target="_blank">{pyqname}</a>
            {/* {show ?  <a ></a>: null} */}

        </div>
    )
}

export default Embedpdf