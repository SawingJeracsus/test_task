import React from 'react'

import '../styles/components/modal.css'

export const Modal: React.FC<{visible?: boolean}> = ({children, visible}) => {
    const classList = ['modal']
    if(visible){
        classList.push('visible')
    }
    return (
        <div className={classList.join(' ')}>
            <div className="modal-wrapper">
                {children}
            </div>
        </div>
    )
}

  
