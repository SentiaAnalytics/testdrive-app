//@flow

import React from 'react'
import type {Msg, TestdriveForm} from '../../model'
import {Layout, Col, Padding} from '../layout'
import Camera from '../camera'
import {compose, targetFiles} from '../../util'
import Link from '../link'
import Loader from './../loader'
import PageIndicator from '../page-indicator'
import Icon from '../icon'

type Props = {
  msg: Msg,
  testdriveForm: TestdriveForm
}

export default ({msg, testdriveForm}:Props) => {
  const {value: formData} = testdriveForm
  return (
    <Layout column primary style={{height: '100%'}}>
      <Layout grow={1} shrink={1} column center middle>
          <Loader message="Saving Drivers License" show={formData.licenseUrl.status === 'PENDING'}/>
        <Col>
          <Padding>
            <Camera onChange={compose(msg.driversLicenseCaptured, targetFiles)}/>
          </Padding>
        </Col>
        <Col>
          <Padding>
            <Link white to="/new/1">skip</Link>
          </Padding>
        </Col>
      </Layout>
      <Col>
      <Padding/>
      </Col>
    </Layout>
  )
}
