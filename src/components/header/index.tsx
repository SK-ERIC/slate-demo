import React from 'react'
import ReactTooltip from 'react-tooltip'
import '@styles/header.less'

export const PageHeader: React.FC = ({ ...props }) => (
  <div className="pageHeader__wrap">
    <button data-tip="文档操作" data-place="bottom" className="s-icon">
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

    <img
      className="upic"
      src="https://wx.qlogo.cn/mmhead/iagu4MsxfBnDXfFwhRALnSVr0ic0Jo69ED7OFUVouT4lc/64"
      alt=""
      data-tip="头像 <br> ctrl+z"
      data-place="bottom"
      data-multiline
    />
    <ReactTooltip />
  </div>
)
