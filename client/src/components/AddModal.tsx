import React, { useEffect, useState } from "react";
import { DB } from "./DB";
import { Modal } from "./Modal";


const FormInput: React.FC<{onInput: (text: string) => void, placeholder: string, type: string}> = ({onInput, placeholder, type}) => {
    return (
        <input type={type} className="add_modal__input" onInput={(e) => {
            const target = e.target as HTMLInputElement
            onInput(target.value)
        }} placeholder={placeholder} required/>
    )
}


export const AddModal: React.FC<{onAdd?: (success: boolean) => void, visible?: boolean}> = ({onAdd, visible}) => {
    const [validForm, setValidForm] = useState(false)
    const [formConfig, setFormConfig] = useState({
        name: '',
        imageUrl: '',
        count: '-1',
        width: '-1',
        height: '-1',
        weight: '-1',
        description: ''
    })
    useEffect(() => {
        let valid = true
        try {
            if(parseInt(formConfig.count) < 0 || parseInt(formConfig.width) < 0 || parseInt(formConfig.height) < 0 || parseInt(formConfig.weight) < 0){
                valid = false
            }
        } catch (error) {
            valid = false
        }

        if(formConfig.imageUrl.length <= 1 || formConfig.name.length <= 1){
            valid = false
        }
        setValidForm(valid)
    }, [formConfig])
    const inputs = {
        text: ['name', 'imageUrl', 'description'],
        number: ['count', 'width', 'height', 'weight']
    } //here i trying write DRY code
    return(
        <Modal visible = {visible}>
            <h2 className="add_modal__title">Creation new product</h2>
            <form className="add_modal__form" onSubmit={(e) => {
                e.preventDefault()
                DB.createProduct(formConfig)
                console.log('asd')
                if(onAdd){
                    onAdd(true)
                }
            }}>
                {['text', 'number'].map(type => {
                    //@ts-ignore
                    const inputsNames: string[] = inputs[type]
                    return inputsNames.map((inputName, index) => <FormInput key={type+'_form_input-'+index} type={type} placeholder={inputName.toUpperCase()+'...'} onInput={(value) => {setFormConfig(prev => ({...prev, [inputName]: value}))}}/>)
                }).flat()}
                
                <div className="add_modal__buttons-wrapper">
                    <button className="btn btn-success" disabled={!validForm}>Add</button><button type="button" onClick={() => { if(onAdd){onAdd(false)} }} className="btn btn-danger">Cancel</button>
                </div>
            </form>    
        </Modal>
    )
}