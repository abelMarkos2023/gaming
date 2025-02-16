import React,{useState} from 'react'
import { useFormContext } from 'react-hook-form'
import FormFieldInput from './FormField';
import {FileUpload} from "@/components/ui/file-upload"

const FileUploadInput = ({name}:{name: string}) => {
    const form = useFormContext();
    const [files,setFiles] = useState<File[]>([]);

    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        form.setValue(name,files)
    }
  return (
    <div className = 'w-full min-h-72 relative border-dashed mb-4 border-gray-50'>
        <FileUpload onChange = {handleFileUpload}/>
    </div>
  )
}

export default FileUploadInput