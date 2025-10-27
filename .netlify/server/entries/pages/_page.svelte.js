import { c as escape_html, a as store_get, e as ensure_array_like, u as unsubscribe_stores, h as bind_props } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { t } from "../../chunks/translations.js";
import { E as EXTERNAL_URLS } from "../../chunks/config.js";
import { C as CompetitionCard } from "../../chunks/CompetitionCard.js";
import { S as SEO, L as LinkButton } from "../../chunks/LinkButton.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    SEO($$renderer2, { url: "/" });
    $$renderer2.push(`<!----> <div class="container mx-auto px-6 py-12"><div class="text-center mb-12 animate-fade-in"><h1 class="text-4xl md:text-5xl font-bold gradient-text mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.comp") || "Competitions")}</h1> <p class="text-lg text-base-content/70">Live Rubik's Cube competitions in Germany</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center mb-12">`);
    if (data.competitions.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="col-span-full"><div class="modern-card w-full max-w-2xl mx-auto p-8 text-center"><div class="text-6xl mb-4">🎲</div> <h2 class="text-2xl font-bold mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.nocomps-title"))}</h2> <p class="text-base-content/70 mb-6">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.nocomps-content"))}</p> `);
      LinkButton($$renderer2, {
        href: EXTERNAL_URLS.wcaCompetitionsList,
        external: true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.wca-page"))}`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(data.competitions);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let competition = each_array[$$index];
        CompetitionCard($$renderer2, { competition, showQRButton: false });
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex flex-col items-center gap-4 pb-32 md:pb-28"><label for="days" class="text-sm font-medium text-base-content/70">${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.days-label"))}</label> <select id="days" class="select select-bordered select-primary w-full max-w-xs shadow-soft transition-all duration-300 hover:shadow-glow focus:shadow-glow focus:scale-105">`);
    $$renderer2.option({ value: "7", selected: data.days === 7 }, ($$renderer3) => {
      $$renderer3.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.days-7"))}`);
    });
    $$renderer2.option({ value: "30", selected: data.days === 30 }, ($$renderer3) => {
      $$renderer3.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.days-30"))}`);
    });
    $$renderer2.option({ value: "90", selected: data.days === 90 }, ($$renderer3) => {
      $$renderer3.push(`${escape_html(store_get($$store_subs ??= {}, "$t", t)("content.days-90"))}`);
    });
    $$renderer2.push(`</select></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
