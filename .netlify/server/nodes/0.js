import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.Dr3bScY9.js","_app/immutable/chunks/BThUvnxJ.js","_app/immutable/chunks/CkPqafF2.js","_app/immutable/chunks/D5OrjbLf.js","_app/immutable/chunks/C687cqXg.js","_app/immutable/chunks/T5AE2Zdx.js","_app/immutable/chunks/szi5wOji.js","_app/immutable/chunks/DlKhYTjz.js","_app/immutable/chunks/CaGRk41g.js"];
export const stylesheets = ["_app/immutable/assets/0.C29Pr0mj.css"];
export const fonts = [];
