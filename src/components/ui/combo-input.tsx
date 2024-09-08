import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

type ComboLabelInputProps = InputProps & { label?: string, icon?: React.ReactNode, error?: string }

const ComboLabelInput = React.forwardRef<HTMLInputElement, InputProps & React.PropsWithoutRef<ComboLabelInputProps>
>(({ id, placeholder, type, icon, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    // console.log("props", props.error);
    return (
        <>
            <div className={cn("relative", className)}>
                {icon && <div className="absolute inset-y-0 flex items-center pl-4">{icon}</div>}
                <input
                    id={id}
                    type={type === "password" && showPassword ? "text" : type}
                    className={cn("w-full py-2 pr-12 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent", icon && "pl-12", props.error && "border-red-500")}
                    {...props}
                    ref={ref}
                    placeholder={placeholder}
                />
                {
                    type === "password" && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    )
                }
            </div>

            {
                props.error && <div className="relative my-2 ml-4 w-full h-5 text-xs text-red-500">{props.error}</div>
            }
        </>
    );
}
);
ComboLabelInput.displayName = "Input";

export { ComboLabelInput };