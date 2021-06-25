import React from "react";
import { Modal } from "./Modal";

export const RemoveModal: React.FC<{onRemove: (success: boolean) => void, visible?: boolean}> = ({onRemove, visible}) => {
  
    return(
        <Modal visible = {visible}>
            <h2 className="remove_modal__title">Are you sure about removing that product?</h2>
            <p className="remove_modal__btns_wrapper">
                <button className="btn btn-info modal-btn" onClick={() => {
                    onRemove(true)
                }}>Yes</button>
                
                <button className="btn btn-danger modal-btn" onClick={() => {
                    onRemove(false)
                }}>No</button>  
            </p>
        </Modal>
    )
}