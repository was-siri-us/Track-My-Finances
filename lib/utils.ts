import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, isSameDay } from "date-fns"
import { type ClassValue, clsx } from "clsx"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertAmountFromMiliUnits(amount: number) {
  return amount / 1000
}


export function convertAmountToMiliUnits(amount: number) {
  return amount * 1000
}

export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}




export function calculatePercentageChange(current:number,previous:number){
  if(previous === 0){
    return previous === current ? 0 : 100
  }

  return ((current - previous) / previous) * 100
}


export function fillMissingDays(
  activeDays: {
    date:Date,
    income:number,
    expenses:number,
  }[],
  startDate:Date,
  endDate:Date
){
  if(activeDays.length === 0){
    return []
  }

  const allDays = eachDayOfInterval({start:startDate,end:endDate})
  const transactionsByDay = allDays.map(
    (day)=>{
      const found = activeDays.find((d)=> isSameDay(d.date,day));
      if(found){
        return found
      }
      else{
        return {
          date:day,
          income:0,
          expenses:0,
        };
      }
    }
  );

  return transactionsByDay
}
