import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon.png","icon-128x128.png","icon-144x144.png","icon-152x152.png","icon-192x192.png","icon-384x384.png","icon-512x512.png","icon-72x72.png","icon-96x96.png","logo.png","logo.webp","manifest.json"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.H4EhtbNt.js",app:"_app/immutable/entry/app.C0Be1G6y.js",imports:["_app/immutable/entry/start.H4EhtbNt.js","_app/immutable/chunks/DlKhYTjz.js","_app/immutable/chunks/C687cqXg.js","_app/immutable/chunks/CkPqafF2.js","_app/immutable/entry/app.C0Be1G6y.js","_app/immutable/chunks/D5OrjbLf.js","_app/immutable/chunks/CkPqafF2.js","_app/immutable/chunks/C687cqXg.js","_app/immutable/chunks/Dns1y6pV.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/competitions",
				pattern: /^\/api\/competitions\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/competitions/_server.ts.js'))
			},
			{
				id: "/api/competitions/[id]",
				pattern: /^\/api\/competitions\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/competitions/_id_/_server.ts.js'))
			},
			{
				id: "/competitions/[id]",
				pattern: /^\/competitions\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
