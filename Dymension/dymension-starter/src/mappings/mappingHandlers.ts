import { CosmosEvent } from "@subql/types-cosmos";
import { ExchangeRate, DailyAggregation } from "../types";

async function updateDailyAggregation(
  date: Date,
  priceUSD: number
): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await DailyAggregation.get(id);
  if (!aggregation) {
    aggregation = DailyAggregation.create({
      id,
      openPriceUSD: priceUSD,
      highPriceUSD: priceUSD,
      lowPriceUSD: priceUSD,
      closePriceUSD: priceUSD,
    });
  }

  if (priceUSD > aggregation.highPriceUSD) aggregation.highPriceUSD = priceUSD;
  if (priceUSD < aggregation.lowPriceUSD) aggregation.lowPriceUSD = priceUSD;
  aggregation.closePriceUSD = priceUSD;

  await aggregation.save();
}

export async function handleFundingRateChangeEvent(
  event: CosmosEvent
): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
    `New funding rate change at block ${event.block.block.header.height}`
  );

  const contractAddress: string | undefined = event.event.attributes.find(
    (a) => a.key === "_contract_address"
  )?.value;

  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let exchangeRate = await ExchangeRate.get(id);
    if (!exchangeRate) {
      exchangeRate = ExchangeRate.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }

    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        exchangeRate.timestamp = new Date(parseFloat(attr.value) * 1000);
      } else if (attr.key === "long-rate") {
        exchangeRate.longRate = parseFloat(attr.value);
      } else if (attr.key === "short-rate") {
        exchangeRate.shortRate = parseFloat(attr.value);
      } else if (attr.key === "contract_version") {
        exchangeRate.contractVersion = attr.value;
      } else if (attr.key === "contract_name") {
        exchangeRate.contractName = attr.value;
      }
    }
    await exchangeRate.save();

    if (exchangeRate.priceUSD) {
      await updateDailyAggregation(
        exchangeRate.timestamp,
        exchangeRate.priceUSD
      );
    }
  }
}

export async function handleSpotPriceEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
    `New spot price change at block ${event.block.block.header.height}`
  );
  const contractAddress: string | undefined = event.event.attributes.find(
    (a) => a.key === "_contract_address"
  )?.value;

  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let exchangeRate = await ExchangeRate.get(id);
    if (!exchangeRate) {
      exchangeRate = ExchangeRate.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }

    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        exchangeRate.timestamp = new Date(parseFloat(attr.value) * 1000);
      } else if (attr.key === "price-notional") {
        exchangeRate.priceNotional = parseFloat(attr.value);
      } else if (attr.key === "price-base") {
        exchangeRate.priceUSD = parseFloat(attr.value);
      } else if (attr.key === "contract_version") {
        exchangeRate.contractVersion = attr.value;
      } else if (attr.key === "contract_name") {
        exchangeRate.contractName = attr.value;
      }
    }
    await exchangeRate.save();

    if (exchangeRate.priceUSD) {
      await updateDailyAggregation(
        exchangeRate.timestamp,
        exchangeRate.priceUSD
      );
    }
  }
}
