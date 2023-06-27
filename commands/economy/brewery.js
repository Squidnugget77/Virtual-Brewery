const { EmbedBuilder } = require("@discordjs/builders");
const Discord = module.require("discord.js");

module.exports = {
	name: "brewery",
	description: "View your brewery!",

	async execute({inter}) {
		var user_id = inter.member.id
		if (await economy.get(user_id) == null) {
			try {
				const embed = new Discord.EmbedBuilder()
				.setColor('Red')
				.addFields([ { name: `❌ | You do not own a brewery`, value: `Create a brewery with **/create**` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed], ephemeral: true})
			}
			catch (error) {
				inter.reply({content: "❌ | Error! Please contact Developers!", ephemeral: true})
			}
		}
		else {
			try {
				var name = await economy.get(`${user_id}.name`)
				var level = await economy.get(`${user_id}.level`)
				var balance = await economy.get(`${user_id}.balance`)
				var hourlyIncome = await economy.get(`${user_id}.hourlyIncome`)
				var beveragesSold = await economy.get(`${user_id}.soldValue`)

				if (level < 1) {
					var textLevel = "breweries"
				}
				else {
					var textLevel = "brewery"
				}
				const embed = new Discord.EmbedBuilder()
					.setColor('#E67F1A')
					.addFields(
						{ name: `Brewery Name`, value: `🔸 ${name}` },
						{ name: `Balance`, value: `💵 $${balance.toLocaleString("en-US")}` },
						{ name: `Income (per hour)`, value: `💸 $${hourlyIncome.toLocaleString("en-US")} | 🍺 ${(hourlyIncome/10).toLocaleString("en-US")} ` },
						{ name: `Beverages Sold`, value: `🍻 ${beveragesSold.toLocaleString("en-US")}`}
						)
					.setTimestamp()
					.setFooter({ text: `You own ${level} ${textLevel}`, iconURL: inter.member.avatarURL({ dynamic: true })});

				inter.reply({ embeds: [embed]})
			}
			catch (error) {
				inter.reply({content: "❌ | Error! Please contact Developers!", ephemeral: true})
			}
		}
	}
}