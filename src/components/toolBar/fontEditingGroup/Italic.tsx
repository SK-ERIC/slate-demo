import React from 'react'
import MarkButton from '@components/common/MarkButton'

const Italic = ({ editor }) => {
  return (
    <MarkButton
      editor={editor}
      format="italic"
      icon="format_italic"
    ></MarkButton>
  )
}
export default Italic
