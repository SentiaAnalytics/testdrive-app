//@flow

import React from 'react'
import type {Msg, TestdriveRequest} from '../model'
import {Layout, Col, Padding} from './layout'
import Camera from './camera'
import {compose, targetFiles} from '../util'
import Link from './link'
import Loader from './loader'
import PageIndicator from './page-indicator'
import Icon from './icon'

type Props = {
  msg: Msg,
  testdriveRequest: TestdriveRequest
}
export default ({msg, testdriveRequest}:Props) =>
  <Layout column primary>
    <Col>
      <Padding>
        <Layout space-between>
          <Icon white type="chevron_left"/>
            <PageIndicator current={1} of={6}/>
          <Icon primary type="chevron_right"/>
        </Layout>
      </Padding>
    </Col>
    <Layout grow={1} shrink={1} column center middle>
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
    <Col>
    <Padding/>
    </Col>
  </Layout>
