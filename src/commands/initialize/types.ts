export type ProjectConfiguration = {
	information: {
		name: string;
	};
	layout: {
		search: boolean;
		toc: boolean;
	};
	theme: {
		default: "dark" | "light";
		switchable: boolean;
	};
};
