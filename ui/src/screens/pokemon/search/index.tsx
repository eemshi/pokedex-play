import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import SearchBar from './SearchBar'
import Filters from './Filters'
import Pokemon from './Pokemon'

interface Filter {
  filterName: string;
  filterType: string;
}

const Search: React.FC<RouteComponentProps & { clickLink: Function }> = ({
  clickLink,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState<Filter[]>([])

  const handleFilterChange = (checked: boolean, filterName: string, filterType: string) => {
    let updatedFilters;
    if (checked) {
      updatedFilters = [...filters, { filterName, filterType }]
    } else {
      updatedFilters = filters.filter(f => f.filterName !== filterName)
    }
    setFilters(updatedFilters)
  }

  console.log(filters)

  return (
    <>
        <SearchBar onChange={setSearchValue} />
        <Filters onChange={handleFilterChange} />
        <Pokemon 
          {...{
            clickLink,            
            searchValue,
            filters
          }}
        />
    </>
  )
}

export default Search