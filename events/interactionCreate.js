const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const { cooldowns } = interaction.client;
		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDurration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDurration) * 1000;
		if (timestamps.has(interaction.user.id)){
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
			if (now < expirationTime) {
					const expiredTimestamp = Math.round(expirationTime / 1000);
					return interaction.reply({ content: `cooldown for \`${command.data.name}\`. Ready in <t:${expiredTimestamp}:R>.`, ephemeral: true});
				}
			}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount)

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
			await interaction.reply({ content: 'There was an error wjile executing this command!', ephemeral: true})
		}
	},
};
