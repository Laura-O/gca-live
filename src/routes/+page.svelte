<script lang="ts">
    import { t } from "$lib/translations";
    import "../app.css";
    export let data;
</script>

<div
    class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center"
>
    {#if data.competitions.length === 0}
        <div class="card bg-base-100 w-96 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{$t("content.nocomps-title")}</h2>
                <p>{$t("content.nocomps-content")}</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary"
                        ><a
                            href="https://www.worldcubeassociation.org/competitions?region=Germany&search=&state=present&year=all+years&from_date=&to_date=&delegate=&display=list"
                            >{$t("content.wca-page")}</a
                        ></button
                    >
                </div>
            </div>
        </div>
    {:else}
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
    {/if}
</div>
