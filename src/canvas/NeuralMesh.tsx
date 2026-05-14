import { useRef, useEffect, useCallback } from 'react'
import type { NeuralNode, MousePosition } from '../types'

const getNodeCount = (): number => {
  if (typeof window === 'undefined') return 80
  return window.innerWidth < 768 ? 45 : 80
}

let NODE_COUNT = 80
const CONNECTION_DISTANCE = 180
const MOUSE_INFLUENCE = 250
const NODE_BASE_RADIUS = 2
const NODE_RADIUS_VARIANCE = 1.5

function generateNodes(canvasWidth: number, canvasHeight: number): NeuralNode[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: 0,
    vy: 0,
    radius: NODE_BASE_RADIUS + Math.random() * NODE_RADIUS_VARIANCE,
    connections: [],
  }))
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  nodes: NeuralNode[],
  canvasWidth: number,
  canvasHeight: number,
): void {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < CONNECTION_DISTANCE) {
        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35
        ctx.strokeStyle = `rgba(0, 112, 243, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }
  }

  for (const node of nodes) {
    ctx.fillStyle = 'rgba(0, 112, 243, 0.12)'
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = 'rgba(0, 112, 243, 0.65)'
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NeuralNode[]>([])
  const mouseRef = useRef<MousePosition>({ x: -1000, y: -1000 })
  const animFrameRef = useRef<number>(0)
  const isReducedMotion = useRef(false)

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }, [])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement): { width: number; height: number } => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = width * dpr
      canvas.height = height * dpr

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      nodesRef.current = generateNodes(width, height)
      return { width, height }
    },
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    NODE_COUNT = getNodeCount()

    isReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const { width, height } = setupCanvas(canvas)

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const dims = setupCanvas(canvas)

        if (isReducedMotion.current) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            drawFrame(ctx, nodesRef.current, dims.width, dims.height)
          }
        }
      }, 300)
    }
    window.addEventListener('resize', handleResize)

    if (isReducedMotion.current) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawFrame(ctx, nodesRef.current, width, height)
      }

      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(resizeTimeout)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    function animate() {
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const canvasWidth = canvas.offsetWidth
      const canvasHeight = canvas.offsetHeight
      const mouse = mouseRef.current
      const nodes = nodesRef.current

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      for (const node of nodes) {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_INFLUENCE && dist > 0) {
          const force = ((MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE) * 0.06
          node.vx += (dx / dist) * force
          node.vy += (dy / dist) * force
        }

        node.vx *= 0.95
        node.vy *= 0.95

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0) node.x = canvasWidth
        if (node.x > canvasWidth) node.x = 0
        if (node.y < 0) node.y = canvasHeight
        if (node.y > canvasHeight) node.y = 0
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35
            ctx.strokeStyle = `rgba(0, 112, 243, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = 'rgba(0, 112, 243, 0.12)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgba(0, 112, 243, 0.65)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(resizeTimeout)
    }
  }, [handleMouseMove, setupCanvas])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  )
}
