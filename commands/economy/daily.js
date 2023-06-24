const cooldowns = new Map();

module.exports = {
	name: "daily",
	description: "Collect your daily reward!",

	async execute({ inter }) {
		const user_id = inter.member.id;

		if (await economy.get(user_id) == null) {
			inter.reply({ content: "Make a pasta empire with **/create**", ephemeral: true });
			return;
		}

		const cooldownDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
		const cooldownKey = `${user_id}.dailyTime`;

		if (cooldowns.has(cooldownKey)) {
			const cooldownExpiration = cooldowns.get(cooldownKey);
			const timeLeft = cooldownExpiration - Date.now();
			const hoursLeft = Math.ceil(timeLeft / 3600000);

			inter.reply(`Please wait ${hoursLeft} more hours before using this command again.`);
			return;
		}

		var money = 50000
		await economy.add(`${user_id}.balance`, money);
		inter.reply(`You collected **$${money.toLocaleString("en-US")}** from your daily reward!`);

		// Set the cooldown for the user
		const cooldownExpirationTime = Date.now() + cooldownDuration;
		cooldowns.set(cooldownKey, cooldownExpirationTime);
		setTimeout(() => cooldowns.delete(cooldownKey), cooldownDuration);
	},
};
