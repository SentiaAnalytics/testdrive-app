//@flow
import React from 'react'
import {map, compose, filter, any, createClassName} from '../../util'
import List from './list'
import SelectListItem from './selectlist-item'
import TextInput from '../text-input'
import {Padding} from '../layout'
import Title from '../title'
import './select-list.scss'

type Item = {
  label: string,
  value: any
}
type Props = {
  searchQuery: string,
  items: Item[],
  onSelect:Function
}


const CLASS_PROPS =  [
  'header'
]

const className = createClassName('select-list')(CLASS_PROPS)

const compareItem = (query:string) => (item:Item) =>
    item.label.toLowerCase().indexOf(query.toLowerCase()) === 0

const addNewItemForQuery = (searchQuery:string) => (items:Item[]) => {
  if (searchQuery !== "" && !any(x => x.label === searchQuery)(items)) {
    return [ ...items, {label: `Create new "${searchQuery}"`, value: searchQuery}]
  }
  return items
}

const getItemList = (searchQuery:string) =>
  compose(addNewItemForQuery(searchQuery), filter(compareItem(searchQuery)))

const renderListItems = (items, searchQuery, onSelect) => {
  const filteredItems = getItemList(searchQuery)(items)
  return map(item =>
    <SelectListItem
      key={item.value}
      title={item.label}
      onSelect={() => onSelect(item.value)}
    />
  )(filteredItems)

}

export default (props:Props) =>
  <List>
    {renderListItems(props.items, props.searchQuery, props.onSelect)}
  </List>
