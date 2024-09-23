// import { CheckoutParamsSchema } from "@re-up/paymongo-fn/src/schema/zod.checkout";
// import { createTRPCRouter, procedure } from "../trpc";
// import { env } from "@/env";
// import { Paymongo } from "@re-up/paymongo-fn";

// const paymongo = Paymongo(env.PAYMONGO_SK);

// /** Async/Await tRPC */
// interface RParams<T> {
//   input: T;
// }

// export const asyncR =
//   <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
//   async ({ input }: RParams<TParams>) =>
//     await fn(input);

// const checkoutProcedure = procedure.input(CheckoutParamsSchema);
// export const payRouter = createTRPCRouter({
//   createCheckout: checkoutProcedure.mutation(asyncR(paymongo.checkout.create)),
// });
