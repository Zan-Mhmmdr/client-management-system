import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface InputWithIconProps {
  id: string;
  name: string;
  type?: string;
  iconClass: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label: string;
  wrapperClassname?: string;
}

const InputWithIcon = ({
  wrapperClassname = "mb-4",
  id,
  label,
  iconClass,
  type = "text",
  name,
  placeholder,
  required = false,
  value,
  onChange,
}: InputWithIconProps) => {
  return (
    <div className={wrapperClassname}>
      <Label htmlFor={id} className="text-sm text-[#EAEAEA] mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className={`${iconClass} text-gray-400`} />
        </div>
        <Input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="pl-10 bg-[#1A1A1A] border border-[#333] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
