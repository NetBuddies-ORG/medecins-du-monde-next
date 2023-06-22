import React from 'react';

type CmsPageProps = {
    params: {
        p?: string[];
    }
};

export default function CmsPage({params: {p}}: CmsPageProps) {

    return (
        <>
            <main>
                coucou
            </main>
        </>
);
}