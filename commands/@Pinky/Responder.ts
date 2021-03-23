import { Client } from "discord.js";

export class Responder {
	public responses: string[] = [
		"?",
		"who are you",
		"why did you ping me",
		"what do you need",
		"did you know shane plane is a thing",
		"There's a lot of Georgia in Chick-Fil-A - Brooks",
		"Do you have anything non dairy - Shane",
		"I want to mate. - Calvin (apparently a 'Dr.Who' reference.)",
		"And that's why i'm NEVER joining the pink team - Bradley",
		"you just shot the hoe - Calvin",
		"Hello big niggie - Laso Sam Halo 3 election",
		"It's never too late to go back to bed.",
		"If you torture data long enough, it will confess",
		"If your car is still together by the end of the race it is too heavy",
		"If you see something which doesn't meet our standard of quality, and do nothing... you've just set the new standard",
		"What might you do to accomplish your 10-year goals in the next 6 months, if you had a gun against your head?",
		"I am Hawaii - Shane",
	];

	constructor(cli: Client) {
		cli.on("message", (message) => {
			const author = message.author.username;
			const members = message.mentions.members?.array()!;

			console.log(author);

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
			Math.random() * (this.responses.length - 0) + Math.random()
		);

		return this.responses[index];
	}
}
