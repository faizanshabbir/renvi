import ClerkLayout from '@/components/clerkylayout';
import { DashboardComponent } from "@/components/dashboard";
import ClerkDebugComponent from '@/components/clerkdebug'

export default function DashboardPage() {
  return (
    <ClerkLayout>
        <div>
            <main>
                <DashboardComponent />
            </main>
        </div>
        {/* <div>
            <ClerkDebugComponent />
        </div> */}
    </ClerkLayout>
  );
}
