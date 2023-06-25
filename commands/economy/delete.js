const { ApplicationCommandOptionType } = require("discord.js")
const Discord = module.require("discord.js");

module.exports = {
	name: "delete",
	description: "Delete your brewery!",
	options: [
		{
			name: 'confirmation',
			description: 'Type confirmation to delete your brewery!',
			type: ApplicationCommandOptionType.String,
			required: true,
		}
	],
	async execute({inter}) {
		var confirmation = inter.options.getString('confirmation').toLowerCase()

		if (confirmation == "confirmation") {
			try {
				await economy.delete(inter.member.id)
				const embed = new Discord.EmbedBuilder()
				.setColor('Green')
				.addFields([ { name: `Your brewery has been deleted!`, value: `You have successfully deleted your brewery!` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed], ephemeral: true})
			} catch (error) {
				await inter.reply({content: `❌ | Error! Please contact Developers!`, ephemeral: true})
			}
		}
		else {
			const embed = new Discord.EmbedBuilder()
			.setColor('Red')
			.addFields([ { name: `Your brewery failed to delete!`, value: `Make sure you type *confirmation* correctly!` } ])
			.setTimestamp()
			.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
			inter.reply({ embeds: [embed], ephemeral: true})
		}
	}
}