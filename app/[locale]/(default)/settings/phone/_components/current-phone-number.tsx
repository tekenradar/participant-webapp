import LinkButton from '@/components/buttons/link-button';
import { ContactInfo } from '@/lib/server/contact-info';
import { getUser } from '@/lib/server/data-fetching/user';
import { AlertTriangle, CheckCheck } from 'lucide-react';
import React from 'react';

interface CurrentPhoneNumberProps {
    messages: {
        label: string;
        emptyPhoneNumber: string;
        verifiedPhoneNumber: string;
        unverifiedPhoneNumber: string;
        openVerificationPage: string;
    }
}


const Verified: React.FC<{
    messages: {
        label: string;
    }
}> = (props) => {
    return (
        <p className='flex items-center gap-2 text-sm'>
            <span>
                <CheckCheck className='size-5 text-primary' />
            </span>
            {props.messages.label}
        </p>
    );
}

const Unverified: React.FC<{
    messages: {
        label: string;
        link: string;
    }
}> = (props) => {
    return (
        <p className='flex items-center gap-2 text-sm'>
            <span>
                <AlertTriangle className='size-5 text-destructive' />
            </span>
            {props.messages.label}
            <LinkButton
                href={'/settings/phone/verify'}
            >
                {props.messages.link}
            </LinkButton>
        </p>
    );
}

const CurrentPhoneNumber: React.FC<CurrentPhoneNumberProps> = async (props) => {

    const resp = await getUser();
    if (!resp || resp.error || !resp.user) {
        console.error(resp.error);
        return null;
    }
    const contactInfos = resp.user.contactInfos;

    const phoneContactInfo = contactInfos.find((contactInfo: ContactInfo) => contactInfo.type === 'phone');

    const phoneNumber = phoneContactInfo?.phone;
    const hasPhoneNumber = phoneNumber !== undefined && phoneNumber.length > 0;
    const verified = phoneContactInfo?.confirmedAt !== undefined && phoneContactInfo?.confirmedAt > 0;

    const showVerificationStatus = () => {
        if (!hasPhoneNumber) {
            return null;
        }
        if (verified) {
            return <Verified
                messages={{
                    label: props.messages.verifiedPhoneNumber
                }}
            />
        }
        return <Unverified
            messages={{
                label: props.messages.unverifiedPhoneNumber,
                link: props.messages.openVerificationPage,
            }}
        />
    }


    return (
        <div className='space-y-1.5'>
            <p className='text-sm font-medium leading-none'>
                {props.messages.label}
            </p>
            <p className='p-2 rounded border border-border text-accent bg-muted'>
                {!hasPhoneNumber ? props.messages.emptyPhoneNumber : phoneNumber}
            </p>
            {showVerificationStatus()}
        </div>
    );
};

export default CurrentPhoneNumber;
