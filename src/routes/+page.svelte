<script lang="ts">
    import { t } from "$lib/translations";
    export let data;
</script>

<h1>{$t("content.comp")}</h1>

{#each data.competitions as competition}
    <h2>{competition.name}</h2>
    <a
        href="https://live.worldcubeassociation.org/link/competitions/{competition.id}"
        >WCA Live</a
    >
    <a href="https://www.competitiongroups.com/competitions/{competition.id}"
        >{$t("content.grouping")}</a
    >
    <a
        href="https://www.worldcubeassociation.org/competitions/{competition.id}#competition-schedule"
        >{$t("content.schedule")}</a
    >
    <a
        href="https://www.worldcubeassociation.org/competitions/{competition.id}#general-info"
        >{$t("content.info")}</a
    >
{/each}
