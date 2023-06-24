const { Player } = require('discord-player');
const { Client, GatewayIntentBits } = require('discord.js');
const { QuickDB } = require('quick.db');

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  disableMentions: 'everyone',
});

global.economy = new QuickDB();



client.config = require('./config');

require('./src/loader');
require('./src/events');

console.log(client.channels.cache.size);
client.login(client.config.app.token);