import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const revalidate = 0;

export const GET = async (request) => {
	// const url = new URL(request.url);
	// const searchParams = url.searchParams;
	// const search = searchParams.get("search") || "";
	// const regex = new RegExp(search, "i");

	try {
		await connectToDB();

		// const prompts = await Prompt.find({ prompt: { $regex: regex } }).populate("creator");
		const prompts = await Prompt.find().populate("creator");

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompts", { status: 500 });
	}
};
