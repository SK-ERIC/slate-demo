import React from 'react'
import ReactTooltip from 'react-tooltip'
import styles from './header.m.less'
import { Button, Menu, Dropdown, message } from 'antd'

const onClick = ({ key }: any) => {
  message.info(`Click on item ${key}`)
}

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="新建">新建</Menu.Item>
    <Menu.Item key="导入本地文件">导入本地文件</Menu.Item>
    <Menu.Item key="保存">保存</Menu.Item>
  </Menu>
)

export const PageHeader: React.FC = ({ ...props }) => (
  <div className={styles.root}>


    <Button className="share__btn" type="primary">
      分享
    </Button>

    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <button className="s-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="20px"
            height="20px"
          >
            <path
              d="M18 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
              fill="#41464b"
            />
          </svg>
        </button>
      </a>
    </Dropdown>

    <img
      className="upic"
      src="https://wx.qlogo.cn/mmhead/iagu4MsxfBnDXfFwhRALnSVr0ic0Jo69ED7OFUVouT4lc/64"
      alt=""
      data-tip="头像 <br> ctrl+s"
      data-place="bottom"
      data-multiline
    />

    <ReactTooltip />
  </div>
)
