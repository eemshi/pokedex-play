import React, { useState } from 'react'
import { Checkbox as NesCheckbox } from 'nes-react'

const Checkbox: React.FC<ICheckboxProps> = ({ label, onToggle }) => {
  const [checked, setChecked] = useState(false)

  const handleToggle = (updated: boolean) => {
    setChecked(updated)
    onToggle(updated)
  }

  return (
    <NesCheckbox label={label} checked={checked} onSelect={() => handleToggle(!checked)}/>
  )
}

export default Checkbox

interface ICheckboxProps {
  label: string, 
  onToggle: (selected: boolean) => void
}
