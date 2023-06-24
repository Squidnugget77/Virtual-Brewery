const cooldowns = new Map();

module.exports = {
	name: "work",
	description: "Work a shift and collect your earnings!",

	async execute({ inter }) {
		const user_id = inter.member.id;

		if (await economy.get(user_id) == null) {
			inter.reply({ content: "Make a pasta empire with **/create**", ephemeral: true });
			return;
		}

		const cooldownDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
		const cooldownKey = `${user_id}.workTime`;

		if (cooldowns.has(cooldownKey)) {
			const cooldownExpiration = cooldowns.get(cooldownKey);
			const timeLeft = cooldownExpiration - Date.now();
			const minutesLeft = Math.ceil(timeLeft / 60000);

			inter.reply(`Please wait ${minutesLeft} more minutes before using this command again.`);
			return;
		}

		var money = 5000
		await economy.add(`${user_id}.balance`, money);
		inter.reply(`You sold 🍝 **${soldPasta}** bowls of pasta and made **$${money.toLocaleString("en-US")}**.`);

		// Set the cooldown for the user
		const cooldownExpirationTime = Date.now() + cooldownDuration;
		cooldowns.set(cooldownKey, cooldownExpirationTime);
		setTimeout(() => cooldowns.delete(cooldownKey), cooldownDuration);
	},
};
