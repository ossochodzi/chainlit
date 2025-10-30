import capitalize from 'lodash/capitalize';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@chainlit/react-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { PlansSelector } from 'components/Plans';
import { Translator } from 'components/i18n';

export default function UserNav() {
  const { user, logout } = useAuth();
  const [plansModalOpen, setPlansModalOpen] = useState(false);

  if (!user) return null;
  const displayName = user?.display_name || user?.identifier;
  const userPlan = user?.plan?.name || 'Free';

  return (
    <>
      <div className="relative">
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="gap-2">
              <Button id="user-nav-button" variant="ghost" className="h-12 ">
                <Avatar className="h-8 w-8  rounded-full">
                  <AvatarImage src={user?.metadata.image} alt="user image" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {capitalize(displayName[0])}
                  </AvatarFallback>
                </Avatar>
                {userPlan}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-26" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {displayName}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout(true)}>
                <Translator path="navigation.user.menu.logout" />
                <LogOut className="ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            id="user-nav-plan-button"
            variant="outline"
            className=" h-8"
            onClick={() => setPlansModalOpen(true)}
          >
            <Translator path="navigation.user.action.extend" />
          </Button>
        </div>
      </div>
      <PlansSelector open={plansModalOpen} onOpenChange={setPlansModalOpen} />
    </>
  );
}
