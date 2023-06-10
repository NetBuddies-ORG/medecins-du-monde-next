import {getUmbracoClient} from "@/services/Umbraco";
import {cache, use} from "react";
import { notFound } from 'next/navigation';
import {setHeader, setNavigation, setPage} from "@/context/server";
import {Header} from "@/features/common";
import {DocumentTypes} from "@/features/document-types/DocumentTypes";

type CmsPageProps = {
    params: {
        p?: string[];
    }
};

const getPage = cache(async function getPage(url: string)
{
  const client = getUmbracoClient();
  return await client.getPage({ url });
});

const getUrl = (p?: string[]) => p ? `/${p.join('/')}/` : '/';

export default function CmsPage({ params: { p } }: CmsPageProps)
{
  const url = getUrl(p);
  console.log(use(getPage(url)));
  const { contentByAbsoluteRoute: {properties} } = use(getPage(url));
  console.log(properties);

  return (
      <>
        {/*<Header navigation={navigation} header={header} />*/}
        <main>
          <DocumentTypes />
        </main>
      </>);
}
