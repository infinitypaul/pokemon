import React  from 'react'
import {TYPE_COLORS} from '../../../../shared/utility'

const Filtering = (props) => {
    return (
        <div className="mb-5 align-items-center">
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Filter Pokemon By Types</label>

                <select className="form-control" id="exampleFormControlSelect1" onChange={props.typeHandler}>
                    <option value="all">All</option>
                    { Object.keys(TYPE_COLORS).map((key, index)=> (
                           <option key={key} value={key}>{
                               key.toLowerCase()
                                   .split('-')
                                   .map(s => s.charAt(0)
                                       .toUpperCase()+ s.substring(1))
                           }</option>
                    ))}

                </select>
            </div>
        </div>
    )
};

export default Filtering;