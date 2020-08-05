import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import Checkbox from './Checkbox'

const Container = styled.section`
  position: fixed;
  flex: 1;
  margin-top: 50px;
  padding: 5px;
  font-size: 8px;
`

const FilterGroup = styled.div`
  height: 25vh;
  overflow: scroll;
  margin-bottom: 20px;
  padding-right: 15px;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  ::-webkit-scrollbar:vertical {
      width: 8px;
  }
  ::-webkit-scrollbar:horizontal {
      height: 0;
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 1px solid white; /* should match background, can't be transparent */
      background-color: rgba(0, 0, 0, .5);
  }
`

const POKEMON_TYPES = gql`
  query { pokemonTypes }
`

const Filters: React.FC<{onChange: (checked: boolean, filterName: string, filterType: string) => void}> = ({ onChange }) => {
  const { loading, error, data } = useQuery(POKEMON_TYPES)
  const pokemonTypes = data?.pokemonTypes

  if (loading) {
    return <p>Loading...</p>
  }
  if (error || !pokemonTypes) {
    return <p>Error!</p>
  }

  return (
    <Container>
      <p>TYPES</p>
      <FilterGroup>
        {pokemonTypes.map((type: string) => 
          <Checkbox key={`type-${type}`} label={type} onToggle={checked => onChange(checked, type, 'type')} />
        )}
      </FilterGroup>
      <p>WEAKNESSES</p>
      <FilterGroup>
        {pokemonTypes.map((type: string) => 
          <Checkbox key={`weakness-${type}`} label={type} onToggle={checked => onChange(checked, type, 'weakness')} />
        )}
      </FilterGroup>
    </Container>
  )
}

export default Filters