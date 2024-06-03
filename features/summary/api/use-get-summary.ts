import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertAmountFromMiliUnits } from "@/lib/utils";




export const useGetSummary = () => {

    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";


    const query = useQuery(
        {
            queryKey: ["summary", { from, to, accountId }],
            queryFn: async () => {
                const response = await client.api.summary.$get({
                    query: {
                        from,
                        to,
                        accountId

                    }
                });
                if (!response.ok) {
                    throw new Error("Error fetching Summary");
                }
                const { data } = await response.json();
                return {
                    ...data,
                    incomeAmount: convertAmountFromMiliUnits(data.incomeAmount),
                    expensesAmount: convertAmountFromMiliUnits(data.expensesAmount),
                    remainingAmount: convertAmountFromMiliUnits(data.remainingAmount),
                    categories:data.categories.map((category)=>({
                        ...category,
                        value:convertAmountFromMiliUnits(category.value)       
                    })),
                    days: data.days.map((day) => ({
                        ...day,
                        income: convertAmountFromMiliUnits(day.income),
                        expenses: convertAmountFromMiliUnits(day.expenses),
                    })),
                }
            },
        }
    );
    return query;
}
