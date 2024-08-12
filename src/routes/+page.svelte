<script lang="ts">
    import { t } from "$lib/translations";
    import "../app.css";
    export let data;
</script>

<div
    class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center"
>
    {#each data.competitions as competition}
        <div class="card-compact bg-base-100 w-96 shadow">
            <div class="card-body items-center text-center">
                <h2 class="card-title">{competition.name}</h2>
                <ul class="my-4 space-y-3 flex flex-col items-center">
                    <li>
                        <a
                            role="button"
                            class="btn btn-primary"
                            href="https://live.worldcubeassociation.org/link/competitions/{competition.id}"
                            target="_blank">WCA Live</a
                        >
                    </li>
                    <li>
                        <a
                            role="button"
                            class="btn btn-primary"
                            href="https://www.competitiongroups.com/competitions/{competition.id}"
                            target="_blank">{$t("content.grouping")}</a
                        >
                    </li>
                    <li>
                        <a
                            role="button"
                            class="btn btn-primary"
                            href="https://www.worldcubeassociation.org/competitions/{competition.id}#competition-schedule"
                            target="_blank">{$t("content.schedule")}</a
                        >
                    </li>
                    <li>
                        <a
                            role="button"
                            class="btn btn-primary"
                            href="https://www.worldcubeassociation.org/competitions/{competition.id}#general-info"
                            target="_blank">{$t("content.info")}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    {/each}
</div>
