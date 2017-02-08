//@flow
import React from 'react'
import {map, any} from '../../util'
import List from './list'
import SelectListItem from './selectlist-item'
import TextInput from '../text-input'

export default class SelectList extends React.Component {
  state: {searchQuery: string}
  constructor () {
    super()
    this.state = {
      searchQuery: ''
    }
  }

  onInput (e:any) {
    this.setState({searchQuery: e.target.value})
  }

  filterItems(items: {label:string}[]) {
    const {searchQuery} = this.state
    const compare = a => b =>
      b.label.toLowerCase().indexOf(a.toLowerCase()) === 0

    const filteredItems = this.props.items
      .filter(compare(searchQuery))

    if (searchQuery !== "" && !any(x => x.label === searchQuery)(filteredItems)) {
      return [ ...filteredItems, {label: `Create new "${searchQuery}"`, value: searchQuery}]
    }
    return filteredItems

  }

  renderListItems () {
    const {searchQuery} = this.state
    const filteredItems = this.filterItems(this.props.items)
    return map(item =>
      <SelectListItem
        key={item.value}
        title={item.label}
        onSelect={() => this.props.onSelect(item.value)}
      />
    )(filteredItems)

  }

  render () {
    const {title} = this.props
    const {searchQuery} = this.state
    return (
      <div>
        <TextInput
            label={title}
            value={searchQuery}
            onChange={e => this.onInput(e)} />
        <List>
          {this.renderListItems()}
        </List>
      </div>
    )
  }
}
