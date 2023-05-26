require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
  apiKey: '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',
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
})

async function gptResponse(prompt) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ "role": "user", "content": prompt }],
    temperature: 0.7
  })

  return response.data.choices[0].message.content;
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageCreate', async message => {
  if (message.content === 'ping') message.reply('pong!');

  if (message.content.startsWith('!gpt')) {
    const prompt = message.content;
    const response = await gptResponse(prompt);
    message.reply(response);
  }
})

client.login(process.env.DISCORD_TOKEN);