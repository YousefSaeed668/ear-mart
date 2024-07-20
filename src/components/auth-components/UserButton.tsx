import { LogOut, Package2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full px-2.5 py-1 w-fit" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="bg-secondaryColor text-white py-3"
      >
        <DropdownMenuItem className=" flex items-center gap-2">
          <User />
          Manage My Account
        </DropdownMenuItem>
        <DropdownMenuItem className=" flex items-center gap-3">
          <Package2 />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" flex items-center gap-3"
          onClick={() => signOut()}
        >
          <LogOut />
          LogOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
