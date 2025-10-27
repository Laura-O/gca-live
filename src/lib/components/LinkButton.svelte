<!-- src/lib/components/LinkButton.svelte -->
<script lang="ts">
	export let href: string;
	export let external: boolean = false;
	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let ariaLabel: string | undefined = undefined;
	export let className: string = '';

	const variantClasses = {
		primary: 'btn-primary shadow-soft hover:shadow-card-hover',
		secondary: 'btn-secondary shadow-soft hover:shadow-card-hover',
		ghost: 'btn-ghost hover:bg-base-200'
	};

	const computedClasses = `btn ${variantClasses[variant]} transition-all duration-200 ${className}`;
</script>

<a
	role="button"
	class={computedClasses}
	href={href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	aria-label={ariaLabel}
>
	<slot />
</a>
