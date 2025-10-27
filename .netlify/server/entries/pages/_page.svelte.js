import { d as escape_html, b as store_get, e as ensure_array_like, c as attr, u as unsubscribe_stores, g as bind_props, a as pop, p as push } from "../../chunks/index3.js";
import "../../chunks/client.js";
import { t } from "../../chunks/translations.js";
import { C as CompetitionCard } from "../../chunks/CompetitionCard.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  $$payload.out += `<div class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">`;
  if (data.competitions.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card bg-base-100 w-96 shadow-xl"><div class="card-body"><h2 class="card-title">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.nocomps-title"))}</h2> <p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.nocomps-content"))}</p> <div class="card-actions justify-center"><button class="btn btn-primary"><a href="https://www.worldcubeassociation.org/competitions?region=Germany&amp;search=&amp;state=present&amp;year=all+years&amp;from_date=&amp;to_date=&amp;delegate=&amp;display=list">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.wca-page"))}</a></button></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(data.competitions);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let competition = each_array[$$index];
      CompetitionCard($$payload, { competition, showQRButton: false });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <div class="container mx-auto pb-24 place-items-center"><label for="days" class="block mb-2">Show competitions for the next:</label> <select id="days" class="select select-bordered w-full max-w-xs"><option value="7"${attr("selected", data.days === 7, true)}>7 days</option><option value="30"${attr("selected", data.days === 30, true)}>30 days</option><option value="90"${attr("selected", data.days === 90, true)}>90 days</option></select></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
