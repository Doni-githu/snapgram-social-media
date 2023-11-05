import { useCallback, useState, useEffect } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'


interface FileUploaderProps {
    fieldChange: (files: File[]) => void,
    mediaUrl?: string
}

const AvatarUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState('')
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": ['.png', '.jpeg', '.jpg', '.svg']
        }
    })

    useEffect(() => {
        if (mediaUrl) {
            setFileUrl(mediaUrl)
        }
    }, [])
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} className='cursor-pointer flex-center gap-4' />
            {fileUrl && (
                <>
                    <div className="flex items-center gap-4">
                        <img
                            src={fileUrl}
                            alt="image"
                            className='h-24 w-24 rounded-full object-cover object-top'
                        />
                        <p className='text-primary-500 small-regular md:bbase-semibold'>Change profile photo</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default AvatarUploader
