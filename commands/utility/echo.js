const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path')

module.exports = {
    category: path.basename(path.resolve(__dirname)),
		data: new SlashCommandBuilder()
        .setName(path.parse(path.basename(path.resolve(__filename))).name)
		.setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('the input to echo back'))
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to echo into')),
	async execute(interaction) {
        const input = interaction.options.getString('input')
        const channel = interaction.options.getChannel('channel')
        if ( channel ) {
            await channel.send(input)
            await interaction.reply({ content: 'echo resolved', ephemeral: true })
        } else {
            await interaction.reply(input)
        }
	},
};