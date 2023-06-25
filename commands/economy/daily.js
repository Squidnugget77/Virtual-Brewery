const cooldowns = new Map();
const Discord = module.require("discord.js");

module.exports = {
	name: "daily",
	description: "Collect your daily reward!",

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

		const cooldownDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
		const cooldownKey = `${user_id}.dailyTime`;

		if (cooldowns.has(cooldownKey)) {
			const cooldownExpiration = cooldowns.get(cooldownKey);
			const timeLeft = cooldownExpiration - Date.now();
			const hoursLeft = Math.ceil(timeLeft / 3600000);

			const embed = new Discord.EmbedBuilder()
			.setColor('Red')
			.addFields([ { name: `You cannot claim this reward right now!`, value: `You must wait ${hoursLeft} more hours to claim your next reward!` } ])
			.setTimestamp()
			.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
			inter.reply({ embeds: [embed], ephemeral: true})

		}
		else {
			var money = 50000
			await economy.add(`${user_id}.balance`, money);

			const embed = new Discord.EmbedBuilder()
			.setColor('Green')
			.addFields([ { name: `You have claimed your reward!`, value: `You collected **$${money.toLocaleString("en-US")}** from your daily reward!` } ])
			.setTimestamp()
			.setFooter({ text: 'Virtual Brewery', iconURL: inter.member.avatarURL({ dynamic: true })});
			inter.reply({ embeds: [embed]})

			// Set the cooldown for the user
			const cooldownExpirationTime = Date.now() + cooldownDuration;
			cooldowns.set(cooldownKey, cooldownExpirationTime);
			setTimeout(() => cooldowns.delete(cooldownKey), cooldownDuration);
		}
	},
};
