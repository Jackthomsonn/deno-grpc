import { getClient } from "https://deno.land/x/grpc_basic@0.4.7/client.ts";
import { type User } from "../user.d.ts";

const protoPath = new URL("../user.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

const client = getClient<User>({
  port: 50051,
  root: protoFile,
  serviceName: "User",
});

const user = await client.GetUser({ name: "Jack" })

console.log(user)

client.close();