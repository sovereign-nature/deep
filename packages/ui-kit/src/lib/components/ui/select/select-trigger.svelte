<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = SelectPrimitive.TriggerProps;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = SelectPrimitive.TriggerEvents;
</script>

<!-- <SelectPrimitive.Trigger
	class={cn(
		'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		className
	)}
	{...$$restProps}
>
	<slot />
	<div>
		<CaretSort class="h-4 w-4 opacity-50" />
	</div>
</SelectPrimitive.Trigger> -->

<SelectPrimitive.Trigger class="relative" {...$$restProps}>
  <slot />
  <div>
    <svg
      class="absolute right-4 top-1/2 z-10 transform -translate-y-1/2"
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path d="M1 1L9 9L17 1" stroke="#08FFA6" stroke-width="2" />
      </g>
    </svg>
  </div>
</SelectPrimitive.Trigger>
