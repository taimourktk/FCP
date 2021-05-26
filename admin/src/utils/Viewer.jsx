import moment from 'moment';
import React from 'react'

function Unit (props) {
    let index = props.index;
    return (
        <tr>
            {
                (() => {
                    let html = [];

                    props.heads.map(head => {
                        if (
                            head === 'createdAt' || head === 'updatedAt' || head === 'passwordChangedAt' ||
                            head === 'date' || head === 'StartDate' || head === 'EndDate' || head === 'time'
                            ) {
                            html.push(
                                <td>{moment(new Date(props.data[head])).format("MM/DD/YYYY  HH:MM:SS")}</td>
                            );
                        }
                        else if (typeof props.data[head] === 'string') {
                            html.push(<td>{String(props.data[head])}</td>);
                        }
                        else if (typeof props.data[head] === 'object') {
                            if (props.data[head].type === 'image') {
                                html.push(
                                    <td><img src={props.data[head].src} className="viewer-image" /></td>
                                );
                            }
                            else {
                                html.push(<td>{String(props.data[head])}</td>);
                            }
                        }
                        else {
                            html.push(<td>{String(props.data[head])}</td>);
                        }
                    })

                    if(props.actions) {
                        var actions_ = [];
                        props.actions.map((Action) => {
                            if (Action.condition1 && props.data[Action.condition1] == '0') {
                                
                            }
                            else if (((typeof Action.checkValue === 'undefined') || (props.data[Action.condition] === Action.checkValue)) && (props.data[Action.condition] !== false)) {
                                actions_.push(<button key = {String(Math.random() * Date.now())} style = {{marginBottom: 3}} type = 'button' className = {Action.className} value = {Action.value} onClick = {(e) => {Action.onClick(e, props.data, index)}} >{Action.value}</button>);
                            }
                        })
                    }

                    html.push(<td>{actions_}</td>);

                    return html;
                })()
            }
        </tr>
    )

}

export default function (props) {

    const rawHeads = [];

    return (
        <div className = 'card'>
        <table className = 'viewer-table'>
            <tr>
                {
                    (() => {
                        let heads = [];
                        for (let x in props.data[0]) {
                            
                            if (props.hidden && props.hidden.indexOf(x) > -1) {
                                continue;
                            }
                            heads.push(<th>{x.toLocaleUpperCase()}</th>);
                            rawHeads.push(x);

                        }

                        //setRawHeads(rawHeads)

                        if (props.actions && props.actions.length > 0)
                            heads.push(<th>Actions</th>);

                        return heads;
                    })()
                }
            </tr>
            <tbody>
                {
                    props.data.map((entry, index) => {
                        return <Unit data = {entry} index = {index} actions = {props.actions} hidden = {props.hidden} heads = {rawHeads} />
                    })
                }
            </tbody>
        </table>
        </div>
    )

}