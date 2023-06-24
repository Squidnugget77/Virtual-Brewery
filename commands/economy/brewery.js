const { EmbedBuilder } = require("@discordjs/builders");
const Discord = module.require("discord.js");

module.exports = {
	name: "brewery",
	description: "View your brewery!",

	async execute({inter}) {
		var user_id = inter.member.id
		if (await economy.get(user_id) == null) {
			const embed = new EmbedBuilder()
			.setColor('Red')
			.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
			.addFields([ { name: `❌ You do not own a brewery`, value: `Create a brewery with **/create**` } ])
			.setTimestamp()
			.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
			inter.reply({ embeds: [embed]})
		}
		else {
			var name = await economy.get(`${user_id}.name`)
			var balance = await economy.get(`${user_id}.balance`)
			var beveragesSold = await economy.get(`${user_id}.soldValue`)
			const embed = new Discord.EmbedBuilder()
				.setColor('#E67F1A')
				.addFields(
					 { name: `Brewery Name`, value: `◼️ ${name}` },
					 { name: `Balance`, value: `💵 $${balance.toLocaleString("en-US")}` },
					 { name: `Income (per hour)`, value: `💸 $number | 🍺 number ` },
					 { name: `Beverages Sold`, value: `🍻 ${beveragesSold.toLocaleString("en-US")}`}
					 )
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});

			inter.reply({ embeds: [embed]})
		}
	}
}