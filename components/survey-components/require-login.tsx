import Link from "next/link";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LockOpen, LogOutIcon, UserPlus } from "lucide-react";

interface RequireLoginProps {
    messages: {
        title: string;
        description: string;
        loginBtn: string;
        registerBtn: string;
        leaveBtn: string;
    }
    redirectUrl?: string;
    surveyKey: string;
}

const RequireLogin = (props: RequireLoginProps) => {
    const redirectAfterLogin = `/melden/?surveyKey=${props.surveyKey}`;
    return (
        <div>
            <AlertDialog open={true} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold">
                            {props.messages.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="bg-secondary text-secondary-foreground p-3 rounded-md">
                            {props.messages.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        <Button
                            className="w-full"
                            asChild
                        >
                            <Link href={`/auth/login?redirectTo=${redirectAfterLogin}`}>
                                <span>
                                    <LockOpen className="size-4" />
                                </span>
                                {props.messages.loginBtn}
                            </Link>
                        </Button>

                        <Button
                            className="w-full"
                            asChild
                        >
                            <Link href={`/auth/register?redirectTo=${redirectAfterLogin}`}>
                                <span>
                                    <UserPlus className="size-4" />
                                </span>
                                {props.messages.registerBtn}
                            </Link>
                        </Button>

                        <Separator />

                        <Button
                            variant="outline"
                            className="w-full"
                            asChild>
                            <Link href={props.redirectUrl || '/'}>
                                <span>
                                    <LogOutIcon className="size-4" />
                                </span>
                                {props.messages.leaveBtn}
                            </Link>
                        </Button>


                    </div>


                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default RequireLogin;