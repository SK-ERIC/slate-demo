import React from 'react'
import MarkButton from '@components/common/MarkButton'

const Underline = ({ editor }) => {
  return (
    <MarkButton
      editor={editor}
      format="underline"
      icon="format_underlined"
    ></MarkButton>
  )
}
export default Underline
