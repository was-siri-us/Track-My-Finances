import { z } from "zod";




import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { insertTransactionSchema } from "@/db/schema";

import { TransactionForm } from "@/features/transactions/components/transaction-form"
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";



import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetDescription
} from "@/components/ui/sheet"

import { Loader2 } from "lucide-react";






const formSchema = insertTransactionSchema.omit(
    {
        id: true,
    }
)


type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();

    const createMutation = useCreateTransaction();



    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();

    const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
    const categoryOptions = (categoryQuery.data ?? []).map(
        (category) => ({
            value: category.id,
            label: category.name

        })
    )

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();

    const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    const accountOptions = (accountQuery.data ?? []).map(
        (account) => ({
            value: account.id,
            label: account.name

        })
    )



    const isPending = createMutation.isPending || categoryMutation.isPending || accountMutation.isPending;

    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }

        });
    };




    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Add a new Transaction
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading ?
                        (
                            <div className="absolute inset-0 flex item-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin"></Loader2>
                            </div>
                        )
                        :
                        (
                            <TransactionForm
                                onSubmit={onSubmit}
                                disabled={isPending}
                                categoryOptions={categoryOptions}
                                onCreateCategory={onCreateCategory}
                                accountOptions={accountOptions}
                                onCreateAccount={onCreateAccount}

                            />
                        )
                }

            </SheetContent>
        </Sheet>
    )
}