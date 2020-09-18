import React from 'react'
import { Editor } from 'slate'

import { Button, Icon } from '@components/common/components'

const MarkButton = ({ format, icon, editor }) => {
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    console.log('toggleMark--MarkButton');
    Editor.addMark(editor, format, true)
  }
}

export default MarkButton
