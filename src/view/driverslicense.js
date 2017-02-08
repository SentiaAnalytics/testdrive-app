//@flow

import React from 'react'
import type {Msg, TestdriveRequest} from '../model'
import {Layout, Col, Padding} from './layout'
import Camera from './camera'
import {compose, targetFiles} from '../util'
import Link from './link'
import Loader from './loader'

type Props = {
  msg: Msg,
  testdriveRequest: TestdriveRequest
}
export default ({msg, testdriveRequest}:Props) =>
  <Layout column center middle primary>
      <Loader message="Saving Drivers License" show={testdriveRequest.licenseUrl.status === 'PENDING'}/>
    <Col>
      <Padding>
        <Camera onChange={compose(msg.driversLicenseCaptured, targetFiles)}/>
      </Padding>
    </Col>
    <Col>
      <Padding>
        <Link white to="/new/cpr">skip</Link>
      </Padding>
    </Col>
  </Layout>
