import { Client } from "discord.js";

export class Responder {
	public responses: string[] = [
		"?",
		"I like how this was from 2012",
		"https://cdn.discordapp.com/attachments/641649652965310476/820866606292402176/image0.jpg",
		"who are you",
		"why did you ping me",
		"what do you need",
		"did you know shane plane is a thing",
		"https://tenor.com/view/anakin-liar-star-wars-lying-gif-8634649",
		"There's a lot of Georgia in Chick-Fil-A",
		"Do you have anything non dairy",
		"I want to mate. - Calvin (apparently a 'Dr.Who' reference.)",
		"And that's why i'm NEVER joining the pink team - Bradley",
		"you just shot the hoe",
		"https://tenor.com/view/rick-astley-rick-roll-dancing-dance-moves-gif-14097983",
		"It's never too late to go back to bed.",
		"If you see something which doesn't meet our standard of quality, and do nothing... you've just set the new standard",
		"What might you do to accomplish your 10-year goals in the next 6 months, if you had a gun against your head?",
		"I am Hawaii",
		"Amogus?",
		"no u",
		"holy frick shane did naughty to catvin?",
		"SHANE IS ON A FURY ROAD!",
		"Silence is consent",
		"shane's identity crisis is real",
		"Look I got work tomorrow",
		"Listen up here buddy bucko buckaroo you are so completely incorrect it is almost foolish just to fathom just how wrong you are",
		"A doge is a doggo, but a doggo is not a doge!",
	];

	constructor(cli: Client) {
		cli.on("message", (message) => {
			const members = message.mentions.members?.array()!;

			if (members == null) return;

			for (var i = 0; i != members.length; i++) {
				const member = members[i];

				if (
					member.user.username == "Pinky" ||
					member.user.username == "Pinky Dev"
				) {
					return message.reply(this.SelectReponse());
				}
			}
		});
	}

	public SelectReponse(): string {
		const index: number = Math.floor(
			Math.random() * (this.responses.length - 3) + Math.random()
		);

		return this.responses[index];
	}
}
