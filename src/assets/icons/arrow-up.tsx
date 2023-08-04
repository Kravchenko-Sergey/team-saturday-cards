import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox={'0 0 24 24'}
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="var(--color-light-100)"
      d="M19.5 14.5a1 1 0 0 1-1.6.8l-5.4-4.5-5.3 4.3a1 1 0 0 1-1.4-.1 1 1 0 0 1 .1-1.5l6-4.8a1 1 0 0 1 1.3 0l6 5a1 1 0 0 1 .3.8Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
