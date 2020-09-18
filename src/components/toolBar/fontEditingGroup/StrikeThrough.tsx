import React from 'react'
import MarkButton from '@components/common/MarkButton'

const StrikeThrough = ({ editor }) => {
  return (
    <MarkButton
      editor={editor}
      format="strikeThrough"
      icon="strikethrough_s"
    ></MarkButton>
  )
}
export default StrikeThrough
