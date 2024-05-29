import Image from "next/image";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
export default function Signin() {
    return (
        <>
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
                <div className="h-full flex flex-col items-center justify-center px-4">
                    <div className="text-center space-y-4">
                        <h1 className="font-bold text-3xl text-[#2e2A47]">Welcome Back</h1>
                        <p className="text-base text-[#7E8CA0]">Login or Create an account to access the dashboard</p>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <ClerkLoaded>
                            <SignIn path="/sign-in" />
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="animate-spin text-muted-forground"></Loader2>
                        </ClerkLoading>
                    </div>
                </div>
                <div className="h-full bg-blue-400  hidden lg:flex items-center justify-center">
                    <Image src='/logo2.svg' alt="Logo" height={200} width={200}></Image>
                </div>
            </div>
        </>
    );
}
