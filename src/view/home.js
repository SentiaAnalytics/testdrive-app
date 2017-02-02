//@flow
import React from 'react'
import {Link} from 'react-router'
import type {Testdrive} from '../model'
import {map} from '../util'
import {Layout, Col} from './layout'
import Button from './button'
import Padding from './layout/padding'
import {newTestdrive} from '../actions'
import {List} from './list'
import Loader from './loader'

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
  dispatch: Function,
  testdriveList: Testdrive[]
}

export default ({dispatch, testdriveList}:Props) =>
  <Layout column>
    <Col grow={1} shrink={1}>
      <Padding><h1>{testdriveList.length ? 'Drive list' : 'No drives to display'}</h1></Padding>
      <List>
        {map(testdriveListItem)(testdriveList)}
      </List>
    </Col>
    <Col>
      <Button onClick={() => dispatch(newTestdrive)} large block primary>New Testdrive</Button>
    </Col>
  </Layout>
