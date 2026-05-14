import { useEffect, useRef, useState } from 'react'
import { getRectPerimeter } from '../../utils/svg'

interface SvgBorderProps {
  trigger: boolean
  color?: string
  duration?: number
  className?: string
}

export default function SvgBorder({
  trigger,
  color = 'var(--border)',
  duration = 800,
  className = '',
}: SvgBorderProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [perimeter, setPerimeter] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const measure = () => {
      const parent = svg.parentElement
      if (!parent) return

      const { width, height } = parent.getBoundingClientRect()
      if (width > 0 && height > 0) {
        setPerimeter(getRectPerimeter(width, height))
        setReady(true)
      }
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(svg.parentElement!)

    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {ready && (
        <rect
          x="0.5"
          y="0.5"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: perimeter,
            strokeDashoffset: trigger ? 0 : perimeter,
            transition: `stroke-dashoffset ${duration}ms ease-in-out`,
          }}
        />
      )}
    </svg>
  )
}
