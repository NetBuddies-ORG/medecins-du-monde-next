import * as ReactIcons from "react-icons/fa";

interface IconComponentProps {
    icon: string
    classCustom?: string
    size?: number
}
type IReactIcon = keyof typeof ReactIcons;

export function IconComponent({icon, classCustom, size}: IconComponentProps) {
    const DynamicIconComponent = ReactIcons[icon as IReactIcon];

    if (undefined === DynamicIconComponent) return <></>;

    return <DynamicIconComponent size={size} className={classCustom} />;
}