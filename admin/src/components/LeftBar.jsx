import React from 'react'

export default function (props) {

    const [selected, setSelected] = React.useState();

    const onClick = (e, index) => {
        setSelected(index);
    }

    return (
        <div className = 'bar'>
            {
                props.buttonList.map((button, index) => {
                    if (index == selected)
                        var class_ = 'bar-button-selected'

                    return (
                        <button 
                            className = {'bar-button ' + class_} 
                            onClick = {(e) => {
                                onClick(e, index)
                                button.onClick()
                            }}
                        >
                            <span className = 'glyphicon glyphicon-link'></span>
                            <span className = 'bar-button-title'>{button.title}</span>
                        </button>
                    )
                })
            }
        </div>
    )
}