"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "./Button";
import { FormInput } from "./FormInput";

type FormType = {
  sellPoint: number;
  buyPoint: number;
  sellAmount: number;
  buyAmount: number;
  sellPosition: number;
  buyPosition: number;
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
      sellPosition: 0,
      buyPosition: 0,
    },
    onSubmit: async ({ value }) => {
      bitcoinPrice && calculatePositions(value);
    },
  });

  function calculatePositions({
    sellPoint,
    buyPoint,
    sellAmount,
    buyAmount,
  }: FormType) {
    if (sellPoint !== 0 && sellAmount !== 0) {
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
    if (buyPoint !== 0 && buyAmount !== 0) {
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
        className="flex flex-col md:flex-row gap-2"
      >
        <div>
          <form.Field
            name="sellPoint"
            children={(field) => (
              <FormInput field={field} labelText="Where did you sell" />
            )}
          />
          <form.Field
            name="sellAmount"
            children={(field) => (
              <FormInput field={field} labelText="How much" />
            )}
          />
          <form.Field
            name="sellPosition"
            children={(field) => (
              <FormInput field={field} labelText="Sell Position" />
            )}
          />
        </div>

        <div>
          <form.Field
            name="buyPoint"
            children={(field) => (
              <FormInput field={field} labelText="Where did you buy" />
            )}
          />
          <form.Field
            name="buyAmount"
            children={(field) => (
              <FormInput field={field} labelText="How much" />
            )}
          />

          <form.Field
            name="buyPosition"
            children={(field) => (
              <FormInput field={field} labelText="Buy Position" />
            )}
          />
        </div>

        <Button>Calculate Positions</Button>
      </form>
      <Button onClick={clearLocalStorage}>Clear positions</Button>
    </>
  );
}
