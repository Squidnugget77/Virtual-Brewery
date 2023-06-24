const { ApplicationCommandOptionType } = require("discord.js")

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
				inter.reply("Your brewery has been deleted!")
			} catch (error) {
				await inter.reply("❌ | Error! Please contact Developers! 🧰")
			}
		}
		else {
			inter.reply("🍺 Make sure you type *confirmation* correctly!")
		}
	}
}