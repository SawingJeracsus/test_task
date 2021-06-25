import React, { useState } from "react";
import '../styles/components/topbar.css'
interface TopBarProps{
    onChangeSort: (target: 'name' | 'count') => void,
    onAdd: () => void
}

export const TopBar: React.FC<TopBarProps> = ({onChangeSort, onAdd}) => {
    const [choosedSorting, setChoosedSorting] = useState<'name' | 'count'>('name') 
    
    return (
        <header>
            <div className="sorting_bar">
                <p>Sort by: </p>
                <div onClick={() => {
                    setChoosedSorting('name')
                    onChangeSort('name')

                }} className={`sorting_bar__tab ${choosedSorting === 'name' ? 'active' : ''}`}>Name</div>
                <div onClick={() => {
                    setChoosedSorting('count')
                    onChangeSort('count')

                }} className={`sorting_bar__tab ${choosedSorting === 'count' ? 'active' : ''}`}>Count</div>
            </div>
            <button className="btn btn-success" onClick={onAdd}>New Product</button>
        </header>
    )
}