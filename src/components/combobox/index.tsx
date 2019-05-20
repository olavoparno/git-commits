import React from 'react'
import Select from 'react-select'

const ComboBox = (props: any) => {
  const { options, value, onChange, label, className } = props
  return (
    <div className={className}>
      <label>{label}</label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  )
}

export default ComboBox