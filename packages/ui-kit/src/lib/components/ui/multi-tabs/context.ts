import { getContext, hasContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

export type MultiTabsProps = {
	activeTab?: number;
	startIndex?: number;
	setStartIndex?: number;
	setActiveIndex?: number;
	tabsTitle?: string;
	tabsTitleFull?: string;
};

const MULTI_TABS_CONTEXT = Symbol('MULTI_TABS_CONTEXT');

type MultiTabsContext = {
	activeTab: Writable<number>;
	startIndex: Writable<number>;
	tabs: Writable<MultiTabsTab[]>;
	title?: Writable<string>;
	titleFull?: Writable<string>;
	addTab: (tab: MultiTabsTab, index: number) => void;
};
export type MultiTabsTab = {
	index?: number;
	label: string;
	img?: string;
};

export function setMultiTabsContext(config: MultiTabsContext): MultiTabsContext {
	setContext(MULTI_TABS_CONTEXT, config);
	return config;
}

export function getMultiTabsContext(name = 'This component') {
	if (!hasContext(MULTI_TABS_CONTEXT)) {
		throw new Error(`${name} must be used within a <MultiTabs.Root> component`);
	}
	return getContext<ReturnType<typeof setMultiTabsContext>>(MULTI_TABS_CONTEXT);
}
