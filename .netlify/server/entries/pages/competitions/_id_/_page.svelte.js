import { a as store_get, u as unsubscribe_stores, h as bind_props } from "../../../../chunks/index2.js";
import { C as CompetitionCard } from "../../../../chunks/CompetitionCard.js";
import { S as SEO } from "../../../../chunks/LinkButton.js";
import { t } from "../../../../chunks/translations.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let competitionDescription;
    let data = $$props["data"];
    const { competition } = data;
    competitionDescription = `${store_get($$store_subs ??= {}, "$t", t)("content.schedule")} and information for ${competition.name}. View details, schedule, and competition groups.`;
    SEO($$renderer2, {
      title: competition.name,
      description: competitionDescription,
      url: `/competitions/${competition.id}`,
      type: "article"
    });
    $$renderer2.push(`<!----> <div class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">`);
    CompetitionCard($$renderer2, { competition, showQRButton: true });
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
