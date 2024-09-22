"use client";

import Json from "@/ui/json-view";
import { usePaymongo } from "./hooks";
import { type CheckoutParams } from "@re-up/paymongo-fn/src/schema/zod.checkout";

export const MainContent = () => {
  const { handleCheckout, result, loading } = usePaymongo();

  const onCheckout = () => handleCheckout(payload);

  return (
    <div className="grid h-fit w-full grid-cols-2 gap-6">
      <div className="w-full">
        <div className="flex h-10 items-center justify-center space-x-4 border-b">
          <p>Payload</p>
          <button onClick={onCheckout} className="">
            checkout
          </button>
          <p>{loading ? "...loading" : null}</p>
        </div>

        <Json src={payload} />
      </div>
      <div className="w-full bg-slate-100">
        <div className="flex h-10 items-center justify-center border-b">
          Results
        </div>
        <Json src={result ?? {}} />
      </div>
    </div>
  );
};

export const payload = {
  data: {
    attributes: {
      cancel_url: "https://re-up.ph",
      description: "Oh My Skin! Skin Care",
      line_items: [
        {
          amount: 350000,
          currency: "PHP",
          description: "All Day Moisturizer",
          name: "Face & Body Gift Box",
          quantity: 5,
        },
        {
          amount: 2250000,
          currency: "PHP",
          description: "For soft, smooth",
          name: "Absolue",
          quantity: 3,
        },
        {
          amount: 125000,
          currency: "PHP",
          description: "A compact with two complementary blush.",
          name: "Best Skin Sephora",
          quantity: 2,
        },
        {
          amount: 270000,
          currency: "PHP",
          description: "bold colour, guaranteed to turn heads. Pressed Powder.",
          name: "Double-Take Creme",
          quantity: 2,
        },
        {
          amount: 105000,
          currency: "PHP",
          description: "Long-lasting matte lipstick in various shades.",
          name: "Matte Dickstick",
          quantity: 5,
        },
      ],
      payment_method_types: [
        "gcash",
        "card",
        "brankas_bdo",
        "dob_ubp",
        "brankas_landbank",
        "brankas_metrobank",
        "grab_pay",
        "paymaya",
        "dob",
      ],
      reference_number: "NX-X421XX3U",
      send_email_receipt: false,
      show_description: true,
      show_line_items: true,
      success_url: "https://re-up.ph",
      statement_descriptor: "GuestNX-X421XX3U",
    },
  },
} satisfies CheckoutParams;
