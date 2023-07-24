import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} fill="none" ref={ref} {...props}>
    <g fill="var(--color-light-100)" clipPath="url(#a)">
      <path d="M12.5 2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-8 1.3h8a.7.7 0 0 1 .7.7v5.6L11 7.8a1.8 1.8 0 0 0-2.3 0l-4.9 4V4a.7.7 0 0 1 .7-.7Zm8 9.4H4.9l4.6-4a.5.5 0 0 1 .7 0l3 2.6v.7a.7.7 0 0 1-.7.7Z" />
      <path d="M5.8 6.7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="var(--color-light-100)" d="M.5 0h16v16H.5z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
