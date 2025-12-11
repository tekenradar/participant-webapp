import PageTitlebar from '@/components/page-titlebar';
import SurveyItemSkeleton from '@/components/survey-components/SurveyItemSkeleton';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import LoginForm from '../auth/login/_components/login-form';

export default function Page() {
    return (
        <div className="bg-background">
            <PageTitlebar>
                Loading survey...
            </PageTitlebar>
            <div className="max-w-[800px] mx-auto pt-6 pb-10 px-4 survey">
                <div className="space-y-4">
                    <SurveyItemSkeleton variant="display"
                        showBottomText={true}
                    />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={2} />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={6} />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={3} />
                    <SurveyItemSkeleton variant="singleChoice" numOptions={4} />
                </div>
            </div>
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
}