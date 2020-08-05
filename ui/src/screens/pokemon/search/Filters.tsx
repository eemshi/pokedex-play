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
  margin: 5px 0 20px 0;
  padding: 5px 15px 5px 5px;
  border: 1px solid rgba(0, 0, 0, .5);

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
      border: 1px solid #22B1C7;
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
      TYPES
      <FilterGroup>
        {pokemonTypes.map((type: string) => 
          <Checkbox 
            key={`type-${type}`} 
            label={type} 
            onToggle={checked => onChange(checked, type, 'type')} 
          />
        )}
      </FilterGroup>
      WEAKNESSES
      <FilterGroup>
        {pokemonTypes.map((type: string) => 
          <Checkbox 
            key={`weakness-${type}`} 
            label={type} 
            onToggle={checked => onChange(checked, type, 'weakness')} 
          />
        )}
      </FilterGroup>
    </Container>
  )
}

export default Filters