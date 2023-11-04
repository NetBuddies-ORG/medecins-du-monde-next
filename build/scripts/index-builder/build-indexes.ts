import {writeFile} from "fs/promises";
import {join} from "path";
import lunr from 'lunr';
import {removeDiacriticsSpelling} from "./removeDiacriticsSpelling";
import {Organisme, OrganismeEntity} from "@/services/GraphQL";
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.fr')(lunr);
require('lunr-languages/lunr.nl')(lunr);
require('lunr-languages/lunr.de')(lunr);

async function buildIndex()
{
    const organismes = require(`../../static/organismes.json`);
    const index = lunr(function ()
    {
        this.use(removeDiacriticsSpelling);
        this.ref('id');
        this.field('name_organismes', {extractor: (p: Organisme)  => p.Nom});
        this.field('address_organismes', {extractor: (p: Organisme)  => p.Adresse});
        organismes.forEach(p => this.add(p));
    });

    const jsonIndex = JSON.stringify(index);
    await writeFile(join(__dirname, `../../static/index.json`), jsonIndex, { encoding: 'utf-8' });
}

export async function buildIndexes()
{
    console.info('Build indexes...')
    await buildIndex();
}
