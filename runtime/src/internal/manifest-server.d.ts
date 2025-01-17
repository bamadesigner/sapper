import { Preload } from '@sapper/common';
import { SapperRequest, SapperResponse } from '@sapper/server';

export const src_dir: string;
export const build_dir: string;
export const dev: boolean;
export const manifest: Manifest;

export type { SapperRequest, SapperResponse };

export interface SSRComponentModule {
	default: SSRComponent;
	preload?: Preload;
}

export interface SSRComponent {
	render(props: unknown): {
		html: string
		head: string
		css: { code: string, map: unknown };
	}
}

export interface Manifest {
	server_routes: ServerRoute[];
	ignore: RegExp[];
	root_comp: SSRComponentModule
	error: SSRComponent
	not_found?: ManifestPage
	pages: ManifestPage[]
}

export interface ManifestPage {
	pattern: RegExp | null;
	parts: ManifestPagePart[];
}

export interface ManifestPagePart {
	name: string | null;
	file?: string;
	component: SSRComponentModule;
	params?: (match: RegExpMatchArray | null) => Record<string, string>;
}

export type Handler = (req: SapperRequest, res: SapperResponse, next: () => void) => void;

export interface ServerRoute {
	pattern: RegExp;
	handlers: Record<string, Handler>;
	params: (match: RegExpMatchArray) => Record<string, string>;
}
