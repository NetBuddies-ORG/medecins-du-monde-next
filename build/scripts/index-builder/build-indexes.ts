import {writeFile} from "fs/promises";
import {join} from "path";
import lunr from 'lunr';
import {removeDiacriticsSpelling} from "./removeDiacriticsSpelling";
import {ThematiqueEntity} from "@/services/GraphQL";
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.fr')(lunr);
require('lunr-languages/lunr.nl')(lunr);
require('lunr-languages/lunr.de')(lunr);

async function buildIndex()
{
    const thematiques = require(`../../static/thematiques.json`);
    const index = lunr(function ()
    {
        this.use(removeDiacriticsSpelling);
        this.ref('id');
        this.field('name_thematique', {extractor: (p: ThematiqueEntity)  => p.attributes.Nom});
        thematiques.forEach(p => this.add(p));
    });

    const jsonIndex = JSON.stringify(index);
    await writeFile(join(__dirname, `../../static/index.json`), jsonIndex, { encoding: 'utf-8' });
}

export async function buildIndexes()
{
    console.info('Build indexes...')
    await buildIndex();
}
