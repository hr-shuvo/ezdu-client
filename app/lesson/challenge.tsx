import { cn } from "@/lib/utils";
import { Card } from "./Card";

type Props = {
    options: any[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled: boolean;
    type: any;
};

export const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type,
}: Props) => {
    // console.log(options)
    return (
        
        <div
            className={cn(
                "grid gap-2",
                type === "ASSIT" && "grid-cols-1",
                type === "SELECT" &&
                    "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
            )}
        >
            {options.map((option, i) => (
                <Card
                    key={option._id}
                    id={option._id}
                    text={option.text}
                    shortcut={`${i + 1}`}
                    selected={selectedOption === option._id}
                    onClick={() => onSelect(option._id)}
                    status={status}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    type={type}
                    imageSrc={option.imageSrc}
                />
            ))}
        </div>
    );
};
