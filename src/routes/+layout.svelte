<script>
    import { t, locales, locale } from "$lib/translations";
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">GCA Live</a>
    </div>
    <div class="flex-none">
        <select
            bind:value={$locale}
            class="select select-primary w-full max-w-xs"
        >
            {#each $locales as value}
                <option {value}>{$t(`lang.${value}`)}</option>
            {/each}
        </select>
    </div>
</div>

<slot />
