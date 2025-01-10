import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { getCars } from "@/app/data/data";

import CarCards from "./components/car-cards/car-cards";
import { Suspense } from "react";
export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  const user = session.user.id;
  const userId = user.id;

  const cars = await getCars(userId);
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CarCards cars={cars} />
      </Suspense>
    </div>
  );
}
