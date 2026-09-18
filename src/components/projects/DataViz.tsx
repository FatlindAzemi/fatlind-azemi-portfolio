import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../../i18n/LanguageProvider'
import type { DataVizKind } from '../../types'

const TRIGGER_DELAY = 400

const W = 420
const H = 220
const BASELINE = 178
const LABEL = {
  fontFamily: '"Geist Mono", ui-monospace, monospace',
  fontSize: 8.5,
  letterSpacing: '0.08em',
}

const ease = [0.22, 1, 0.36, 1] as const

function Forecast({ trigger }: { trigger: boolean }) {
  const { t } = useI18n()
  const history = [
    [34, 150],
    [70, 136],
    [106, 146],
    [142, 118],
    [178, 128],
    [214, 96],
    [250, 86],
  ]
  const forecast = [
    [250, 86],
    [286, 72],
    [322, 60],
    [358, 42],
    [396, 28],
  ]
  const spread = [0, 7, 14, 21, 28]

  const historyPath = history
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`)
    .join(' ')
  const forecastPath = forecast
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`)
    .join(' ')

  const upper = forecast.map(([x, y], i) => `${x} ${y - spread[i]}`)
  const lower = forecast.map(([x, y], i) => `${x} ${y + spread[i]}`)
  const cone = `M${upper.join(' L')} L${lower.reverse().join(' L')} Z`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={t.viz.aria.forecast}
    >
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="30"
          y1={y}
          x2="396"
          y2={y}
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}
      <line
        x1="30"
        y1={BASELINE}
        x2="396"
        y2={BASELINE}
        stroke="var(--border-2)"
        strokeWidth="1"
      />

      <line
        x1="250"
        y1="24"
        x2="250"
        y2={BASELINE}
        stroke="var(--border-2)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      <motion.path
        d={cone}
        fill="var(--accent)"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 0.12 } : {}}
        transition={{ duration: 0.9, delay: 1.1 }}
      />

      <motion.path
        d={historyPath}
        fill="none"
        stroke="var(--text-2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={trigger ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease }}
      />

      <motion.path
        d={forecastPath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 4"
        initial={{ pathLength: 0 }}
        animate={trigger ? { pathLength: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.9, ease }}
      />

      {history.map(([x, y], i) => (
        <motion.circle
          key={`h${i}`}
          cx={x}
          cy={y}
          r="3"
          fill="var(--bg)"
          stroke="var(--text-2)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.1 + i * 0.1 }}
        />
      ))}

      <text x="34" y="20" fill="var(--text-3)" style={LABEL}>
        {t.viz.actual}
      </text>
      <text x="300" y="20" fill="var(--accent)" style={LABEL}>
        {t.viz.forecast}
      </text>
    </svg>
  )
}

function Trends({ trigger }: { trigger: boolean }) {
  const { t } = useI18n()
  const series = [
    {
      values: [0.18, 0.22, 0.19, 0.3, 0.28, 0.42, 0.55, 0.76, 0.62, 0.48, 0.4, 0.34],
      accent: true,
    },
    {
      values: [0.1, 0.14, 0.12, 0.16, 0.2, 0.18, 0.23, 0.26, 0.24, 0.3, 0.28, 0.32],
      accent: false,
    },
    {
      values: [0.06, 0.05, 0.08, 0.07, 0.11, 0.13, 0.09, 0.14, 0.17, 0.13, 0.15, 0.12],
      accent: false,
    },
  ]

  const xFor = (i: number) => 30 + i * 32.7
  const yFor = (v: number) => BASELINE - v * 140
  const peakIndex = 7

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={t.viz.aria.trends}
    >
      <line
        x1="30"
        y1={BASELINE}
        x2="396"
        y2={BASELINE}
        stroke="var(--border-2)"
        strokeWidth="1"
      />

      <line
        x1={xFor(peakIndex)}
        y1="26"
        x2={xFor(peakIndex)}
        y2={BASELINE}
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.5"
      />

      {series.map((line, s) => {
        const path = line.values
          .map((v, i) => `${i === 0 ? 'M' : 'L'}${xFor(i)} ${yFor(v)}`)
          .join(' ')
        return (
          <motion.path
            key={s}
            d={path}
            fill="none"
            stroke={line.accent ? 'var(--accent)' : 'var(--text-3)'}
            strokeWidth={line.accent ? 2 : 1.2}
            strokeOpacity={line.accent ? 1 : 0.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={trigger ? { pathLength: 1 } : {}}
            transition={{ duration: 1.3, delay: s * 0.14, ease }}
          />
        )
      })}

      <motion.circle
        cx={xFor(peakIndex)}
        cy={yFor(0.76)}
        r="4"
        fill="var(--accent)"
        initial={{ scale: 0, opacity: 0 }}
        animate={trigger ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.3 }}
      />
      <motion.circle
        cx={xFor(peakIndex)}
        cy={yFor(0.76)}
        r="9"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={trigger ? { scale: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.4, delay: 1.4 }}
      />

      <motion.text
        x={xFor(peakIndex) - 6}
        y="20"
        textAnchor="end"
        fill="var(--accent)"
        style={LABEL}
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        {t.viz.burstDetected}
      </motion.text>
    </svg>
  )
}

function Billing({ trigger }: { trigger: boolean }) {
  const { t } = useI18n()
  const months = [
    { paid: 52, pending: 14, overdue: 6 },
    { paid: 66, pending: 12, overdue: 8 },
    { paid: 58, pending: 20, overdue: 10 },
    { paid: 84, pending: 16, overdue: 6 },
    { paid: 78, pending: 22, overdue: 9 },
    { paid: 96, pending: 18, overdue: 7 },
  ]
  const barW = 38
  const gap = 26
  const startX = 32

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={t.viz.aria.billing}
    >
      {[50, 100, 150].map((y) => (
        <line
          key={y}
          x1="30"
          y1={BASELINE - y}
          x2="396"
          y2={BASELINE - y}
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}
      <line
        x1="30"
        y1={BASELINE}
        x2="396"
        y2={BASELINE}
        stroke="var(--border-2)"
        strokeWidth="1"
      />

      {months.map((month, i) => {
        const label = t.viz.months[i]
        const x = startX + i * (barW + gap)
        const segments = [
          { value: month.paid, opacity: 0.95 },
          { value: month.pending, opacity: 0.5 },
          { value: month.overdue, opacity: 0.26 },
        ]
        let offset = 0
        return (
          <g key={label}>
            {segments.map((segment, s) => {
              const y = BASELINE - offset - segment.value
              offset += segment.value
              return (
                <motion.rect
                  key={s}
                  x={x}
                  width={barW}
                  rx="3"
                  fill="var(--accent)"
                  fillOpacity={segment.opacity}
                  initial={{ height: 0, y: BASELINE }}
                  animate={trigger ? { height: segment.value, y } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.07 + s * 0.08,
                    ease,
                  }}
                />
              )
            })}
            <text
              x={x + barW / 2}
              y={BASELINE + 16}
              textAnchor="middle"
              fill="var(--text-3)"
              style={LABEL}
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Migration({ trigger }: { trigger: boolean }) {
  const { t } = useI18n()
  const cols = 12
  const rows = 5
  const squareW = 18
  const squareH = 12
  const gapX = 10
  const gapY = 10
  const startX = 47
  const startY = 42

  const migrated = 22
  const running = 4
  const total = cols * rows

  const cells = Array.from({ length: total }, (_, index) => {
    const col = index % cols
    const row = Math.floor(index / cols)
    const state =
      index < migrated
        ? 'migrated'
        : index < migrated + running
          ? 'running'
          : 'queued'
    return {
      index,
      state,
      x: startX + col * (squareW + gapX),
      y: startY + row * (squareH + gapY),
    }
  })

  const legend = [
    { label: t.viz.migrated, opacity: 0.55, border: false },
    { label: t.viz.running, opacity: 0.3, border: false },
    { label: t.viz.queued, opacity: 0.12, border: true },
  ]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={t.viz.aria.migration}
    >
      {cells.map((cell, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const delay = (col + row) * 0.045

        if (cell.state === 'queued') {
          return (
            <motion.rect
              key={cell.index}
              x={cell.x}
              y={cell.y}
              width={squareW}
              height={squareH}
              rx="3"
              fill="none"
              stroke="var(--border-2)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={trigger ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay }}
            />
          )
        }

        if (cell.state === 'running') {
          return (
            <motion.rect
              key={cell.index}
              x={cell.x}
              y={cell.y}
              width={squareW}
              height={squareH}
              rx="3"
              fill="var(--accent)"
              initial={{ opacity: 0 }}
              animate={trigger ? { opacity: [0.25, 0.75, 0.25] } : {}}
              transition={{
                duration: 1.8,
                delay: delay + 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        }

        return (
          <motion.rect
            key={cell.index}
            x={cell.x}
            y={cell.y}
            width={squareW}
            height={squareH}
            rx="3"
            fill="var(--accent)"
            initial={{ opacity: 0 }}
            animate={trigger ? { opacity: 0.55 } : {}}
            transition={{ duration: 0.4, delay }}
          />
        )
      })}

      {legend.map((item, i) => {
        const x = startX + i * 118
        return (
          <g key={item.label}>
            <rect
              x={x}
              y={168}
              width="16"
              height="10"
              rx="2"
              fill={item.border ? 'none' : 'var(--accent)'}
              fillOpacity={item.opacity}
              stroke={item.border ? 'var(--border-2)' : 'none'}
              strokeWidth="1"
            />
            <text x={x + 24} y={176} fill="var(--text-3)" style={LABEL}>
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Platform({ trigger }: { trigger: boolean }) {
  const { t } = useI18n()
  const layers = [
    { label: t.viz.layers[0], dots: 5, highlight: true },
    { label: t.viz.layers[1], dots: 3, highlight: false },
    { label: t.viz.layers[2], dots: 4, highlight: false },
    { label: t.viz.layers[3], dots: 3, highlight: false },
    { label: t.viz.layers[4], dots: 5, highlight: false },
  ]
  const barH = 26
  const gap = 9
  const x = 30
  const barW = 360
  const startY = 20

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={t.viz.aria.platform}
    >
      <line
        x1={x + barW / 2}
        y1={startY + barH}
        x2={x + barW / 2}
        y2={startY + 4 * (barH + gap)}
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.22"
      />

      {layers.map((layer, i) => {
        const y = startY + i * (barH + gap)
        return (
          <motion.g
            key={layer.label}
            initial={{ opacity: 0, y: 8 }}
            animate={trigger ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: (layers.length - 1 - i) * 0.09,
              ease,
            }}
          >
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="6"
              fill={layer.highlight ? 'var(--accent)' : 'var(--surface-2)'}
              fillOpacity={layer.highlight ? 0.16 : 1}
              stroke={layer.highlight ? 'var(--accent)' : 'var(--border-2)'}
              strokeOpacity={layer.highlight ? 0.55 : 1}
              strokeWidth="1"
            />
            <rect
              x={x}
              y={y}
              width="2.5"
              height={barH}
              rx="1.25"
              fill="var(--accent)"
              fillOpacity={layer.highlight ? 0.9 : 0.3}
            />
            <text
              x={x + 16}
              y={y + barH / 2 + 0.5}
              fill={layer.highlight ? 'var(--accent)' : 'var(--text-2)'}
              style={LABEL}
            >
              {layer.label}
            </text>
            {Array.from({ length: layer.dots }, (_, d) => (
              <rect
                key={d}
                x={x + barW - 16 - d * 11}
                y={y + barH / 2 - 3}
                width="6"
                height="6"
                rx="1.5"
                fill="var(--accent)"
                fillOpacity={layer.highlight ? 0.85 : 0.28}
              />
            ))}
          </motion.g>
        )
      })}
    </svg>
  )
}

function useDelayedTrigger(trigger: boolean): boolean {
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (!trigger) {
      setArmed(false)
      return
    }
    const t = setTimeout(() => setArmed(true), TRIGGER_DELAY)
    return () => clearTimeout(t)
  }, [trigger])

  return armed
}

export default function DataViz({
  kind,
  trigger,
}: {
  kind: DataVizKind
  trigger: boolean
}) {
  const armed = useDelayedTrigger(trigger)

  if (kind === 'forecast') return <Forecast trigger={armed} />
  if (kind === 'trends') return <Trends trigger={armed} />
  if (kind === 'billing') return <Billing trigger={armed} />
  if (kind === 'migration') return <Migration trigger={armed} />
  return <Platform trigger={armed} />
}
