import lunr, { Builder, Token } from 'lunr';
import { removeDiacritics } from './removeDiacritics';

const pipelineFunction = (token: Token) => token.update(token => removeDiacritics(token));

// Register the pipeline function so the index-builder can be serialised
lunr.Pipeline.registerFunction(pipelineFunction, 'removeDiacriticsSpelling')

/**
 * 
 * @param builder {import('lunr').Builder}
 */
export function removeDiacriticsSpelling(builder: Builder) 
{
  const pipeline = builder.pipeline.toJSON();
  const stemmer = pipeline[pipeline.length - 1];
  // Add the pipeline function to both the indexing pipeline and the
  // searching pipeline
  builder.pipeline.before(stemmer, pipelineFunction)
  builder.searchPipeline.before(stemmer, pipelineFunction)
}
