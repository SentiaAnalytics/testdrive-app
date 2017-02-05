//@flow
import React from 'react'
import {Layout, Col, Padding} from '../layout'

type Props = {
    title: string,
    selected?: bool,
    onSelect: Function
}
export default ({title, onSelect, selected = false}:Props) =>
    <li className={`selectlist-item ${selected ? 'selectlist-item-selected': ''}`} onClick={onSelect}>
      <Layout row middle>
        <Col grow="1">
        <Padding small>
          <h3 className="selectlist-item-title">{title}</h3>
        </Padding>
        </Col>
      </Layout>
    </li>
