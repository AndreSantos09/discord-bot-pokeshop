const { Client, GatewayIntentBits, MessageActionRow, MessageButton } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

const prefix = '!';

client.once('ready', () => {
    console.log('BOT online com sucesso!');
});

client.on('messageCreate', async (message: any) => {
    if (message.author.bot) return; // Ignorar mensagens de outros bots

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        if (command === 'pokemon') {
            const pokemonName = args[0];
            if (!pokemonName) {
                message.reply('Por favor, especifique o nome de um Pokémon após o comando.');
                return;
            }

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
                const data = response.data;
                message.reply(`Nome: ${data.name}\nAltura: ${data.height}\nPeso: ${data.weight}`);
            } catch (error) {
                message.reply('Desculpe, não foi possível encontrar informações sobre esse Pokémon.');
            }
        }
    }
});

client.login(process.env.token);
