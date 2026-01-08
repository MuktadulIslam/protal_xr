'use client'
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface CharacterCounterFormInputProps {
    name?: string;
    type: React.HTMLInputTypeAttribute;
    formFieldName: string;
    maxLength: number;
    id?: string;
    placeholder?: string;
    required?: boolean;
    requiredMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    errors?: FieldErrors<any>;
    control: Control<any>;
    fontSize?: number;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function CharacterCounterFormInput({
    name,
    type,
    id,
    formFieldName,
    maxLength = 50,
    placeholder = "",
    required = false,
    requiredMessage = "This field is required",
    onChange,
    className = "",
    inputProps = {},
    errors,
    control,
    fontSize = 16,
    onBlur,
    onFocus,
}: CharacterCounterFormInputProps) {
    return (
        <Controller
            name={formFieldName}
            control={control}
            rules={{
                required: required ? requiredMessage : false,
                maxLength: {
                    value: maxLength,
                    message: `Input field cannot exceed ${maxLength} characters`
                }
            }}
            render={({ field }) => {
                const currentLength = (field.value || '').length;

                return (
                    <div className="flex flex-col gap-0">
                        <input
                            {...field}
                            {...id ? { id } : {}}
                            {...name ? { name } : {}}
                            type={type}
                            placeholder={placeholder}
                            className={className ? className : 'w-full p-2 border border-gray-700'}
                            style={{ fontSize: `${fontSize}px` }}
                            maxLength={maxLength}
                            onChange={(e) => {
                                field.onChange(e);
                                onChange?.(e);
                            }}
                            onBlur={(e) => {
                                field.onBlur();
                                onBlur?.(e);
                            }}
                            onFocus={onFocus}
                            {...inputProps}
                        />

                        <div
                            className="w-full h-auto px-1 flex justify-between"
                            style={{ fontSize: `${fontSize - 3}px` }}
                        >
                            <p className="text-red-600">{errors && errors[formFieldName]?.message as string}</p>
                            <div className="text-gray-600">
                                {currentLength}
                                <span className="px-0.5 inline-block">/</span>
                                {maxLength}
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
}