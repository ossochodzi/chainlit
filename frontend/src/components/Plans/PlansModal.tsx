import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog';
import { Translator } from 'components/i18n';

import { PlanCard } from './PlanCard';
import { Plan } from './models';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlanId: string;
  plans: Plan[];
  onSelectPlan?: (planId: string) => void;
}

export const PlansModal = ({
  open,
  onOpenChange,
  currentPlanId,
  plans,
  onSelectPlan
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal container={window.cl_shadowRootElement}>
        <DialogContent className="w-screen max-w-none h-screen m-auto p-6 flex flex-col overflow-y-auto sm:rounded-none">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">
              <Translator path="plans.extendPlan" />
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 flex-1 max-w-6xl mx-auto">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              {plans.map((plan) => {
                return (
                  <PlanCard
                    plan={plan}
                    isCurrent={plan.id == currentPlanId}
                    onSelectPlan={onSelectPlan}
                  />
                );
              })}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
