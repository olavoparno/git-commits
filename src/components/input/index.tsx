import React from 'react'
import { DebounceInput } from 'react-debounce-input';

const Input = (props: any) => {
  const { label, debounce, onChange, placeHolder, className } = props
  return (
    <div className={className}>
      <label>{label}</label>
      <DebounceInput
        minLength={2}
        debounceTimeout={debounce}
        placeholder={placeHolder}
        onChange={onChange}
        className="repo-input"
      />
    </div>
  )
}

export default Input