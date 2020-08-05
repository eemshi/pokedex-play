import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import SearchBar from './SearchBar'
import Filters from './Filters'
import Pokemon from './Pokemon'

const Search: React.FC<RouteComponentProps & { clickLink: Function }> = ({
  clickLink,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [types, setTypes] = useState<string[]>([])
  const [weaknesses, setWeaknesses] = useState<string[]>([])

  const updatedList = (list: string[], item: string, add: boolean = true) => {
    return add ? [...list, item] : list.filter(x => x !== item)
  }

  const handleFilterChange = (checked: boolean, filterName: string, filterType: string) => {
    if (filterType === 'type') {
      setTypes(updatedList(types, filterName, checked))
    } else if (filterType === 'weakness') {
      setWeaknesses(updatedList(weaknesses, filterName, checked))
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