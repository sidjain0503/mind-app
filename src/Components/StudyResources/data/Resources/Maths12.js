import React from 'react'
import maths12 from '../../data/maths.json'
import Embedpdf from './Embedpdf'
import './StudyResources.css'

function Maths12() {
  return (
    <div className='chemistry12'>
    {maths12.map((maths) => {
    return<>
        <Embedpdf pyqembed={maths.file_link} pyqname={maths.file_name.replace("jee"," ").charAt(2).toUpperCase() + maths.file_name.replace("-"," ").replace("-"," ").replace("-"," ").replace("jee"," ").replace("maths"," ").slice(3,-5)}/>
    
    </>

    })}
</div>
  )
}

export default Maths12