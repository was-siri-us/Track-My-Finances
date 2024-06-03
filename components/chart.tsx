import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    CardHeader
} from "@/components/ui/card"


type Props = {
    data?:{
        date: string;
        income: number;
        expenses: number;
    }[];
}


export const Chart = ({
    data=[]
}:Props)=>{
    return (



        <Card className="border-none">

        </Card>
    )
}