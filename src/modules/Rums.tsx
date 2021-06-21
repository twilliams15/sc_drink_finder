import React from 'react'
import {allRums} from '../data/all_rums'
import {Rum, RumClassList, RumTypeList} from '../react-app-env'

export function Rums() {
    function toc({types}: RumClassList) {
        return types.map(({name}) => (
            <li key={name}>
                <a href={`#${name}`}>{name}</a>
            </li>
        ))
    }

    function rumListElement({class: rumClass, types}: RumClassList) {
        return (
            <div key={rumClass}>
                <h2>{rumClass}</h2>
                {types.map(rumTypesElement)}
            </div>
        )
    }

    function rumTypesElement({name, rums}: RumTypeList) {
        return (
            <div key={name}>
                <h3 id={name}>{name}</h3>
                {rums.map(rumElement)}
            </div>
        )
    }

    function rumElement({name, origin}: Rum) {
        return (
            <li key={name}>
                {name}
                <br />
                <span style={{fontSize: '0.9rem', fontStyle: 'italic'}}>
                    {origin}
                </span>
                <br />
                <br />
            </li>
        )
    }

    return (
        <div id="rums">
            <ul>{allRums.map(toc)}</ul>
            {allRums.map(rumListElement)}
        </div>
    )
}
