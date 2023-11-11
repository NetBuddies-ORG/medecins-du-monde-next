import {Organisme} from "@/services/GraphQL";
import {FaTimes} from "react-icons/fa";
import {useState} from "react";
import { Image } from '@/features/components/image';
import {FaArrowRightLong} from "react-icons/fa6";
import Link from "next/link";

interface OrganismeCardProps{
    organisme?: Organisme
    lang?: string
    isClosable?: boolean
    handleCloseCard?(): void
}

export function OrganismeCard({organisme, isClosable = false, handleCloseCard, lang}:OrganismeCardProps) {

    const [partnerImage, setPartnerImage] = useState(organisme?.Logo?.data?.attributes?.url ?? '');

    function fixImage()
    {
        setPartnerImage('');
    }

    function truncate(str: string, num: number) {
        if(!str) {
            return '';
        }
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    return <>
        <article className="card">
            { isClosable && <button type="button" className="card__close" onClick={handleCloseCard}><FaTimes /></button>}
            <a href={`/${lang}/organismes/${organisme?.generatedUrl}`}>
                <div className="region copyrightImage card__blurredImage">
                    {
                        partnerImage &&
                        <Image src={partnerImage} onError={fixImage} alt={organisme?.Nom!} width={600} height={80} />
                    }
                </div>
                <div className="card__text">
                    <h2>{organisme?.Nom}</h2>
                    <div className="card__location">
                        <i className="icon-pin-dot"></i><span>{organisme?.Adresse}</span>
                    </div>
                </div>
            </a>
            <button className="card__close"><FaArrowRightLong /></button>
        </article>
    </>
}
