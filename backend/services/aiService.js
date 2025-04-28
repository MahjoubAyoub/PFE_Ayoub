const axios = require("axios");

exports.generateDescription = async (designId) => {
  const response = await axios.post("https://api.openai.com/v1/completions", {
    prompt: `Describe the design with ID: ${designId}`,
    max_tokens: 50,
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });

  return response.data.choices[0].text;
};
