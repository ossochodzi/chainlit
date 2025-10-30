import { useContext, useEffect, useState } from 'react';

import { SubscriptionContext, useAuth } from '@chainlit/react-client';

import { PlansModal } from './PlansModal';
import { Buyable, Plan } from './models';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plans_definitions: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    headline: '',
    price: 'Free',
    buyable: Buyable.No,
    features: [
      '1 report credit / month',
      '20 chat messages / day (cap)',
      'Try the full reasoning system',
      'No download of the rapport'
    ]
  },
  {
    id: '8c0f9a91-1d3d-4e7d-8c4a-f6a01b7f2f5a',
    name: 'Standard',
    headline: '',
    price: '€69/month',
    buyable: Buyable.ComingSoon,
    features: [
      '3 report credits / month',
      '50 chat messages / day (cap)',
      'Downloadable report',
      'No credit rollover'
    ]
  },
  {
    id: '3b72a0ec-fb94-42ab-9351-75db2cbe1b83',
    name: 'Plus',
    headline: '',
    price: '€109/month',
    buyable: Buyable.ComingSoon,
    features: [
      '5 report credits / month',
      '100 chat messages / day (cap)',
      'Downloadable report',
      '1-month credit rollover',
      'Priority queue & email support'
    ]
  },
  {
    id: '97e5de53-fab7-46f0-9b2b-4edb7c23e3a7',
    name: 'Pro',
    headline: '',
    price: '€399/month',
    buyable: Buyable.ComingSoon,
    features: [
      '20 report credits / month',
      '500 chat messages / day (cap)',
      'Downloadable report',
      '1-month credit rollover',
      'Priority queue & email support'
    ]
  },
  {
    id: '2c1f4e4d-8b9b-4bda-b8b1-8e2fd7f65f79',
    name: 'Single Report',
    headline: '',
    price: '€29',
    buyable: Buyable.ComingSoon,
    features: [
      'One report credit Ideal for one-off decisions (plans save more)'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    headline: '',
    price: 'Contact sales',
    buyable: Buyable.ContactSales,
    features: ['Custom credit packs & message caps (contracted)']
  }
];

export const PlansSelector = ({ open, onOpenChange }: Props) => {
  const { user } = useAuth();
  const currentPlanId = user?.plan?.id || 'free';

  const apiClient = useContext(SubscriptionContext);

  const [plans, setPlans] = useState<Plan[]>([]);
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //if (!apiClient) return;

    const fetchPlans = async () => {
      // fetch from backend in future
      setPlans(plans_definitions);
    };

    fetchPlans();
  }, [apiClient]);

  return (
    <SubscriptionContext.Provider value={apiClient}>
      <PlansModal
        open={open}
        onOpenChange={onOpenChange}
        plans={plans}
        currentPlanId={currentPlanId}
        onSelectPlan={(planId) => {
          //handleSelectPlan(planId);
          // setCurrentPlanId(planId);
          console.log('selected plan ' + planId);
          onOpenChange(false);
        }}
      />
      {/* {error && (
        <AlertDialog>
          <AlertDialogTitle>Internal error</AlertDialogTitle>
          <AlertDialogDescription>{error}</AlertDialogDescription>
        </AlertDialog>
      )} */}
    </SubscriptionContext.Provider>
  );
};
