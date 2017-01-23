//@flow
import React from 'react'
import type {Testdrive} from '../model'
import {map} from '../util'
import {Link} from 'react-router'

const testdriveListItem = (testdrive:Testdrive) =>
  <li className="list-group-item" key={testdrive.id}>
    <Link to={`/testdriives/${testdrive.id}`}>
      <div className="media-body padding-base">
      <h5>
        {testdrive.driver.firstname}{testdrive.driver.lastname}
      </h5>
        <span> {testdrive.car.brand} {testdrive.car.model}</span>
      </div>
    </Link>
  </li>

type Props = {
  dispatch: Function,
  testdriveList: Testdrive[]
}

export default ({dispatch, testdriveList}:Props) =>
  <div className="flex-column">
    <div className="flex-grow-1 list-group scroll-y">
      {map(testdriveListItem)(testdriveList)}
    </div>
    <div className="flex-grow-0">
      <Link to='/new/driver' className="btn btn-success btn-block btn-lg">New Testdrive</Link>
    </div>
  </div>
