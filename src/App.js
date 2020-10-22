import React, { useState } from 'react';
import './App.css';

const TASKS = {
    weekly: ['raid 1', 'raid 2', 'quiz', 'quiz trial stage', 'memorial arena', 'bounties', ''],
    daily: ['150 duty', 'material stages', 'training stages', 'event stages', 'story stages', 'campaign', 'commissions', 'coin collection', 'dorm errands', 'mei\'s lunch', 'mei\'s dinner'],
    adventure: ['tasks accepted', 'tasks completed']
}

function List(props) {
    const listItems = props.listItems.map((item) => {
        const className = props.checked.has(item) ? "list-checked" : "list"
        return (
            <div className={className} key={item.toString()} onClick={() => props.onClick(item)}>
                {item}
            </div>
        )
    })
    return (
        <li style={{ overflow: 'auto', breakInside: 'avoid', border: '1px solid black' }}>
            {listItems}
        </li>
    )
}

function ListItemWithButton(props) {
    const [count, setCount] = useState(0)
    const item = props.item
    const resetVisibility = {
        visibility: count === 5 ? "visible" : "hidden"
    }
    const handleClickReset = () => {
        setCount(0)
    }
    const classNameItem = () => {
        if (count === 5) {
            return 'list-checked'
        } else {
            return 'list'
        }
    }
    const classNameButton = () => {
        if (count === 5) {
            return "item-with-button-finished"
        } else {
            return "item-with-button"
        }
    }
    const handleClickCounter = () => {
        if (count < 5) {
            setCount(count + 1)
        } else {
            return
        }
    }
    return (
        <div className={classNameItem()}>
            {item}<button className={classNameButton()} onClick={handleClickCounter}>{count}</button><button className="reset-button" style={resetVisibility} onClick={handleClickReset}>reset</button>
        </div>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: new Set(),
        }
    }



    onClickHandler = (item) => {
        const checked = new Set(this.state.checked)
        if (checked.has(item)) {
            checked.delete(item)
        } else {
            checked.add(item)
        }
        this.setState({
            checked
        })
    }

    render() {
        return (
            <>
                <div className="header">
                    <h1>u better do these</h1>
                </div>
                <div className="wrapper">
                    <div >
                        <List listItems={TASKS.daily} onClick={this.onClickHandler} checked={this.state.checked} />
                    </div>
                    <div style={{ margin: '5px' }}>
                        <List listItems={TASKS.weekly} onClick={this.onClickHandler} checked={this.state.checked} />
                    </div>
                    <div style={{ border: '1px solid black', margin: '5px' }}>
                        <ListItemWithButton item={TASKS.adventure[0]} />
                        <ListItemWithButton item={TASKS.adventure[1]} />
                    </div>
                </div>
            </>
        )
    }
}