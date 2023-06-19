const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    category: "utility",
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the bot latency in ms.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
        await wait(2000);
        await interaction.editReply({ content: `Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`, ephemeral: true });
    },
};