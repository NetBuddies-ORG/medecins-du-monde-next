import lunr from 'lunr';
import { removeDiacritics } from './removeDiacritics';

/**
 *
 * @param token {import('lunr').Token}
 * @returns
 */
const pipelineFunction = (token) => token.update(token => removeDiacritics(token));

// Register the pipeline function so the index can be serialised
lunr.Pipeline.registerFunction(pipelineFunction, 'removeDiacriticsSpelling')

/**
 *
 * @param builder {import('lunr').Builder}
 */
export function removeDiacriticsSpelling(builder)
{
    // Add the pipeline function to both the indexing pipeline and the
    // searching pipeline
    const stemmer = builder.pipeline._stack[builder.pipeline._stack.length - 1];
    builder.pipeline.before(stemmer, pipelineFunction)
    builder.searchPipeline.before(stemmer, pipelineFunction)
}
