<script>
    import { t, locales, locale } from "$lib/translations";
</script>

<select bind:value={$locale}>
    {#each $locales as value}
        <option {value}>{$t(`lang.${value}`)}</option>
    {/each}
</select>

<slot />
