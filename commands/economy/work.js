const cooldowns = new Map();
const Discord = module.require("discord.js");

module.exports = {
	name: "work",
	description: "Work a shift and collect your earnings!",

	async execute({ inter }) {
		const user_id = inter.member.id;

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

		const cooldownDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
		const cooldownKey = `${user_id}.workTime`;

		if (cooldowns.has(cooldownKey)) {
			const cooldownExpiration = cooldowns.get(cooldownKey);
			const timeLeft = cooldownExpiration - Date.now();
			const minutesLeft = Math.ceil(timeLeft / 60000);

			const embed = new Discord.EmbedBuilder()
			.setColor('Red')
			.addFields([ { name: `You cannot work right now!`, value: `You must wait ${minutesLeft} more minutes to work again!` } ])
			.setTimestamp()
			.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
			inter.reply({ embeds: [embed], ephemeral: true})
		}
		else {
			var money = 5000
			await economy.add(`${user_id}.balance`, money);
			inter.reply(`You sold 🍺 **1** beverage and made **$${money.toLocaleString("en-US")}**.`);

			// Set the cooldown for the user
			const cooldownExpirationTime = Date.now() + cooldownDuration;
			cooldowns.set(cooldownKey, cooldownExpirationTime);
			setTimeout(() => cooldowns.delete(cooldownKey), cooldownDuration);
		}
	},
};
