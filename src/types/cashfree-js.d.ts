/* eslint-disable @typescript-eslint/no-explicit-any */
// cashfree-js.d.ts
declare module "@cashfreepayments/cashfree-js" {
    interface CheckoutOptions {
        paymentSessionId: string;
        redirectTarget: "_self" | "_blank";
    }

    export function load(options: { mode: "production" | "test" }): Promise<any>;
    export function checkout(options: CheckoutOptions): void;
}
