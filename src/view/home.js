//@flow
import React from 'react'
import type {Testdrive} from '../model'
import {map} from '../util'
import {Link} from 'react-router'
import {Layout, Col} from './layout'
import Button from './button'

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
  <Layout column>
    <Col grow={1} shrink={1}>
      <ul>
        {map(testdriveListItem)(testdriveList)}
      </ul>
    </Col>
    <Col>
      <Button href='/new/driver' large block primary>New Testdrive</Button>
    </Col>
  </Layout>
