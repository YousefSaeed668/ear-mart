import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center flex-col">
      <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] relative">
        <Image src="/signup.svg" fill alt="sign-up" />
      </div>
      <div className="flex items-center gap-12 mt-20 flex-wrap justify-center">
        <Button asChild>
          <Link href="/register/seller">CREATE ACCOUNT AS SELLER</Link>
        </Button>
        <Button asChild>
          <Link href="/register/consumer">CREATE ACCOUNT AS CONSUMER</Link>
        </Button>
      </div>
    </div>
  );
}
