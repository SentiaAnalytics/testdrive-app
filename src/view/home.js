//@flow
import React from 'react'
import type {Testdrive, Msg, Async} from '../model'
import {map} from '../util'
import {Layout, Col} from './layout'
import Button from './button'
import Padding from './layout/padding'
import {List} from './list'
import Loader from './loader'
import Link from './link'

const testdriveListItem = (testdrive:Testdrive) =>
  <li className="list-item" key={testdrive.id}>
    <Link className="list-item-link" to={`/testdrives/${testdrive.id}`}>
      <div className="list-item-body">
      <h5 className="list-item-title">
        {testdrive.driver.firstname} {testdrive.driver.lastname}
      </h5>
        <span className="list-item-pill"> {testdrive.car.brand} {testdrive.car.model}</span>
      </div>
    </Link>
  </li>

type Props = {
  msg: Function,
  testdriveList: Async<Testdrive[]>
}

export default ({msg, testdriveList}:Props) =>

  <Layout column>
    <Col grow={1} shrink={1}>
      <Loader message="Loading Testdrives" show={testdriveList.status === 'PENDING'}/>
      <Padding><h1>{testdriveList.value ? 'Drive list' : 'No drives to display'}</h1></Padding>
      <List>
        {map(testdriveListItem)(Object.values(testdriveList.value || {}))}
      </List>
    </Col>
    <Col>
      <Button onClick={() => msg.newTestdrive()} large block primary>New Testdrive</Button>
    </Col>
  </Layout>
