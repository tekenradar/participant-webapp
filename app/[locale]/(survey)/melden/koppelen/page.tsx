import LoginForm from "@/app/[locale]/(default)/auth/login/_components/login-form";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function Page() {

    // check if temporary participant exists (cookie)
    // if not, go to landing page

    // logged in -> offer to select profile or create new profile

    // not logged in -> offer to login or register (/auth/login?redirectTo=/melden/koppelen )

    return (
        <div>
            return (
            <div className="bg-background">
                <AlertDialog open={true}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Please login to continue</AlertDialogTitle>
                            <AlertDialogDescription>
                                You need to login to continue. Please enter your email and password to continue.
                            </AlertDialogDescription>


                        </AlertDialogHeader>
                        <LoginForm
                            messages={{
                                email: {
                                    label: 'Email',
                                    placeholder: 'Email',
                                    description: 'Email',
                                    invalid: 'Email is invalid',
                                },
                                password: {
                                    label: 'Password',
                                    placeholder: 'Password',
                                    description: 'Password',
                                    invalid: 'Password is invalid',
                                },
                                submitBtn: 'Submit',
                                loginFailed: 'Login failed',
                                goToRegister: 'Go to register',
                                goToPasswordForgotten: 'Go to password forgotten',
                            }}

                        />
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            )
        </div>
    );
}