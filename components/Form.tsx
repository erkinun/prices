"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "./Button";

type FormType = {
  sellPoint: number;
  buyPoint: number;
  sellAmount: number;
  buyAmount: number;
  sellPosition?: number;
  buyPosition?: number;
};

type FormProps = {
  bitcoinPrice: number;
};

export function Form({ bitcoinPrice }: FormProps) {
  function clearLocalStorage() {
    localStorage.removeItem("sellPoint");
    localStorage.removeItem("buyPoint");
    localStorage.removeItem("sellAmount");
    localStorage.removeItem("buyAmount");
    localStorage.removeItem("sellPosition");
    localStorage.removeItem("buyPosition");
  }

  const form = useForm<FormType>({
    defaultValues: {
      sellPoint: localStorage.getItem("sellPoint")
        ? Number.parseInt(localStorage.getItem("sellPoint") ?? "0")
        : 0,
      buyPoint: localStorage.getItem("buyPoint")
        ? Number.parseInt(localStorage.getItem("buyPoint") ?? "0")
        : 0,
      sellAmount: localStorage.getItem("sellAmount")
        ? Number.parseInt(localStorage.getItem("sellAmount") ?? "0")
        : 0,
      buyAmount: localStorage.getItem("buyAmount")
        ? Number.parseInt(localStorage.getItem("buyAmount") ?? "0")
        : 0,
      sellPosition: undefined,
      buyPosition: undefined,
    },
    onSubmit: async ({ value }) => {
      bitcoinPrice && calculatePositions(value);
    },
  });

  // TODO save the buy and sell positions in the local storage
  function calculatePositions({
    sellPoint,
    buyPoint,
    sellAmount,
    buyAmount,
  }: FormType) {
    if (sellPoint !== undefined && sellAmount !== undefined) {
      localStorage.setItem("sellPoint", String(sellPoint));
      localStorage.setItem("sellAmount", String(sellAmount));

      const itemCount = sellAmount / sellPoint;
      const currentAmountIfYouHaventSold = Math.round(itemCount * bitcoinPrice);
      form.setFieldValue(
        "sellPosition",
        sellAmount - currentAmountIfYouHaventSold
      );

      console.log({
        itemCount,
        currentAmountIfYouHaventSold,
        sellPosition: sellAmount - currentAmountIfYouHaventSold,
      });

      // TODO do the buy position calculation
    }
    if (buyPoint !== undefined && buyAmount !== undefined) {
      localStorage.setItem("buyPoint", String(buyPoint));
      localStorage.setItem("buyAmount", String(buyAmount));
      console.log({ buyPoint, buyAmount });

      const itemCount = buyAmount / buyPoint;
      const currentAmountIfYouHaventSold = Math.round(itemCount * bitcoinPrice);
      form.setFieldValue(
        "buyPosition",
        currentAmountIfYouHaventSold - buyAmount
      );
      console.log({
        itemCount,
        currentAmountIfYouHaventSold,
        buyPosition: currentAmountIfYouHaventSold - buyAmount,
      });
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-2 "
      >
        {
          // TODO make this a component, later
        }
        <form.Field
          name="sellPoint"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Where did you sell</label>
              <input
                className="text-black dark:bg-neutral-800 dark:text-neutral-100"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        />
        <form.Field
          name="sellAmount"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>How much</label>
              <input
                className="text-black"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        />
        <form.Field
          name="buyPoint"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Where did you buy</label>
              <input
                className="text-black"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        />
        <form.Field
          name="buyAmount"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>How much</label>
              <input
                className="text-black"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        />
        <form.Field
          name="sellPosition"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Sell Position</label>
              <input
                className="text-black"
                name={field.name}
                value={field.state.value}
                readOnly
              />
            </div>
          )}
        />
        <form.Field
          name="buyPosition"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name}>Buy Position</label>
              <input
                className="text-black"
                name={field.name}
                value={field.state.value}
                readOnly
              />
            </div>
          )}
        />
        <Button>Calculate Positions</Button>
      </form>
      <Button onClick={clearLocalStorage}>Clear positions</Button>
    </>
  );
}
