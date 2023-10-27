'use client';
import React, {useEffect, useState} from 'react';
import {useSearch} from "@/services/Search";
import {useAsyncEffect} from "@/hooks";
import {getStrapiClient} from "@/services/Strapi";
import {Organisme} from "@/services/GraphQL";

export default function MainPage() {

    const {isReady, search, getOrganismes} = useSearch('fr');
    const [organismes, setOrganismes] = useState<Organisme[]>([]);

    useAsyncEffect(async () => {
        if (isReady) {
            await search({keyword: ''});
            getOrganismes().then((organismesFromIndex) => {
                setOrganismes(organismesFromIndex);
            })
        }
    }, [isReady]);

    return (
        <>
            <main>
                {JSON.stringify(organismes)}
            </main>
        </>
    );
}