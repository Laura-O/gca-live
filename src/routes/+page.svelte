<script lang="ts">
    export let data;
</script>

<h1>Competitions</h1>

{#each data.competitions as competition}
    <h2>{competition.name}</h2>
    <a
        href="https://live.worldcubeassociation.org/link/competitions/{competition.id}"
        >WCA Live</a
    >
    <a href="https://www.competitiongroups.com/competitions/{competition.id}"
        >Einteilungen</a
    >
    <a
        href="https://www.worldcubeassociation.org/competitions/{competition.id}#competition-schedule"
        >Zeitplan</a
    >
    <a
        href="https://www.worldcubeassociation.org/competitions/{competition.id}#general-info"
        >Alle Infos</a
    >
{/each}
