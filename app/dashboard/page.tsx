import ClerkLayout from '@/components/clerkylayout';
import { DashboardComponent } from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <ClerkLayout>
        <div>
            <main>
                <DashboardComponent />
            </main>
        </div>
    </ClerkLayout>
    
  );
}
