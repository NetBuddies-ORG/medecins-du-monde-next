import * as ReactIcons from "react-icons/fa6";

interface IconComponentProps {
    icon: string
}
type IReactIcon = keyof typeof ReactIcons;

export function IconComponent({icon}: IconComponentProps) {
    const DynamicIconComponent = ReactIcons[icon as IReactIcon];

    if (undefined === DynamicIconComponent) return <></>;

    return <DynamicIconComponent />;
}