import AgoraRTC from "agora-rtc-sdk-ng";

export const AGORA_APP_ID = "3847c45151fc4bb5a629a5769924a445";
export const AGORA_CHANNEL = "main-webinar-room";
export const AGORA_TOKEN =
  "007eJxTYMjuPXXH7uGGNqf1D1dH+tjrbX6/4ffuGe4H18rke0y+w1+pwGBsYWKepGJqaGqYlmySlGSaaGZkmWhqbmZpaWSSaGJiKuS/KashkJFBeNkvZkYGCATxBRlyEzPzdMtTkzLzEot0i/LzcxkYAKXXJXw=";

// "live" mode = host publishes, audience only watches (cheaper + right for webinars)
export const createAgoraClient = () =>
  AgoraRTC.createClient({ mode: "live", codec: "vp8" });

export { AgoraRTC };
