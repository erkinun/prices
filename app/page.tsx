import { Button } from "@/components/Button";
import { fetchTyped } from "@/utils/typedFetcher";

type Price = {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
};

type BTCPrice = {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  bpi: {
    EUR: Price;
    USD: Price;
    GBP: Price;
  };
  disclaimer: string;
};

export default async function Home() {
  const btcPrices = await fetchTyped<BTCPrice>(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );

  function calculateSellPosition() {}

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1>BitCoin Price</h1>
        <div className="flex gap-2">
          <h2>{btcPrices.bpi.USD.rate}</h2>
          <div>{btcPrices.bpi.USD.code}</div>
        </div>
        <div>As of: {btcPrices.time.updateduk}</div>
        <div className="flex flex-col gap-2 border border-white rounded p-2">
          <label htmlFor="sell">Where did you sell</label>
          <input name="sell" type="number" className="text-black" />
          <label htmlFor="sellAmount">How much</label>
          <input name="sellAmount" type="number" className="text-black" />
          <Button>Calculate Position</Button>
        </div>
        <div className="flex flex-col border border-white rounded p-2">
          <label htmlFor="buy">Where did you buy</label>
          <input name="buy" type="number" className="text-black" />
          <label htmlFor="buyAmount">How much</label>
          <input name="buyAmount" type="number" className="text-black" />
        </div>
      </main>
      <Button>Some button</Button>
    </div>
  );
}
