export type Platform =
    | "Twitch"
    | "YouTube"
    | "Kick"
    | "Rumble"
    | "TikTok"

export interface GetStreamerData {
    id: string,
    username: string,
    platform: Platform,
    description: string,
    upVotes: number,
    downVotes: number,
}

export type GetStreamersData = Omit<GetStreamerData, "description">

export type UpdatedStreamerData = Pick<GetStreamerData, "id" | "upVotes" | "downVotes">