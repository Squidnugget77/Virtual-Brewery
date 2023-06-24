const { ApplicationCommandOptionType } = require("discord.js")

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
				await economy.set(inter.member.id, {name: name, balance: 500, fermenters: 1, honey: 1, berries: 1, workTime: null, dailyTime: null, soldValue: 0})
				inter.reply(`Brewery, **${name}**, has been created!`)
			} catch (error) {
				inter.reply({content: "❌ | Error! Please contact Developers! 🧰", ephemeral: true})
			}	
		}
		else {
			inter.reply("🍺 You already have a brewery! If you want to delete your current data, type **/delete**.")
		}		
	}
}