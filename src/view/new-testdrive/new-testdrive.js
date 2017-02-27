//@flow
import React from 'react'
import {Loc} from '../../model'
import {Slider, Slide} from '../slider'
import Brand from './brand'
import Model from './model'
import Licenseplate from './licenseplate'
import Driverslicense from './driverslicense'
import Cpr from './cpr'
import Confirm from './confirm'
import Driver from './driver'
import Contact from './contact-details'
import {pick, flip} from '../../util'
import {Layout, Col, Padding} from '../layout'
import Icon from '../icon'
import PageIndicator from '../page-indicator'
import {Button} from '../button'


export default (props:any) => {
  const page = Number(props.location.params.page)
  const {testdriveForm, msg, search, status, modals, brands, licenseplates} = props
  const models = props.models[testdriveForm.value.carBrand] || []
  return (
    <Layout column primary>
      <Col>
        <Padding>
          <Layout space-between>
            <Button onClick={_ => props.msg.goBack()}>
              <Icon white type="chevron_left" />
            </Button>
              <PageIndicator current={page} of={7}/>
            <Icon primary type="chevron_right"/>
          </Layout>
        </Padding>
      </Col>
      <Col grow={1} shrink={1}>
        <Slider page={page}>
          <Slide><Driverslicense {...{msg, testdriveForm} } /></Slide>
          <Slide><Cpr {...{msg, testdriveForm}} /></Slide>
          <Slide><Driver {...{msg, testdriveForm}} /></Slide>
          <Slide><Contact {...{msg, testdriveForm}} /></Slide>
          <Slide><Brand {...{msg, brands, search: search.brand}} /></Slide>
          <Slide><Model { ...{models, msg, search: search.model} } /></Slide>
          <Slide><Licenseplate {...{msg, search: search.licenseplate, licenseplates}} /></Slide>
          <Slide><Confirm {...{msg, testdriveForm, signatureModal: modals.signature}} /></Slide>
        </Slider>
      </Col>
    </Layout>
  )
}
