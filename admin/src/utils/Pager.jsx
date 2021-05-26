import React from 'react'

export default function (props) {

    const count = props.count;
    const setPage = props.setPage || null;
    const [selected, setSelected] = React.useState(1);
    const [width, _setWidth] = React.useState(window.innerWidth)

    const setWidth = (width) => {
        width > 600 ?
        _setWidth(width * 0.8)
        : _setWidth(width)
    }

    let capacity = Math.floor((width - 350) / 35);
    let maxButtonRender = capacity - 4 > 12 ? 12 : capacity - 4;
    if (maxButtonRender < 4)
        maxButtonRender = 4;

    const setContagiousPage = (toAdd) => {
        if (toAdd > 0) {
            setSelected(selected + 1);
            setPage(selected + 1);
        }
        else {
            setSelected(selected - 1);
            setPage(selected - 1);
        }
    }

    return (
        <div style = {{display: width - 600 > 0 ? 'inline' : 'inline-block'}}>
            <button 
                className = 'pager-button pager-prev-button'
                disabled = {selected == 1}
                onClick = {() => setContagiousPage(-1)}
            >
                Previous
            </button>
            {
                (() => {
                    let html = []
                    for (let i = 0; i < count; ) {

                        let className = i+1 == selected
                        ? 'pager-button pager-selected'
                        : 'pager-button'
                        html.push( <button
                            className = {className}
                            onClick = {() => {
                                setPage(i);
                                setSelected(i);
                            }} >{++i}</button> )
                    }
                    return html;
                })()
            }
            <button 
                className = 'pager-button pager-next-button'
                disabled = {selected == count}
                onClick = {() => setContagiousPage(1)}
            >
                Next
            </button>
        </div>
    )

}