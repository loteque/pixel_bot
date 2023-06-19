const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: "fun",
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies With Pong!'),
    async execute(interation) {
        await interation.reply('Whaddayawant!');
    },
};