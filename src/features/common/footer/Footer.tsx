'use client';
import {useState} from "react";
import {QrCodeMenu} from "@/features/common/qr-code";
import {useTranslation} from "@/app/i18n/client";

export function Footer() {
    const [isQRMenuVisible, setQRMenuVisible] = useState(false);
    const { t } = useTranslation('global');
    function scrollToTop() {
        // @ts-ignore
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleQRMenu() {
        setQRMenuVisible(!isQRMenuVisible);
    }


    return (<>
        <QrCodeMenu isOpen={isQRMenuVisible} toggleQRMenu={setQRMenuVisible}/>
        <div className="bottomSpace"></div>
        <div className="buttonsGroup bottomFixed">
            <button type="button" onClick={toggleQRMenu}
                    className="btn btn--big btn--primary btn--qr"
                    id="slideoutQR__toggle">{ t('MyQrCode') }<i className="icon-qr-code"></i></button>
            <button type="button" onClick={scrollToTop}
                    className="btn btn--big btn--primary btn--iconOnly">
                <i className="icon-arrow-button-left jumping"></i></button>
        </div>
    </>);
}
