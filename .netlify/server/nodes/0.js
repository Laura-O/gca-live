import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.D9S1-Zia.js","_app/immutable/chunks/0mBzo8Ie.js","_app/immutable/chunks/BC38UvDJ.js","_app/immutable/chunks/CA5ZZZK2.js","_app/immutable/chunks/rFwERVDk.js","_app/immutable/chunks/DfM1pNfR.js","_app/immutable/chunks/B3bA76DQ.js","_app/immutable/chunks/Dj0Ezt28.js"];
export const stylesheets = ["_app/immutable/assets/0.BGt1qtyU.css"];
export const fonts = [];
