const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const Discord = module.require("discord.js");

module.exports = {
	name: "hire",
	description: "Hire new staff!",
	options: [
		{
			name: 'id',
			description: 'ID of the person you want to hire!',
			type: ApplicationCommandOptionType.String,
			required: true,
		}
	],
	async execute({inter}) {
		
		var user_id = inter.member.id
		var id = inter.options.getString('id')

		var upgrades = ["brewers", "cellarOperator", "breweryManager", "servers", "tourGuide"]

		if (id === "brewers") {
			var balance = await economy.get(`${user_id}.balance`)
			var brewers = await economy.get(`${user_id}.brewers`)
			var cost = Math.floor(1500 * Math.pow(2.5, brewers - 1) + 0.05 * (brewers - 1))
			var upgrade = 20
		}
		else if (id === "cellarOperator") {
			var balance = await economy.get(`${user_id}.balance`)
			var cellar = await economy.get(`${user_id}.cellarOperator`)
			var cost = Math.floor(3500 * Math.pow(3.5, cellar - 1) + 0.1 * (cellar - 1))
			var upgrade = 50

		}
		else if (id === "tourGuide") {
			var balance = await economy.get(`${user_id}.balance`)
			var tour = await economy.get(`${user_id}.tourGuide`)
			var cost = Math.floor(6000 * Math.pow(4, tour - 1) + 0.35 * (tour - 1))
			var upgrade = 200
		}
		if (balance < cost) {
			const embed = new EmbedBuilder()
				.setColor('Red')
				.addFields([ { name: `❌ | You do not have enough money`, value: `You need **$${(cost-balance).toLocaleString("en-US")}** more` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed]})
		}
		else if (balance >= cost ) {
			await economy.sub(`${user_id}.balance`,cost)
			await economy.add(`${user_id}.${id}`,1)
			await economy.add(`${user_id}.hourlyIncome`,upgrade)
			const embed = new EmbedBuilder()
				.setColor('Green')
				.addFields([ { name: `✅ You bought **${id}** for **$${cost.toLocaleString("en-US")}**`, value: `Your new balance is: **$${(balance-cost).toLocaleString("en-US")}**` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed]})
		}

		else {
			const embed = new EmbedBuilder()
				.setColor('Red')
				.addFields([ { name: `❌ | ID not found!`, value: `Use a valid ID!` } ])
				.setTimestamp()
				.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
				inter.reply({ embeds: [embed], ephemeral: true})
		}
	}
}