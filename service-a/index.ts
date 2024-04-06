import { GrpcServer } from "https://deno.land/x/grpc_basic@0.4.7/server.ts";
import { type User, type UserRequest } from "../user.d.ts";

const port = 50051;
const server = new GrpcServer();

const protoPath = new URL("../user.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

server.addService<User>(protoFile, {
  async GetUser({ name }: UserRequest) {
    console.log(`got request with name: ${name}`);
    return { name };
  },
});

console.log(`Listening on ${port} port`);
for await (const conn of Deno.listen({ port })) {
  server.handle(conn);
}