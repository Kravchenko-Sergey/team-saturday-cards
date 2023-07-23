import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill="var(--color-light-100)"
        d="M9.8 7.3a.5.5 0 0 1-.8.3L6.3 5.4 3.6 7.6a.5.5 0 0 1-.7-.1.5.5 0 0 1 0-.7l3-2.5a.5.5 0 0 1 .7 0l3 2.5a.5.5 0 0 1 .2.5Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="var(--color-light-100)" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
