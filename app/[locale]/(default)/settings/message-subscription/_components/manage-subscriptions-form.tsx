'use client';
import { manageSubscription } from '@/actions/user/manage-subscription';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

interface ManageSubscriptionsFormProps {
    subscriptions: {
        subscribedToNewsletter: boolean;
        subscribedToWeekly: boolean;
    }
    messages: {
        weeklySwitchLabel: string;
        newsletterSwitchLabel: string;
        success: string;
        error: string;
    }
}

const ManageSubscriptionsForm: React.FC<ManageSubscriptionsFormProps> = (props) => {
    const [isSubscribed, setIsSubscribed] = React.useState(props.subscriptions.subscribedToNewsletter);
    const [isPending, startTransition] = React.useTransition();

    useEffect(() => {
        if (isSubscribed !== props.subscriptions.subscribedToNewsletter) {
            onSave();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubscribed]);


    const onSave = (toggleWeeklySubscription?: boolean) => {
        startTransition(async () => {
            const resp = await manageSubscription(isSubscribed, toggleWeeklySubscription);
            if (!resp || resp.error) {
                console.error(resp.error)
                toast.error(props.messages.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                setIsSubscribed(props.subscriptions.subscribedToNewsletter);
                return;
            }
            toast.success(props.messages.success);
        });
    }

    return (
        <div className='space-y-6'>
            <Label className='flex items-center gap-2'>
                <Switch
                    checked={isSubscribed}
                    onCheckedChange={(checked) => {
                        setIsSubscribed(checked);
                    }}
                    disabled={isPending}
                />
                <span className='ml-2'>
                    {props.messages.newsletterSwitchLabel}
                </span>
            </Label>
            <Label className='flex items-center gap-2'>
                <Switch
                    checked={props.subscriptions.subscribedToWeekly}
                    onCheckedChange={(checked) => {
                        if (checked !== props.subscriptions.subscribedToWeekly) {
                            onSave(true);
                        }
                    }}
                    disabled={isPending}
                />
                <span className='ml-2'>
                    {props.messages.weeklySwitchLabel}
                </span>
            </Label>
        </div>
    );
};

export default ManageSubscriptionsForm;
