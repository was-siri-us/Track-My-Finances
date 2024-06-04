"use client"

import qs from "query-string";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { cn, formatDateRange } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover";

import {
  useRouter,
  usePathname,
  useSearchParams
} from "next/navigation"





export const DateFilter = () => {
  const router = useRouter();
  const pathName = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);


  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const purshToUrl = (date: DateRange | undefined) => {
    const query = {
      accountId,
      from: format(date?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(date?.to || defaultTo, "yyyy-MM-dd")      
    }

    const url = qs.stringifyUrl({
      url: pathName,
      query
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  }

  const onReset = () =>{
    setDate(undefined);
    purshToUrl(undefined);
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size={"sm"}
          variant={"outline"}
          className="lg:w-auto w-full h-9 rounded-md-3 px-3 font-normal bg-white/10 hover:bg:white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"

        >
          <span>
            {formatDateRange(paramState)}
          </span>
            <ChevronDown className="ml-2 size-4 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent
       className="lg:w-auto w-full p-0"
       align="start">
        <Calendar 
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
             onClick={onReset}
             disabled={!date?.from || !date.to }
             className="w-full"
             variant={"outline"}
             >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
             onClick={()=>purshToUrl(date)}
             disabled={!date?.from || !date.to }
             className="w-full"
             >
              Apply
            </Button>
          </PopoverClose>

        </div>

      </PopoverContent>
    </Popover>
  );
};