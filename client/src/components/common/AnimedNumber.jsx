import NumberFlow from '@number-flow/react'
import {clsx} from 'clsx'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

export default function AnimedNumber({ 
	value = 0, 
	min = 0, 
	max = 1000, 
	onChange,
}) {
	const defaultValue = React.useRef(value)
	const inputRef = React.useRef(null)
	const [animated, setAnimated] = React.useState(true)
	const [showCaret, setShowCaret] = React.useState(true)

	const handleInput = (event) => {
		setAnimated(false)
		let next = value
		if (event.currentTarget.value === '') {
			next = defaultValue.current
		} else {
			const num = event.currentTarget.valueAsNumber
			if (!isNaN(num) && min <= num && num <= max) next = num
		}
		event.currentTarget.value = String(next)
		onChange?.(next)
	}

	const handlePointerDown = (diff) => (event) => {
		setAnimated(true)
		if (event.pointerType === 'mouse') {
			event?.preventDefault()
			inputRef.current?.focus()
		}
		const newVal =  + diff
		onChange?.(newVal)
	}

	return (
		<div className="group flex text-black items-stretch rounded-md text-3xl font-semibol
		d ring-zinc-200 transition-[box-shadow]
		dark:ring-zinc-800">	
			<button
				aria-hidden="true"
				tabIndex={-1}
				className="flex items-center pl-[.5em] pr-[.325em]"
				disabled={min != null && value <= min}
				onPointerDown={handlePointerDown(-1)}
			>
				<Minus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
			</button>
			<div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
				<input
					ref={inputRef}
					className={clsx(
						showCaret ? 'caret-primary' : 'caret-transparent',
						'spin-hide w-[1.5em] bg-transparent py-2 text-center font-[inherit] text-transparent outline-none'
					)}
					style={{ fontKerning: 'none' }}
					type="number"
					min={min}
					step={1}
					autoComplete="off"
					inputMode="numeric"
					max={max}
					value={value}
					onInput={handleInput}
				/>
				<NumberFlow
					value={value}
					locales="en-US"
					format={{ useGrouping: false }}
					aria-hidden="true"
					animated={animated}
					onAnimationsStart={() => setShowCaret(false)}
					onAnimationsFinish={() => setShowCaret(true)}
					className="pointer-events-none"
					willChange
				/>
			</div>
			<button
				aria-hidden="true"
				tabIndex={-1}
				className="flex items-center pl-[.325em] pr-[.5em]"
				disabled={max != null && value >= max}
				onPointerDown={handlePointerDown(1)}
			>
				<Plus className="size-4" absoluteStrokeWidth strokeWidth={3.5} />
			</button>
		</div>
	)
}
