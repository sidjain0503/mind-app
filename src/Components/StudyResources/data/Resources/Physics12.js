import React from 'react'
import physics12 from '../../data/physics.json'
import Embedpdf from './Embedpdf'
import './StudyResources.css'


function Physics12() {
  return (
    <div className='chemistry12'>
    {physics12.map((phy) => {
    return<>
        <Embedpdf pyqembed={phy.file_link} pyqname={phy.file_name.replace("jee"," ").charAt(0).toUpperCase() + phy.file_name.replace("-"," ").replace("-"," ").replace("-"," ").replace("jee"," ").replace("physics"," ").slice(1,-5) } />
    
    </>

    })}
</div>
  )
}

export default Physics12