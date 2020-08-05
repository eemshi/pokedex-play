import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import SearchBar from './SearchBar'
import Filters from './Filters'
import Pokemon from './Pokemon'

const Search: React.FC<RouteComponentProps & ISearchProps> = ({ clickLink }) => {
  const [searchValue, setSearchValue] = useState('')
  const [types, setTypes] = useState<string[]>([])
  const [weaknesses, setWeaknesses] = useState<string[]>([])

  const _getUpdatedList = (
    list: string[], 
    item: string, 
    add: boolean = true
  ) => {
    return add ? [...list, item] : list.filter(x => x !== item)
  }

  // TODO: make this whole thing more pure function like
  const handleFilterChange = (checked: boolean, filterName: string, filterType: string) => {
    switch (filterType) {
      case 'type':
        setTypes(_getUpdatedList(types, filterName, checked))
        break
      case 'weakness':
        setWeaknesses(_getUpdatedList(weaknesses, filterName, checked))
        break
    }
  }

  return (
    <>
        <SearchBar onChange={setSearchValue} />
        <Filters onChange={handleFilterChange} />
        <Pokemon 
          {...{
            clickLink,            
            searchValue,
            types,
            weaknesses
          }}
        />
    </>
  )
}

export default Search

interface ISearchProps { 
  clickLink: Function 
}