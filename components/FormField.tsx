import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

const FormFieldInput = ({name,type,label}:{name:string,type:string,label:string}) => {
    const form = useFormContext()
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input className = 'p-4 text-base font-semibold border border-gray-700 shadow-lg rounded-lg' type = {type} placeholder={`Enter Your ${label} Here...` } {...field} />
        </FormControl>
        
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default FormFieldInput