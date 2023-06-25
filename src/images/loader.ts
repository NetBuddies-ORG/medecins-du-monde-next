const isTransformAndExtract = /^tr:w-(\d+):w-(\d+),h-(\d+),cm-extract,y-(\d+),x-(\d+)$/
const isTransformOnly = /^tr:w-(\d+),h-(\d+)$/
const isMedia = /^(https:\/\/ik.imagekit.io\/passvisitwallonia\/)(tr:[^\/]+)?\/?(media\/.+)$/;
const isDesign = (src: string) => src.startsWith('/_next/static/');

function updateTransformation(currentTransformation: string, targetWith: number)
{
    if (!currentTransformation)
    {
        return `tr:w-${targetWith}/`;
    }

    const applyRatio = (value: number, ratio: number): number => Math.round(value * ratio);
    const transformOnlyMatch = currentTransformation.match(isTransformOnly);
    if (transformOnlyMatch)
    {
        const width = +transformOnlyMatch[1];
        const height = +transformOnlyMatch[2];
        const ratio = targetWith / width;
        return `tr:w-${targetWith},h-${applyRatio(height, ratio)}/`;
    }

    const transformAndExtract = currentTransformation.match(isTransformAndExtract);
    if (transformAndExtract)
    {
        const bigWidth = +transformAndExtract[1];
        const width = +transformAndExtract[2];
        const height = +transformAndExtract[3];
        const y = +transformAndExtract[4];
        const x = +transformAndExtract[5];
        const ratio = targetWith / width;
        return `tr:w-${applyRatio(bigWidth, ratio)}:w-${targetWith},h-${applyRatio(height, ratio)},cm-extract,y-${applyRatio(y, ratio)},x-${applyRatio(x, ratio)}/`;
    }

    console.warn(`Image: unknown transformation: "${currentTransformation}"`);
    return `${currentTransformation}:w-${targetWith}/`;
}
type ImageLoaderProps = {
    src: string;
    width:number;
    quality:number;
}
export default function imageLoader({ src, width, quality }: ImageLoaderProps)
{
    if (!src)
    {
        return src;
    }

    const matchMedia = src.match(isMedia);
    if (matchMedia)
    {
        matchMedia[2] = updateTransformation(matchMedia[2], width);
        return matchMedia.slice(1, 4).join('');
    }

    // if (isDesign(src))
    // {
    //   const prefix = 'https://ik.imagekit.io/passvisitwallonia/';
    //   return `${prefix}tr:w-${width}/${src.substring('/_next/static/'.length)}`;
    // }

    return src;
}