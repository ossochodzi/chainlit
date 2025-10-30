import { useContext } from 'react';

import { SubscriptionContext } from '@chainlit/react-client';

import Icon from '@/components/Icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useTranslation } from 'components/i18n/Translator';

import { Buyable, Plan } from './models';

interface Props {
  isCurrent: boolean;
  plan: Plan;
  onSelectPlan?: (planId: string) => void;
}

function sprintf(pattern: string, params: Record<string, string | number>) {
  return pattern.replace(
    /{{(.*?)}}/g,
    (_, key) => params[key]?.toString() ?? ''
  );
}

function ExpandPlanButton({ isCurrent, plan, onSelectPlan }: Props) {
  const apiClient = useContext(SubscriptionContext);

  const disabled = isCurrent || plan.buyable != Buyable.Yes;
  const getContent = function () {
    const { t } = useTranslation();
    if (isCurrent) return t('plans.current');

    switch (plan.buyable) {
      case Buyable.Yes:
        return sprintf(t('plans.buyFor'), { price: plan.price });
      case Buyable.ComingSoon:
        return t('plans.availableSoon');
      case Buyable.ContactSales:
        return t('plans.contactSales');
      default:
        return '';
    }
  };

  const createCheckoutSession = async (planId: string) => {
    if (!apiClient) return;

    try {
      const { url } = await apiClient.createCheckoutSession(planId);
      window.location.href = url;
    } catch (err) {
      //setError(err?.message || "Cannot process");
      console.log(err);
    }
  };

  const contactSales = async () => {
    console.log('TBD: Contact sales');
  };

  const onClick = async () => {
    if (plan.buyable == Buyable.Yes) await createCheckoutSession(plan.id);
    else if (plan.buyable == Buyable.ContactSales) await contactSales();

    onSelectPlan?.(plan.id);
  };

  return (
    <Button size="sm" onClick={onClick} className="w-full" disabled={disabled}>
      <span className="text-lg font-semibold">{getContent()}</span>
    </Button>
  );
}

export function PlanCard({ isCurrent, plan, onSelectPlan }: Props) {
  return (
    <Card
      key={plan.id}
      className={`border ${isCurrent ? 'border-blue-500' : 'border-gray-200'} 
        hover:shadow-lg 
        transition-shadow 
        duration-200 
        w-full 
        md:max-w-96
        h-full
        md:min-h-[30rem]`}
    >
      <CardHeader className="w-full">
        <CardTitle className="flex items-center justify-between">
          {plan.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 flex items-center justify-between w-full">
        <CardDescription className="w-full">
          <div className="w-full h-9 mb-6">
            <ExpandPlanButton
              isCurrent={isCurrent}
              plan={plan}
              onSelectPlan={onSelectPlan}
            />
          </div>
          <ul className="flex flex-col gap-5 mb-2">
            {plan.features.map((feature, index) => (
              <li key={index} itemType="highlight">
                <div className="text-l flex justify-start gap-3.5">
                  <Icon name="check" />
                  <span className="">{feature}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
