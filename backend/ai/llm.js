import { ChatOpenAI } from '@langchain/openai';

const llm = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0 });

function getStructuredLlm(schema, name) {
  return llm.withStructuredOutput(schema, {
    name,
    method: 'json_mode',
  });
}

export { getStructuredLlm };
