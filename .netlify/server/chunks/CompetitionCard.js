import { h as bind_props, f as attr, c as escape_html, b as attr_class, a as store_get, u as unsubscribe_stores } from "./index2.js";
import { t } from "./translations.js";
import { E as EXTERNAL_URLS } from "./config.js";
import "qrcode";
import "./toast.js";
import { L as LinkButton } from "./LinkButton.js";
function QRCode_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let url = $$props["url"];
    $$renderer2.push(`<div class="flex flex-col items-center">`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p>Generating QR Code...</p>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { url });
  });
}
function CompetitionCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let competition = $$props["competition"];
    let showQRButton = $$props["showQRButton"];
    let isModalOpen = false;
    $$renderer2.push(`<div class="modern-card w-full max-w-card overflow-hidden group"><div class="card-body items-center text-center p-6"><h2 class="card-title text-xl font-semibold mb-4"><a${attr("href", `/competitions/${competition.id}`)} class="hover:gradient-text transition-all duration-300">${escape_html(competition.name)}</a></h2> <ul class="my-4 space-y-3 flex flex-col items-center"><li>`);
    LinkButton($$renderer2, {
      href: EXTERNAL_URLS.wcaLive(competition.id),
      external: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->WCA Live`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></li> <li>`);
    LinkButton($$renderer2, {
      href: EXTERNAL_URLS.competitionGroups(competition.id),
      external: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.grouping"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></li> <li>`);
    LinkButton($$renderer2, {
      href: EXTERNAL_URLS.wcaSchedule(competition.id),
      external: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.schedule"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></li> <li>`);
    LinkButton($$renderer2, {
      href: EXTERNAL_URLS.wcaInfo(competition.id),
      external: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.info"))}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></li></ul> `);
    if (showQRButton) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex justify-end w-full mt-4"><button class="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white hover:shadow-glow transition-all duration-300 hover:scale-110"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("content.show-qr-code"))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"></path></svg></button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div${attr_class("modal", void 0, { "modal-open": isModalOpen })}><div class="modal-box glass-card">`);
    QRCode_1($$renderer2, { url: EXTERNAL_URLS.gcaLive(competition.id) });
    $$renderer2.push(`<!----> <div class="modal-action"><button class="btn btn-primary shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-300">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.close"))}</button></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { competition, showQRButton });
  });
}
export {
  CompetitionCard as C
};
