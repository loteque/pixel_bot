const { SlashCommandBuilder, ChannelType } = require('discord.js');
const path = require('node:path')

module.exports = {
    category: path.basename(path.resolve(__dirname)),
		data: new SlashCommandBuilder()
		.setName(path.parse(path.basename(path.resolve(__filename))).name)
		.setDescription('Create project channels!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a project channel!')
                .addStringOption(option => 
                    option.setName('project')
                        .setDescription('Project Name')
                        .setRequired(true))
                .addChannelOption(option => 
                    option.setName('category')
                        .addChannelTypes(4)
                        .setDescription('The category to create the new project channel in')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Info about the channel')
                .addChannelOption(option => 
                    option.setName('channel')
                        .setDescription('The channel to get info about')
                        .setRequired(true))),
	async execute(interaction) {
        const channelName = interaction.options.getString('project');
        const channel = interaction.options.getChannel('channel')
        const categoryName = interaction.options.getChannel('category')

		if (interaction.options.getSubcommand() === 'create'){
            const category = interaction.guild.channels.cache.find(category => category.name == categoryName.name)

            await interaction.guild.channels.create({
                name: channelName,
                type: ChannelType.GuildForum,
                parent: category.id
            });
            const projectChannel = interaction.guild.channels.cache.find(ch => ch.name == channelName)
            await projectChannel.threads.create({
                name: 'github-notify',
                autoArchiveDuration: 10080,
                message: {
                    content: 'Github Repository Updates'
                }
            });
            const thread = projectChannel.threads.cache.find(t => t.name === 'github-notify')
            await projectChannel.createWebhook({
                name: 'github-notify'
            });
            const webhooks = await projectChannel.fetchWebhooks();
            const webhook = webhooks.find(wh => wh.name === 'github-notify')
    
            await interaction.reply({ 
                content: `project ${channelName} created at ${category.name}\nWebhook URL: https://discord.com/api/webhooks/${webhook.id}/${webhook.token}/github?thread_id=${thread.id}`,
                ephemeral: true 
            });

        } else if (interaction.options.getSubcommand() === 'info') {
			await interaction.reply({ content: `Channel Name: ${channel.name}\nChannel Category: ${channel.parent.name}`, ephemeral: true });
		}
	},
};