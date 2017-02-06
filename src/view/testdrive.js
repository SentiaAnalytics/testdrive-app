//@flow

import React from 'react'
import type {Testdrive, Async, Loc} from '../model'
import {Layout, Col, Padding} from './layout'
import Loader from './loader'

type Props = {
  location: Loc,
  testdriveList: Async<{[string]: Testdrive}>

}

export default ({location, testdriveList}:Props) => {
  if (testdriveList.status !== 'SUCCESS') {
    return <Loader message="Loading testdrive" show={true}/>
  }
  const {driver, car} = testdriveList.value[location.params.testdriveId]
  return (
    <Layout column>
      <Col>
        <Padding>
          <h1>{driver.firstname} {driver.lastname}</h1>
          <p>{car.brand} {car.model}</p>
        </Padding>
      </Col>
    </Layout>
  )
}
