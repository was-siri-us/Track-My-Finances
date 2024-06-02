"use client"




import { useMemo } from "react"
import { SingleValue } from "react-select";
import CreateableSelect from "react-select/creatable";



type Props = {
    onChange: (value?: string) => void;
    onCreate: (value: string) => void;
    options?: { label: string, value: string }[];
    value?: string | null | undefined
    disabled?: boolean;
    placeholder?: string;

}



export const Select = ({
    onChange, onCreate, options = [], value, disabled, placeholder
}: Props) => {

    const onSelect = (
        option: SingleValue<{ label: string, value: string }>
    ) => {
        onChange(option?.value);
    }

    const formatedValue = useMemo(() => {
        return options.find(option => option.value === value)
    }, [options, value])

    return (
        <CreateableSelect 
            placeholder={placeholder}
            className="text-sm h-10"
            styles={{
                control:(base)=>({
                    ...base,
                    
                    ":hover":{
                        borderColor:"e2e8f0",
                    }
                })
            }}

            value={formatedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        />
    )
}