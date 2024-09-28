import ClerkLayout from "@/components/clerkylayout";
import PricingComponent from "@/components/pricing"

export default function Home() {
  return (
    <ClerkLayout>
    <div>
      <main>
        <div>
          Renvi Home
        </div>
        <div>
          <PricingComponent/>
        </div>
      </main>
    </div>
    </ClerkLayout>
  );
}