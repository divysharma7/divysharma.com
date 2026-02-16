<template>
	<div :class="cn(badgeVariants({ variant }))">
		<slot />
	</div>
</template>

<script setup>
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

defineProps({
	variant: {
		type: String,
		default: 'default'
	}
})

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 overflow-hidden transition-[color,box-shadow]',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'text-foreground hover:bg-accent hover:text-accent-foreground'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)
</script>

