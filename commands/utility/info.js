const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path')

module.exports = {
    category: path.basename(path.resolve(__dirname)),
		data: new SlashCommandBuilder()
		.setName(path.parse(path.basename(path.resolve(__filename))).name)
		.setDescription('Get info from the server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The User')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user'){
            const user = interaction.options.getUser('target');

            if (user) {
                await interaction.reply({ content: `Username: ${user.username}\nID: ${user.id}`, ephemeral: true});
            } else {
				await interaction.reply({ content: `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`, ephemeral: true });
			}
        } else if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply({ content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`, ephemeral: true });
		}
	},
};