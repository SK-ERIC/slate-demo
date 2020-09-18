import React from 'react'

import MarkButton from '@components/common/MarkButton'

const Bold = ({ editor }) => {
  return (
    <MarkButton editor={editor} format="bold" icon="format_bold"></MarkButton>
  )
}
export default Bold
