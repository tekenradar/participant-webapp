import Filepicker from "@/components/filepicker";
import LoadingButton from "@/components/loading-button";
import { CommonResponseComponentProps } from "@/components/survey-renderer/SurveySingleItemView/utils";
import { CloudUploadIcon, Trash2Icon } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteFile } from "@/lib/server/data-fetching/participant-files";
import { toast } from "sonner";

export interface EmFotoUploadMessages {
    label: string;
    upload: string;
    drag: string;
    uploadBtn: string;
    deleteBtn: string;
    deleteDialog: {
        title: string;
        description: string;
        delete: string;
        keepCurrentSelection: string;
    };
    successMessage: string;
    errorMessage: string;
}

interface EmFotoUploadProps extends CommonResponseComponentProps {
    studyKey: string;
    profileID: string;
    messages?: EmFotoUploadMessages;
}

const EmFotoUpload: React.FC<EmFotoUploadProps> = (props) => {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadId, setUploadId] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (currentFile) {
            const url = URL.createObjectURL(currentFile);
            setPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setPreviewUrl(null);
        }
    }, [currentFile]);

    const hasFileUploaded = uploadId !== null;

    const handleDelete = () => {
        startTransition(async () => {
            if (!uploadId) {
                toast.error('No file to delete');
                return;
            }
            const resp = await deleteFile(props.studyKey, props.profileID, uploadId);
            if (!resp || resp.error) {
                toast.error(resp.error || 'Failed to delete file');
                return;
            }
            toast.success('File deleted successfully');
            setCurrentFile(null);
            setPreviewUrl(null);
            setIsDeleteDialogOpen(false);
            setUploadId(null);
            setUploadError(null);
        });
    }

    const handleUpload = () => {
        if (!currentFile) {
            return;
        }

        setUploadError(null);
        startTransition(async () => {
            try {
                // Create FormData for API route
                const formData = new FormData();
                formData.append('studyKey', props.studyKey);
                formData.append('profileID', props.profileID);
                formData.append('file', currentFile);

                const response = await fetch('/api/participant-files', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok || !data.fileInfo || typeof data.fileInfo !== 'object' || !('id' in data.fileInfo)) {
                    setUploadError(data.error || 'Failed to upload file');
                    return;
                }

                setUploadId(data.fileInfo.id);
            } catch (error) {
                setUploadError(error instanceof Error ? error.message : 'Failed to upload file');
            }
        });
    }

    let content: React.ReactNode = null;
    if (hasFileUploaded) {
        content = <div className="flex flex-col gap-2">
            {uploadId && (
                <p className="text-sm text-primary">{props.messages?.successMessage || 'File uploaded successfully!'}</p>
            )}
            {currentFile && (
                <>
                    {previewUrl && (
                        <div className="w-full rounded-md overflow-hidden border bg-neutral-600">
                            <img
                                src={previewUrl}
                                alt={currentFile.name}
                                className="w-full h-auto max-h-96 object-contain"
                            />
                        </div>
                    )}
                </>
            )}
            <LoadingButton
                className="w-full"
                disabled={isPending}
                onClick={() => setIsDeleteDialogOpen(true)}
            >
                <Trash2Icon
                    className="size-4"
                />
                {props.messages?.deleteBtn || 'Delete'}
            </LoadingButton>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {props.messages?.deleteDialog?.title || 'Delete image'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {props.messages?.deleteDialog?.description || 'Are you sure you want to remove the uploaded image?'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            {props.messages?.deleteDialog?.keepCurrentSelection || 'Keep current selection'}
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <LoadingButton
                                isLoading={isPending}
                                onClick={handleDelete}
                                className="bg-destructive hover:bg-destructive/70"
                            >
                                {props.messages?.deleteDialog?.delete || 'Delete'}
                            </LoadingButton>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    } else {
        content = <div className="flex flex-col gap-2">
            <Filepicker
                id="em-foto-upload"
                label={props.messages?.label || 'Em Foto Upload'}
                placeholders={{
                    upload: props.messages?.upload || 'Upload a photo',
                    drag: props.messages?.drag || 'or drag and drop',
                }}
                disabled={isPending}

                accept={{ 'image/*': ['.jpg', '.jpeg', '.png'] }}
                onChange={(files) => {
                    setCurrentFile(files[0] || null);
                }}
            />
            {previewUrl && currentFile && (
                <div className="w-full rounded-md overflow-hidden border bg-neutral-100">
                    <img
                        src={previewUrl}
                        alt={currentFile.name}
                        className="w-full h-auto max-h-96 object-contain"
                    />
                </div>
            )}
            <LoadingButton
                className="w-full"
                disabled={!currentFile || isPending}
                onClick={handleUpload}
                isLoading={isPending}
            >
                <CloudUploadIcon
                    className="size-4"
                />
                {props.messages?.uploadBtn || 'Upload'}
            </LoadingButton>
            {uploadError && (
                <p className="text-sm text-destructive">{props.messages?.errorMessage || 'Failed to upload file'}</p>
            )}
        </div>
    }

    return (
        <div className="px-[--survey-card-px-sm] @md:px-[--survey-card-px]">
            {content}
        </div>
    )
}

export default EmFotoUpload;