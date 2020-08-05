import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #212529;
  border-radius: 5px;
  color: #eee;
  text-align: center;

  ::placeholder
    color: #eee;
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    color: #eee;
  }
  ::-ms-input-placeholder {
    color: #eee;
  }
`

const SearchBar: React.FC<{onChange: (value: string) => void}> = ({ onChange }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Input 
      type="text" 
      name="name" 
      placeholder="Who's that Pokemon?"
      onChange={handleInputChange}
    />
  )
}

export default SearchBar
