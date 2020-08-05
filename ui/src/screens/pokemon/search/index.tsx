import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import SearchBar from './SearchBar'
import Pokemon from './Pokemon'

const Search: React.FC<RouteComponentProps & { clickLink: Function }> = ({
  clickLink,
}) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
        <SearchBar onChange={setSearchValue} />
        <Pokemon searchValue={searchValue} clickLink={clickLink} />
    </>
  )
}

export default Search
