import { SignIn } from "@clerk/nextjs";

export default function SignInView() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn routing="hash" />
    </div>
  );
}
