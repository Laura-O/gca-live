import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.U46E49cS.js","_app/immutable/chunks/CA5ZZZK2.js","_app/immutable/chunks/BC38UvDJ.js","_app/immutable/chunks/DfM1pNfR.js","_app/immutable/chunks/BFYHp4eA.js","_app/immutable/chunks/B3bA76DQ.js","_app/immutable/chunks/0mBzo8Ie.js","_app/immutable/chunks/rFwERVDk.js","_app/immutable/chunks/CZXxJ09R.js","_app/immutable/chunks/Dj0Ezt28.js","_app/immutable/chunks/DCX3hzUM.js"];
export const stylesheets = [];
export const fonts = [];
