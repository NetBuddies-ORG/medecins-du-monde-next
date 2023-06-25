'use client';
import React, {useEffect} from 'react';
import {useSearch} from "@/services/Search";
import {useAsyncEffect} from "@/hooks";
import {getStrapiClient} from "@/services/Strapi";

export default function MainPage() {

    const {isReady, search} = useSearch('fr');

    useAsyncEffect(async () => {
        if (isReady) {
            await search({keyword: ''});
        }
    }, [isReady]);

    return (
        <>
            <main>
                coucou
            </main>
        </>
    );
}