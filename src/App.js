import React from 'react';
import './App.css';
import mewmelt from './mewmelt.png'

const TASKS = {
    weekly: ['raid 1', 'raid 2', 'quiz', 'quiz trial stage', 'bounties', 'sim battle'],
    daily: ['150 duty', 'material stages', 'training stages', 'event stages', 'story stages', 'campaign', 'commissions', 'coin collection', 'dorm errands', 'mei\'s lunch', 'mei\'s dinner'],
    adventure: ['tasks accepted', 'tasks completed', 'memorial arena clears']
}

function List(props) {
    const listItems = props.listItems.map((item) => {
        const className = props.checked.has(item) ? "list-item-checked" : "list-item"
        return (
            <li className={className} key={item.toString()} onClick={() => props.onClick(item)}>
                {item}
            </li>
        )
    })
    return (
        <ul style={{ overflow: 'auto', breakInside: 'avoid', border: '1px solid black' }}>
            <h2>{props.listTitle}</h2>{listItems}
        </ul>
    )
}

function ListItemWithButton({ count, item, maxCount, onClickDecrement, onClickIncrement }) {
    const classNameItem = count === maxCount ? "list-item-checked" : "list-item"
    return (
        <div className={classNameItem}>
            {item}
            <button className={'item-with-button'} onClick={onClickDecrement} >-</button>
            {count}
            <button className={'item-with-button'} onClick={onClickIncrement}>+</button>
        </div>
    )
}

const Counters = {
    COUNTER1: 'counter1',
    COUNTER2: 'counter2',
    COUNTER3: 'counter3'
}

function getCheckedState() {
    let values
    try {
        values = JSON.parse(localStorage.getItem('checkedStorage'))
    } catch {
    }
    return new Set(values)
}

function getCounterState() {
    let storageItem
    try {
        storageItem = JSON.parse(localStorage.getItem('counterStorage'))
    } catch {
    }
    return {
        [Counters.COUNTER1]: 0,
        [Counters.COUNTER2]: 0,
        [Counters.COUNTER3]: 0,
        ...storageItem,
    }
}

// function getInitialState() {
//     let storageData;
//     try {
//         storageData = JSON.parse(localStorage.getItem('data'));
//     } catch (err) {
//         console.warn('failed to rebuild state from storage');
//         console.warn(err);
//     }

//     const defaultCounters = {};
//     for (const counter of Object.values(Counters)) {
//         defaultCounters[counter] = 0;
//     }

//     return {
//         checked: new Set(storageData?.checked),
//         counters: {
//             ...defaultCounters,
//             ...storageData?.counters,
//         },
//     };
// }

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: getCheckedState(),
            counters: getCounterState()
        }
    }

    onClickHandler = (item) => {
        const checked = new Set(this.state.checked)
        if (checked.has(item)) {
            checked.delete(item)
        } else {
            checked.add(item)
        }
        this.setState(() => {
            localStorage.setItem('checkedStorage', JSON.stringify(Array.from(checked)))
            return {
                checked
            }
        })
    }

    handleClickIncrement = (counter, maxCount) => {
        this.setState(state => {
            if (state.counters[counter] < maxCount) {
                const counters = {
                    ...state.counters,
                    [counter]: state.counters[counter] + 1
                }
                localStorage.setItem('counterStorage', JSON.stringify(counters))
                return {
                    counters: counters
                }
            }
        })
    }

    handleClickDecrement = (counter) => {
        this.setState(state => {
            if (state.counters[counter] > 0) {
                return {
                    counters: {
                        ...state.counters,
                        [counter]: state.counters[counter] - 1
                    }
                }
            }
            localStorage.setItem('counterStorage', JSON.stringify({ ...state.counters }))
        })
    }

    resetDailies = () => {
        const checked = new Set(this.state.checked)
        for (const item of TASKS.daily) {
            checked.delete(item)
        }
        this.setState({
            checked
        })
    }


    resetAll = () => {
        const checked = new Set()
        this.setState({
            checked,
            counters: {
                [Counters.COUNTER1]: 0,
                [Counters.COUNTER2]: 0,
                [Counters.COUNTER3]: 0
            }
        })
        localStorage.removeItem('checkedStorage')
        localStorage.removeItem('counterStorage')
    }

    render() {
        const counter1 = 'counter1'
        const counter2 = 'counter2'
        const counter3 = 'counter3'
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
                        <h2>limited</h2>
                        <ListItemWithButton item={TASKS.adventure[0]} maxCount={5} onClickIncrement={() => this.handleClickIncrement(counter1, 5)} onClickDecrement={() => this.handleClickDecrement(counter1)} count={this.state.counters[counter1]} />
                        <ListItemWithButton item={TASKS.adventure[1]} maxCount={5} onClickIncrement={() => this.handleClickIncrement(counter2, 5)} onClickDecrement={() => this.handleClickDecrement(counter2)} count={this.state.counters[counter2]} />
                        <ListItemWithButton item={TASKS.adventure[2]} maxCount={10} onClickIncrement={() => this.handleClickIncrement(counter3, 10)} onClickDecrement={() => this.handleClickDecrement(counter3)} count={this.state.counters[counter3]} />
                    </div>
                    <div className="reminder-list" style={{ border: '1px solid black', margin: '5px', fontSize: '36px' }}>
                        <h2>reminders</h2>
                        dirac sea/q-singularis: every 2 days <br />
                        adventures reset mon, thurs, sat <br />
                        always do events!!! <br />
                        stigmatas over weapons (mostly) <br />
                        <br />
                        <br />
                        <button className="reset-button" style={{ width: '80px' }} onClick={this.resetDailies}>reset dailies</button>
                        <button className="reset-button" style={{ width: '80px' }} onClick={this.resetAll}>reset everything!</button>
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