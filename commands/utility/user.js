const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path')

module.exports = {
    category: path.basename(path.resolve(__dirname)),
		data: new SlashCommandBuilder()
		.setName(path.parse(path.basename(path.resolve(__filename))).name)
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
