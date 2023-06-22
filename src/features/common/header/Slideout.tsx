'use client';
import {ReactNode, useState} from "react";
import classNames from "classnames";
import {useMenu} from "@/features/common/header/MenuContext";
interface SlideoutProps{
    children: ReactNode;
}
export function Slideout({children}: SlideoutProps)
{
    const {isMenuOpen} = useMenu();
    return (
        <div id="slideoutMenu" className={classNames('slideout', isMenuOpen && 'isOpen')}>
            {children}
        </div>
    );
}
