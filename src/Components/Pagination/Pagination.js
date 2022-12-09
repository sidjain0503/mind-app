import React from "react";

import "./Pagination.css";


function Pagination ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='pagination' style={{padding:"2%",display:"flex",justifyContent:"end",width:"80%"}}>
           
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? "activepage" : ""}
                        style={{background:"white",border:"1px solid rgba(0, 0, 0, 0.12)",margin:"0.5px",borderRadius:"2px",fontSize:"14px",padding:"1%"}}
                        >
                        {page}
                    </button>
                );
            })}

        </div>
    );
};

export default Pagination;