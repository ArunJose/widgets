"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export function AuthInfoBar(): React.ReactElement {
  const { user } = useUser();

  return (
    <header className="flex justify-end items-center p-4">
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
