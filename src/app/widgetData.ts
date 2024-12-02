// Union type to represent the different widget types
type BaseWidget = {
    id: number;
    widgetType: string;
}

type TextWidget = BaseWidget & {
    widgetType: 'text';
    heading: string;
    content: string;
}

type StatWidget = BaseWidget & {
    widgetType: 'stat';
    value: string;
    label: string;
    change: number;
    icon: string;
}

// Union type that combines all widget types
export type Widget = TextWidget | StatWidget;

// The full data array type
export type WidgetData = Widget[];

// Sample data
export const widgetData: WidgetData = [
    {
        id: 1,
        heading: "New signup",
        content: "User johndoe123 has signed up at 12:00 PM",
        widgetType: 'text'
    },
    {
        id: 2,
        widgetType: 'stat',
        value: "100",
        label: 'Total Users',
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
        value: "25°C",
        label: 'Temperature',
        change: -1,
        icon: '🌡️'
    },
    {
        id: 5,
        widgetType: 'stat',
        value: "50%",
        label: 'Humidity',
        change: -5,
        icon: '💧',
    },
    {
        id: 6,
        widgetType: 'stat',
        value: "50%",
        label: 'User Engagement',
        change: 10,
        icon: '👥',
    }
] as const;