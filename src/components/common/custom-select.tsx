"use client";
import { ChevronDown } from "lucide-react";
import React, {
  ComponentType,
  forwardRef,
  memo,
  useEffect,
  useState,
} from "react";
import ReactSelect, {
  StylesConfig,
  type DropdownIndicatorProps,
  components,
  GroupBase,
  SelectInstance,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  label?: string;
  multiple?: boolean;
  name: string;
  className?: string;
  height?: string;
  borderRadius?: string;
  options?: CustomSelectOption[];
  Option?:
    | ComponentType<OptionProps<unknown, boolean, GroupBase<unknown>>>
    | undefined;
  ValueContainer?:
    | ComponentType<ValueContainerProps<unknown, boolean, GroupBase<unknown>>>
    | undefined;
  value?: CustomSelectOption | CustomSelectOption[];
  onChange?: (newValue: unknown) => void;
  error?: string;
  isDisabled?: boolean;
  labelClassName?: string;
  required?: boolean;
};

const DefaultOption: React.FC<
  OptionProps<unknown, boolean, GroupBase<unknown>>
> = (props) => (
  <components.Option {...props}>{props.children}</components.Option>
);

const DefaultValueContainer: React.FC<
  ValueContainerProps<unknown, boolean, GroupBase<unknown>>
> = (props) => (
  <components.ValueContainer className="min-h-[26px]" {...props}>
    {props.children}
  </components.ValueContainer>
);

const CustomSelect = forwardRef<
  SelectInstance<unknown, boolean> | null,
  CustomSelectProps
>(
  (
    {
      options,
      label,
      height,
      borderRadius,
      multiple,
      name,
      className,
      value,
      onChange,
      Option = DefaultOption,
      ValueContainer = DefaultValueContainer,
      error,
      isDisabled,
      labelClassName,
      required,
      ...props
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    useEffect(() => setIsMounted(true), []);

    const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "white",
        fontSize: "14px",
        fontWeight: "normal",
        height: "auto",
        minHeight: height ?? "56px",
        borderRadius: borderRadius ?? "6px",
        borderColor: "#D0D5DD",
        boxShadow: "none",
        "&:hover": { borderColor: "#D0D5DD" },
      }),
      option: (styles, { isSelected }) => {
        return {
          ...styles,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontSize: "14px",
          backgroundColor: isSelected ? "#159C47CC" : "#fff",
          color: isSelected ? "#fff" : "#000",
          ":hover": {
            ...styles[":active"],
            backgroundColor: isSelected ? "#159C47CC" : "#eee",
          },
          ".selected": {
            backgroundColor: "#159C47CC",
            color: "#fff",
          },
        };
      },
      singleValue: (base) => ({
        ...base,
        padding: "0 6px",
      }),
      input: (styles, { value }) => ({
        ...styles,
        position: "absolute",
        width: (value as string)?.length > 0 ? "100%" : "auto",
        height: "100%",
        top: "0px",
        left: "0px",
        padding: "0 8px",
        background: (value as string)?.length > 0 ? "white" : "transparent",
      }),
      indicatorSeparator: (styles) => ({
        ...styles,
        display: "none",
      }),
      indicatorsContainer: (styles) => ({
        ...styles,
        padding: "0 4px",
      }),
      placeholder: (styles) => ({ ...styles, padding: "0 6px" }),
    };

    const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
      return (
        <components.DropdownIndicator {...props}>
          <ChevronDown className="h-5 w-5 text-dark-500" />
        </components.DropdownIndicator>
      );
    };

    return (
      <div className={cn("relative", className)}>
        {label && (
          <Label
            id={name}
            className={cn(
              "font-bold mb-[10px] block text-black text-[15px]",
              labelClassName
            )}
          >
            {label}
            {required && <span>*</span>}
          </Label>
        )}
        {isMounted && (
          <ReactSelect
            options={options}
            isMulti={multiple}
            name={name}
            id={name}
            ref={ref}
            styles={customStyles}
            value={value}
            onChange={onChange}
            components={{ DropdownIndicator, Option, ValueContainer }}
            isDisabled={isDisabled}
            menuPortalTarget={undefined}
            menuPosition="absolute"
            {...props}
          />
        )}
        {error && (
          <p className="font-semibold mt-1 text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

const MemoizedCustomSelect = memo(CustomSelect);

export {
  MemoizedCustomSelect as CustomSelect,
  type CustomSelectOption,
  type CustomSelectProps,
};
