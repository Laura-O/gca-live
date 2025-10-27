import { g as bind_props, a as pop, p as push, c as attr, d as escape_html, i as stringify, b as store_get, j as attr_class, u as unsubscribe_stores } from "./index3.js";
import { t } from "./translations.js";
import "qrcode";
function QRCode_1($$payload, $$props) {
  push();
  let url = $$props["url"];
  $$payload.out += `<div class="flex flex-col items-center">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p>Generating QR Code...</p>`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { url });
  pop();
}
function CompetitionCard($$payload, $$props) {
  push();
  var $$store_subs;
  let competition = $$props["competition"];
  let showQRButton = $$props["showQRButton"];
  let isModalOpen = false;
  $$payload.out += `<div class="card-compact bg-base-100 w-96 shadow"><div class="card-body items-center text-center"><h2 class="card-title"><a${attr("href", `/competitions/${competition.id}`)}>${escape_html(competition.name)}</a></h2> <ul class="my-4 space-y-3 flex flex-col items-center"><li><a role="button" class="btn btn-primary"${attr("href", `https://live.worldcubeassociation.org/link/competitions/${stringify(competition.id)}`)} target="_blank">WCA Live</a></li> <li><a role="button" class="btn btn-primary"${attr("href", `https://www.competitiongroups.com/competitions/${stringify(competition.id)}`)} target="_blank">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.grouping"))}</a></li> <li><a role="button" class="btn btn-primary"${attr("href", `https://www.worldcubeassociation.org/competitions/${stringify(competition.id)}#competition-schedule`)} target="_blank">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.schedule"))}</a></li> <li><a role="button" class="btn btn-primary"${attr("href", `https://www.worldcubeassociation.org/competitions/${stringify(competition.id)}#general-info`)} target="_blank">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.info"))}</a></li></ul> `;
  if (showQRButton) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex justify-end w-full"><button class="modal-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"></path></svg></button></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div${attr_class("modal", void 0, { "modal-open": isModalOpen })}><div class="modal-box">`;
  QRCode_1($$payload, {
    url: `https://live.germancubeassociation.de/competitions/${competition.id}`
  });
  $$payload.out += `<!----> <div class="modal-action"><button class="btn">Close</button></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { competition, showQRButton });
  pop();
}
export {
  CompetitionCard as C
};
