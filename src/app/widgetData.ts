// Union type to represent the different widget types
type BaseWidget = {
    id?: number;
    widgetType: string;
}

type TextWidget = BaseWidget & {
    widgetType: 'text';
    heading: string;
    content: string;
    value?: never;
    label?: never;
    change?: never;
    icon?: never;
}

type StatWidget = BaseWidget & {
    widgetType: 'stat';
    value: number;
    label: string;
    change: number;
    icon: string;
    heading?: never;
    content?: never;
}

// Union type that combines all widget types
export type Widget = TextWidget | StatWidget;

// The full data array type
export type WidgetData = Widget[];

// Example usage with explicit type annotations
export const widgetData: WidgetData = [
    {
        id: 1,
        heading: "Signups",
        content: "User johndoe123 has signed up at 12:00 PM",
        widgetType: 'text'
    },

    {
        id: 2,
        widgetType: 'stat',
        value: 100,
        label: 'Signups',
        change: 10,
        icon: '👨‍👩‍👦‍👦'
    },
    {
        id: 3,
        heading: "Profile edits",
        content: "User johndoe123 has edited their profile at 12:30 PM",
        widgetType: 'text'
    },
    {
        id: 4,
        widgetType: 'stat',
        value: 25,
        label: 'Temperature',
        change: -1,
        icon: '🌡️'
    },
    {
        id: 5,
        widgetType: 'stat',
        value: 50,
        label: 'Humidity',
        change: -5,
        icon: '💧',
    }
] as const;