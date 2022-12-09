import React from 'react'
import chemistry12 from '../chemistry12.json'
import Embedpdf from './Embedpdf'
import './StudyResources.css'

// import '../FreeResources/FreeResources.css'

function Chemistry12() {
    return (
        <div className='chemistry12 '>
            {chemistry12.map((chem) => {
            return<>
                <Embedpdf pyqembed={chem.file_link} pyqname={chem.file_name.replace("jee","").charAt(1).toUpperCase() + chem.file_name.replace("-"," ").replace("-"," ").replace("-"," ").replace("chemistry"," ").replace("jee"," ").slice(3,-5)} />
            
            </>

            })}
        </div>
    )
}

export default Chemistry12