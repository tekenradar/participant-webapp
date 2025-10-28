"use client"

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TestTube2, Info, Package, Pencil } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import React, { useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import { triggerCustomEvent } from "@/actions/study/trigger-custom-event";

type KitType = "corona" | "nk_monster";

export interface OrderNewTestKitsProps {
    profileId: string;
    studyKey: string;
    contactInfo?: {
        fullName: string;
        address: {
            street: string;
            street2?: string;
            houseNumber: string;
            postalCode: string;
            city: string;
        };
    };

    messages: {
        selectTypeDropdown: {
            btnLabel: string;
            chooseTypeLabel: string;
            corona: {
                title: string;
                description: string;
            },
            nk_monster: {
                title: string;
                description: string;
            }
        },
        alertDialog: {
            title: string;
            titleCorona?: string;
            titleNkMonster?: string;
            description: string;
            cancelBtn: string;
            changeAddressBtn: string;
            orderBtn: string;
            noAddress: string;
        },
        toast: {
            success: string;
            error: string;
        }
    }
}

export const OrderNewTestKits: React.FC<OrderNewTestKitsProps> = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState<KitType | null>(null);

    const [isPending, startTransition] = useTransition();

    const changeAddrHref = {
        pathname: `/survey/${props.studyKey}/ChangeAddr`,
        query: {
            pid: props.profileId,
            ignoreImmediateSurveys: "true",
            redirectUrl: `/dashboard/persoonlijke-gegevens/${props.profileId}`,
        },
    } as const;

    const handleSelect = (type: KitType) => {
        setSelectedType(type);
        setDialogOpen(true);
    };

    const handleOrder = () => {
        if (!selectedType) return;

        startTransition(async () => {
            try {
                const resp = await triggerCustomEvent(props.profileId, props.studyKey, "order-test-kit", {
                    kitType: selectedType,
                });
                if (resp.error) {
                    throw new Error(resp.error);
                }
                toast.success(
                    props.messages.toast.success
                )
                console.debug("Test kit order successfully triggered")
                setDialogOpen(false);
            } catch (error) {
                const errMsg = error instanceof Error ? error.message : 'Onverwachte fout';
                console.error(errMsg)
                toast.error(props.messages.toast.error, {
                    description: errMsg,
                });
            }
        })


    };

    return (
        <div className="flex justify-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="default">
                        <span>
                            <Package className="size-5" />
                        </span>
                        <span>
                            {props.messages.selectTypeDropdown.btnLabel}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-80">
                    <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">{props.messages.selectTypeDropdown.chooseTypeLabel}</div>
                        <div className="grid gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-auto gap-3 p-3 text-left"
                                onClick={() => handleSelect("corona")}
                            >
                                <Info className="mt-0.5 size-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <div className="font-bold text-base leading-none">{props.messages.selectTypeDropdown.corona.title}</div>
                                    <p className="text-sm text-balance">{props.messages.selectTypeDropdown.corona.description}</p>
                                </div>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-auto gap-3 p-3 text-left"
                                onClick={() => handleSelect("nk_monster")}
                            >
                                <TestTube2 className="mt-0.5 size-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <div className="font-bold text-base leading-none">{props.messages.selectTypeDropdown.nk_monster.title}</div>
                                    <p className="text-sm text-balance">{props.messages.selectTypeDropdown.nk_monster.description}</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {selectedType === "corona"
                                ? (props.messages.alertDialog.titleCorona ?? props.messages.alertDialog.title)
                                : (props.messages.alertDialog.titleNkMonster ?? props.messages.alertDialog.title)}
                        </AlertDialogTitle>
                        <AlertDialogDescription>{props.messages.alertDialog.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <Separator />
                    <div className="space-y-2 text-sm text-muted-foreground flex justify-center my-12">
                        {props.contactInfo ? (
                            <div className="space-y-1 text-base">
                                <div className="text-foreground">{props.contactInfo.fullName}</div>
                                <div>
                                    {props.contactInfo.address.street} {props.contactInfo.address.houseNumber}
                                    {props.contactInfo.address.street2 && `-${props.contactInfo.address.street2}`}
                                </div>
                                <div>
                                    {props.contactInfo.address.postalCode} {props.contactInfo.address.city}
                                </div>
                            </div>
                        ) : (
                            <div>{props.messages.alertDialog.noAddress}</div>
                        )}
                    </div>
                    <Separator />
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel>{props.messages.alertDialog.cancelBtn}</AlertDialogCancel>
                        <div className="grow">

                        </div>
                        <Button asChild variant="outline" className="">
                            <Link href={changeAddrHref} prefetch={false}>
                                <Pencil className="size-4 mr-1" />
                                {props.messages.alertDialog.changeAddressBtn}
                            </Link>
                        </Button>
                        <LoadingButton onClick={handleOrder} className=""
                            isLoading={isPending}
                        >
                            {props.messages.alertDialog.orderBtn}
                        </LoadingButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}