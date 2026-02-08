export interface ContentItem {
    title: string;
    "embedded link": string;
    description: string;
}

export interface ContentData {
    [key: string]: ContentItem[];
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface ContentTabsProps {
    data: ContentData;
}