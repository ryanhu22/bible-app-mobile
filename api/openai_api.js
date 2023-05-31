import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const explainAPI = async (question) => {
  console.log("Hitting explain v2");
  if (!configuration.apiKey) {
    console.error(
      "API key not found. Please set the OPENAI_API_KEY environment variable."
    );
    return;
  }

  if (question.trim().length === 0) {
    console.log("No input was provided");
    return;
  }

  console.log("Checkpoint 1");

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant, who has wide and deep knowledge of the Christian Bible, particularly of the English Standard Version",
        },
        { role: "user", content: question },
      ],
    });
    console.log(completion.data.choices[0].message.content);
    return completion.data.choices[0].message.content;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    return;
  }
};
