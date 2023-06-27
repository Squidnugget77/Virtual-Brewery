const { ApplicationCommandOptionType } = require("discord.js")
const Discord = module.require("discord.js");

module.exports = {
	name: "create",
	description: "Create your virtual brewery!",
	options: [
		{
			name: 'name',
			description: 'Name of your brewery!',
			type: ApplicationCommandOptionType.String,
			required: true,
		}
	],
	async execute({inter}) {
		if (await economy.get(inter.member.id) == null) {
			try {
				var name = inter.options.getString('name')
				await economy.set(inter.member.id,
					{name: name, balance: 500, level: 1,
					tables: 0, fermenters: 0, ingredients: 0, bathrooms: 0,
					workTime: null, dailyTime: null, soldValue: 0, hourlyIncome: 0, 
					brewers: 0, cellarOperator: 0, breweryManager: 0, servers: 0, tourGuide: 0})
				const embed = new Discord.EmbedBuilder()
				.setColor('Green')
				.addFields([ { name: `✅ You have created a brewery!`, value: `View it with **/brewery**` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed]})			
			} 
			catch (error) {
			inter.reply({content: "❌ | Error! Please contact Developers!", ephemeral: true})
			}	
		}
		else {
			try {
			const embed = new Discord.EmbedBuilder()
				.setColor('Red')
				.addFields([ { name: `❌ | You already have a brewery!`, value: `If you want to delete your current data, type **/delete**` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed], ephemeral: true})
			}
			catch (error) {
				inter.reply({content: "❌ | Error! Please contact Developers!", ephemeral: true})
			}
		}		
	}
}