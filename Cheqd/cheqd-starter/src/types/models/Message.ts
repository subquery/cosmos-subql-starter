// Auto-generated , DO NOT EDIT
import { Entity, FunctionPropertyNames } from "@subql/types";
import assert from "assert";

export type MessageProps = Omit<
  Message,
  NonNullable<FunctionPropertyNames<Message>> | "_name"
>;

export class Message implements Entity {
  constructor(
    id: string,

    blockHeight: bigint,

    txHash: string,

    from: string,

    to: string,

    amount: string
  ) {
    this.id = id;

    this.blockHeight = blockHeight;

    this.txHash = txHash;

    this.from = from;

    this.to = to;

    this.amount = amount;
  }

  public id: string;

  public blockHeight: bigint;

  public txHash: string;

  public from: string;

  public to: string;

  public amount: string;

  get _name(): string {
    return "Message";
  }

  async save(): Promise<void> {
    let id = this.id;
    assert(id !== null, "Cannot save Message entity without an ID");
    await store.set("Message", id.toString(), this);
  }
  static async remove(id: string): Promise<void> {
    assert(id !== null, "Cannot remove Message entity without an ID");
    await store.remove("Message", id.toString());
  }

  static async get(id: string): Promise<Message | undefined> {
    assert(
      id !== null && id !== undefined,
      "Cannot get Message entity without an ID"
    );
    const record = await store.get("Message", id.toString());
    if (record) {
      return this.create(record as MessageProps);
    } else {
      return;
    }
  }

  static create(record: MessageProps): Message {
    assert(typeof record.id === "string", "id must be provided");
    let entity = new this(
      record.id,

      record.blockHeight,

      record.txHash,

      record.from,

      record.to,

      record.amount
    );
    Object.assign(entity, record);
    return entity;
  }
}
