import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";


import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { AmountInput } from "@/components/amount-input";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";


import { convertAmountToMiliUnits } from "@/lib/utils";

import { Trash } from "lucide-react";



const formSchema = z.object(
    {
        date: z.coerce.date(),
        accountId: z.string(),
        categoryId: z.string().nullable().optional(),
        payee: z.string(),
        amount: z.string(),
        notes: z.string().nullable().optional()


    }
)


const ApiSchema = insertTransactionSchema.omit({ id: true });


type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof ApiSchema>;
type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string, value: string }[];
    categoryOptions: { label: string, value: string }[];
    onCreateAccount: (name: string) => void
    onCreateCategory: (name: string) => void
}

export const TransactionForm = ({ id, defaultValues, onSubmit, onDelete, disabled, accountOptions, categoryOptions, onCreateAccount, onCreateCategory }: Props) => {
    const form = useForm<FormValues>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: defaultValues,
        }
    );

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount);
        const amountInMilUnits = convertAmountToMiliUnits(amount);
        
        onSubmit({
            ...values,
            amount: amountInMilUnits
        });

    }
    const handleDelete = () => {
        onDelete?.();
    }




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField name="date" control={form.control} render={
                    ({ field }) => {
                        return (
                            <FormItem>
                               <DatePicker 
                                value={field.value}
                                onChange={field.onChange}
                                disabled={disabled}
                               />

                            </FormItem>
                        )
                    }
                } />

                <FormField name="accountId" control={form.control} render={
                    ({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Account</FormLabel>
                                <Select
                                    placeholder="Select Account"
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />

                            </FormItem>
                        )
                    }
                } />


                <FormField name="categoryId" control={form.control} render={
                    ({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    placeholder="Select a category"
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />

                            </FormItem>
                        )
                    }
                } />



                
                <FormField name="payee" control={form.control} render={
                    ({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Payee</FormLabel>
                                <Input 
                                    disabled={disabled}
                                    placeholder="Add a payee"
                                    {...field}
                                />

                            </FormItem>
                        )
                    }
                } />



                <FormField name="amount" control={form.control} render={
                    ({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <AmountInput
                                    {...field}
                                    disabled={disabled}
                                    placeholder="0.00"
                                />

                            </FormItem>
                        )
                    }
                } />




                <FormField name="notes" control={form.control} render={
                    ({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <Textarea 
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disabled}
                                    placeholder="Optional notes"
                                />

                            </FormItem>
                        )
                    }
                } />





                <Button className="w-full" disabled={disabled} >
                    {id ? "Save Changes" : "Create Transaction"}
                </Button>
                {!!id &&
                    (<Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" variant={"outline"}>
                        <Trash className="size-4 mr-2" />
                        Delete Transaction
                    </Button>)
                }
            </form>
        </Form>
    )
};

