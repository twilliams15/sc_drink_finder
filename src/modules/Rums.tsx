import React from 'react'
import {allRums} from '../data/all_rums'
import {Rum, RumClassList, RumTypeList} from '../react-app-env'

export function Rums() {
    function toc(rumList: RumClassList) {
        return rumList.types.map(rumType => (
            <li>
                <a href={`#${rumType.name}`}>{rumType.name}</a>
            </li>
        ))
    }

    function rumListElement(rumList: RumClassList) {
        return (
            <>
                <h2>{rumList.class}</h2>
                {rumList.types.map(rumTypesElement)}
            </>
        )
    }

    function rumTypesElement(rumType: RumTypeList) {
        return (
            <>
                <h3 id={rumType.name}>{rumType.name}</h3>
                {rumType.rums.map(rumElement)}
            </>
        )
    }

    function rumElement(rum: Rum) {
        return (
            <li>
                {rum.name}
                <br />
                <span className="origin">{rum.origin}</span>
                <br />
                <br />
            </li>
        )
    }

    return (
        <div id="rums">
            <ul className="rum-toc">{allRums.map(toc)}</ul>
            {allRums.map(rumListElement)}
        </div>
    )
}
