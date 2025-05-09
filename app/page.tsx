import { Form } from "@/components/Form";
import { fetchTyped } from "@/utils/typedFetcher";

type MinimalApi = {
  USD: number;
};

export default async function Home() {
  const btcPrices = await fetchTyped<MinimalApi>(
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD",
    { cache: "no-store" }
  );

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:text-neutral-100">
      <main className="flex flex-col gap-2 w-full">
        <h1>
          BitCoin Price <div>As of {new Date().toLocaleDateString()}</div>
        </h1>
        <div className="flex gap-2 justify-center">
          <h2>USD</h2>
          <div className="text-xl font-bold">{btcPrices.USD}</div>
        </div>

        <Form bitcoinPrice={btcPrices.USD} />
      </main>
    </div>
  );
}
