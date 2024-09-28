import * as React from 'react'

export default function PricingComponent() {
  return (
        <stripe-pricing-table
          pricing-table-id="prctbl_1Q3hj0BxCPUleSl32bm1e6X3"
          publishable-key="pk_test_9oVugDwAkRMk7uNot8hwY0FM"
        >
        </stripe-pricing-table>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
