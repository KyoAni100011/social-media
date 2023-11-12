import Pusher from "pusher";
import "dotenv/config";

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.CLUSTER,
  useTLS: true,
});

export default pusher;
