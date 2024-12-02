"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export function Navbar(): React.ReactElement {
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center p-4 mx-4 border-b">
      <h1 className="text-3xl font-bold">Widgets</h1>
      <SignedIn>
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
