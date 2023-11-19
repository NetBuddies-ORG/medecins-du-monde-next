import {writeFile} from "fs/promises";
import {join} from "path";
import lunr from 'lunr';
import {removeDiacriticsSpelling} from "./removeDiacriticsSpelling";
import {Categorie, Organisme, OrganismeEntity, Service, SousCategorie} from "@/services/GraphQL";
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.fr')(lunr);
require('lunr-languages/lunr.nl')(lunr);
require('lunr-languages/lunr.de')(lunr);

async function buildIndex()
{
    const organismes = require(`../../static/organismes.json`);
    const services = require(`../../static/services.json`);
    const categories = require(`../../static/categories.json`);
    const index = lunr(function ()
    {
        this.use(removeDiacriticsSpelling);
        this.ref('id');
        this.field('name_organismes', {extractor: (p: Organisme)  => p.Nom});
        this.field('address_organismes', {extractor: (p: Organisme)  => p.Adresse});
        organismes.forEach(p => this.add(p));
    });

    const servicesIndex = lunr(function ()
    {
        this.use(removeDiacriticsSpelling);
        this.ref('id');
        this.field('name_services', {extractor: (p: Service)  => p.Nom});
        services.forEach(p => this.add(p));
    });

    const categoriesIndex = lunr(function ()
    {
        this.use(removeDiacriticsSpelling);
        this.ref('id');
        this.field('name_category', {extractor: (p: Categorie)  => p.Nom});
        this.field('name_sub_category', {extractor: (p: Categorie)  => p.sous_categories.data.map((s) => s.attributes.Nom).join(' ')});
        categories.forEach(p => this.add(p));
    });

    const jsonIndex = JSON.stringify(index);
    await writeFile(join(__dirname, `../../static/index.json`), jsonIndex, { encoding: 'utf-8' });

    const jsonServicesIndex = JSON.stringify(servicesIndex);
    await writeFile(join(__dirname, `../../static/indexService.json`), jsonServicesIndex, { encoding: 'utf-8' });

    const jsonCategoriesIndex = JSON.stringify(categoriesIndex);
    await writeFile(join(__dirname, `../../static/indexCategorie.json`), jsonCategoriesIndex, { encoding: 'utf-8' });

}

export async function buildIndexes()
{
    console.info('Build indexes...')
    await buildIndex();
}
