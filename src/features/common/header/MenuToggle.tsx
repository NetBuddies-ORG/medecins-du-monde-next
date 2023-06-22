'use client';
import {useMenu} from "@/features/common/header/MenuContext";

interface  MenuToggleProps
{
    icon: string;
}
export function MenuToggle({icon}: MenuToggleProps)
{
    const {toggleMenu} = useMenu();
    return (
        <button type="button" onClick={toggleMenu}
                id="slideoutMenu__close"
                className="slideout__close">
            <i className={icon}></i>
        </button>
    );
}
