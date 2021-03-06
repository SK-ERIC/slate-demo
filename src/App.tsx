import React, { useMemo, useState, useCallback, createContext } from 'react'
import { createEditor, Transforms, Editor, Text, Node } from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import isHotkey from 'is-hotkey'
import { withHistory } from 'slate-history'
import isUrl from 'is-url'
import { cx, css } from 'emotion'

import Bold from '@components/toolBar/fontEditingGroup/Bold'
import Italic from '@components/toolBar/fontEditingGroup/Italic'
import Underline from '@components/toolBar/fontEditingGroup/Underline'
import StrikeThrough from '@components/toolBar/fontEditingGroup/StrikeThrough'

import { Button, Icon, Toolbar } from '@components/common/components'
import { PageHeader } from '@components/pageHeader/index'
const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    console.log('toggleMark--app')
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <span {...attributes}>{children}</span>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  /* 加粗 */
  if (leaf.bold) {
    // children = <strong>{children}</strong>
    children = (
      <span
        className={css`
          font-weight: bolder;
        `}
      >
        {children}
      </span>
    )
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  /* 倾斜 */
  if (leaf.italic) {
    // children = <em>{children}</em>
    children = (
      <span
        className={css`
          font-style: italic;
        `}
      >
        {children}
      </span>
    )
  }

  /* 下划线 */
  if (leaf.underline) {
    children = <u>{children}</u>
  }

  /* 删除线 */
  if (leaf.strikeThrough) {
    children = (
      <span
        className={css`
          text-decoration: line-through;
        `}
      >
        {children}
      </span>
    )
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
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

const initialValue = [
  {
    type: 'page',
    children: [
      {
        type: 'paragraph',
        children: [
          { text: 'This is editable ' },
          { text: 'rich', bold: true },
          { text: ' text, ' },
          { text: 'much', italic: true },
          { text: ' better than a ' },
          { text: '<textarea>', code: true },
          { text: '!' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '因为它是富文本，所以你可以做一些事情，比如转换文本的选择',
          },
          { text: 'bold', bold: true },
          {
            text: ', 或者在页面中间添加一个语义呈现的块引号，如下所示：',
          },
        ],
      },
      {
        type: 'block-quote',
        children: [{ text: '一句明智的话。' }],
      },
      {
        type: 'paragraph',
        children: [{ text: '你自己试试吧！' }],
      },
    ],
  },
]

const TodosDispatch = React.createContext(null)

//


const App = () => {
  const [value, setValue] = useState<Node[]>(initialValue)
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])


  return (
    <div>
      <PageHeader />
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Toolbar>
          <Bold editor={editor} />
          <Italic editor={editor} />
          <Underline editor={editor} />
          <StrikeThrough editor={editor} />

          {/* <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" /> */}
          {/* <MarkButton format="underline" icon="format_underlined" /> */}
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default App
