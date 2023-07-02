export type Platform =
    | "Twitch"
    | "YouTube"
    | "Kick"
    | "Rumble"
    | "TikTok"

export interface GetOneStreamerFullData {
    id: string,
    username: string,
    platform: Platform,
    description: string,
    upVotes: number,
    downVotes: number,
    imageFn: string,
}

export type OneStreamerData = Omit<GetOneStreamerFullData, "imageFn">

export type GetStreamersData = Omit<GetOneStreamerFullData, "description" | "imageFn">

export type UpdatedStreamerData = Pick<GetOneStreamerFullData, "id" | "upVotes" | "downVotes">