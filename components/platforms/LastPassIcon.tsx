import * as React from "react"

function LastPassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 66.69 34.381"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <use xlinkHref="#prefix__a" x={0.5} y={1.19} />
      <symbol id="prefix__a" overflow="visible">
        <g stroke="none" fill="#fff" fillRule="nonzero">
          <path d="M60.552 1.725a1.725 1.725 0 013.45 0v27.586a1.725 1.725 0 11-3.45 0zM0 16.184c0-3.239 2.608-5.847 5.847-5.847s5.847 2.608 5.847 5.847-2.608 5.847-5.847 5.847S0 19.423 0 16.184z" />
          <use xlinkHref="#prefix__C" />
          <use xlinkHref="#prefix__C" x={19.49} />
        </g>
      </symbol>
      <defs>
        <path
          id="prefix__C"
          d="M19.491 16.184c0-3.239 2.608-5.847 5.847-5.847s5.847 2.608 5.847 5.847-2.608 5.847-5.847 5.847-5.847-2.608-5.847-5.847z"
        />
      </defs>
    </svg>
  )
}

export default LastPassIcon
