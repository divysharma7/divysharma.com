<template>
	<div
		:class="
			cn(
				'bg-border shrink-0',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
			)
		"
		role="separator"
	/>
</template>

<script setup>
import { cn } from '@/lib/utils'

defineProps({
	orientation: {
		type: String,
		default: 'horizontal' // 'horizontal' | 'vertical'
	}
})
</script>

