import React, { useState } from 'react';
import './App.css';
import mewmelt from './mewmelt.png'

const TASKS = {
    weekly: ['raid 1', 'raid 2', 'quiz', 'quiz trial stage', 'bounties', 'sim battle'],
    daily: ['150 duty', 'material stages', 'training stages', 'event stages', 'story stages', 'campaign', 'commissions', 'coin collection', 'dorm errands', 'mei\'s lunch', 'mei\'s dinner'],
    adventure: ['tasks accepted', 'tasks completed', 'memorial arena clears']
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
            <h2>{props.listTitle}</h2>{listItems}
        </li>
    )
}

function ListItemWithButton(props) {
    const [count, setCount] = useState(0)
    const item = props.item
    const maxCount = props.maxCount
    const classNameItem = count === maxCount ? "list-checked" : "list"
    const classNameButton = count === maxCount ? "item-with-button-finished" : "item-with-button"

    const handleClickDecrement = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            return
        }
    }

    const handleClickIncrement = () => {
        if (count < maxCount) {
            setCount(count + 1)
            console.log(maxCount)
        } else {
            return
        }
    }

    const handleClickReset = () => {
        setCount(0)
    }

    if (count === maxCount) {
        return (
            <div className={classNameItem}>
                {item}<button className="reset-button" style={{ width: '80px' }} onClick={handleClickReset}>reset! </button>
            </div>
        )
    } else {
        return (
            <div className={classNameItem}>
                {item}<button className={classNameButton} onClick={handleClickDecrement}>-</button>
                {count}
                <button className={classNameButton} onClick={handleClickIncrement}>+</button>
            </div>
        )
    }
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

    resetList = () => {
        const checked = new Set()
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
                    <div>
                        <List listTitle="dailies" listItems={TASKS.daily} onClick={this.onClickHandler} checked={this.state.checked} />
                    </div>
                    <div style={{ margin: '5px' }}>
                        <List listTitle="weeklies" listItems={TASKS.weekly} onClick={this.onClickHandler} checked={this.state.checked} />
                    </div>
                    <div style={{ border: '1px solid black', margin: '5px' }}>
                        <ListItemWithButton item={TASKS.adventure[0]} maxCount={5} />
                        <ListItemWithButton item={TASKS.adventure[1]} maxCount={5} />
                        <ListItemWithButton item={TASKS.adventure[2]} maxCount={10} />
                    </div>
                    <div className="reminder-list" style={{ border: '1px solid black', margin: '5px', fontSize: '36px' }}>
                        <h2>reminders</h2>
                        dirac sea/q-singularis: every 2 days <br />
                        adventures reset mon, thurs, sat <br />
                        always do events!!! <br />
                        stigmatas over weapons (mostly) <br />
                        <br />
                        <br />
                        <button className="reset-button" style={{ width: '80px' }} onClick={this.resetList}>reset list!</button>
                        <br />
                        <br />
                        have fun <img src={mewmelt} alt="cute cat btw" />
                        <br />
                        -meofox
                    </div>
                </div>
            </>
        )
    }
}