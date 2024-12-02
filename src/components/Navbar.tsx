"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export function Navbar(): React.ReactElement {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Widgets</h1>
        <SignedIn>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
