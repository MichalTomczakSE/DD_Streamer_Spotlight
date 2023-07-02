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
}

export type GetStreamersData = Omit<GetOneStreamerFullData, "description">

export type UpdatedStreamerData = Pick<GetOneStreamerFullData, "id" | "upVotes" | "downVotes">