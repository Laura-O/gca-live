import { g as bind_props } from "../../../../chunks/index3.js";
import { C as CompetitionCard } from "../../../../chunks/CompetitionCard.js";
function _page($$payload, $$props) {
  let data = $$props["data"];
  const { competition } = data;
  $$payload.out += `<div class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">`;
  CompetitionCard($$payload, { competition, showQRButton: true });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { data });
}
export {
  _page as default
};
