import { useState, useEffect, useRef, Dispatch } from 'react'
import { createClient } from '../../lib/connectors'
import { ActionType } from '../../lib/reducers'
import { FrameIcon } from '../atoms/FrameIcon'

export const AddImage = ({
  dispatch,
  isDisabled,
}: {
  dispatch: Dispatch<ActionType>
  isDisabled: boolean
}) => {
  const [files, setFiles] = useState<FileList>()

  async function handleSubmit() {
    if (!files || files.length === 0) {
      return
    }
    const client = createClient()
    const cid = await client.add(files)
    const previewImageCID = cid.path
    dispatch({
      type: 'SET_PREVIEW_IMAGE_CID',
      previewImageCID,
    })
  }

  useEffect(() => {
    handleSubmit()
  }, [files])

  const inputFile = useRef(null)
  return (
    <>
      <FrameIcon
        boxSize="8"
        cursor={isDisabled ? 'wait' : 'pointer'}
        pointerEvents={isDisabled ? 'none' : 'auto'}
        onClick={(e) => {
          e.preventDefault()
          inputFile.current?.click()
        }}
      />
      <input
        hidden
        ref={inputFile}
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        multiple
      />
    </>
  )
}