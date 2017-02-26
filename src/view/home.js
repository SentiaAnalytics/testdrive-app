//@flow
import React from 'react'
import type {Testdrive, Msg, Async} from '../model'
import {map, compose, sort} from '../util'
import {Layout, Col} from './layout'
import {RoundButton} from './button'
import Padding from './layout/padding'
import {List} from './list'
import Loader from './loader'
import Link from './link'
import Icon from './icon'

const testdriveListItem = (testdrive:Testdrive) =>
  <li className="list-item" key={testdrive.id}>
    <Link className="list-item-link" to={`/testdrives/${testdrive.id}`}>
      <div className="list-item-body">
      <h5 className="list-item-title">
        {testdrive.forenames} {testdrive.lastname}
      </h5>
        <span className="list-item-pill"> {testdrive.carBrand} {testdrive.carModel}</span>
      </div>
    </Link>
  </li>

type Props = {
  msg: Function,
  testdriveList: Async<Testdrive[]>
}

const compareTestdrives = (a, b) => a.date - b.date

const getSortedTestdrives = compose(sort(compareTestdrives), Object.values, x => x || [])

export default ({msg, testdriveList}:Props) =>
  <Layout column>
    <Col grow={1} shrink={1}>
      <Loader message="Loading Testdrives" show={testdriveList.status === 'PENDING'}/>
      <Padding><h1>{testdriveList.value ? 'Drive list' : 'No drives to display'}</h1></Padding>
      <List>
        {map(testdriveListItem)(getSortedTestdrives(testdriveList.value))}
      </List>
        <RoundButton fixed bottom right primary onClick={() => msg.newTestdrive()}><Icon lg type="add"/></RoundButton>
    </Col>
  </Layout>
