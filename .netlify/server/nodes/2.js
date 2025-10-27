import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.DWqOJep9.js","_app/immutable/chunks/D5OrjbLf.js","_app/immutable/chunks/CkPqafF2.js","_app/immutable/chunks/BThUvnxJ.js","_app/immutable/chunks/T5AE2Zdx.js","_app/immutable/chunks/DlKhYTjz.js","_app/immutable/chunks/C687cqXg.js","_app/immutable/chunks/CIMFJG0V.js","_app/immutable/chunks/Dns1y6pV.js","_app/immutable/chunks/CaGRk41g.js","_app/immutable/chunks/Cxi9DoPE.js"];
export const stylesheets = [];
export const fonts = [];
