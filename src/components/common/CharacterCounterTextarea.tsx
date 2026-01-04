'use client'
import React from "react";
import { UseFormRegister, FieldErrors, Control, useWatch } from "react-hook-form";

interface CharacterCounterTextareaProps {
    name?: string;
    formFieldName: string;
    maxLength: number;
    id?: string;
    placeholder?: string;
    required?: boolean;
    requiredMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    register: UseFormRegister<any>;
    errors?: FieldErrors<any>;
    control: Control<any>;
    fontSize?: number;
    rows?: number;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function CharacterCounterTextarea({
    name,
    id,
    formFieldName,
    maxLength = 500,
    placeholder = "",
    required = false,
    requiredMessage = "This field is required",
    onChange,
    className = "",
    textareaProps = {},
    register,
    errors,
    control,
    fontSize = 16,
    rows = 4,
    onBlur,
    onFocus,
}: CharacterCounterTextareaProps) {
    // Use useWatch hook for proper reactivity
    const fieldValue = useWatch({
        control,
        name: formFieldName,
        defaultValue: ''
    });
    const currentLength = typeof fieldValue === 'string' ? fieldValue.length : 0;

    return (
        <div className="flex flex-col gap-0">
            <textarea
                {...id ? { id } : {}}
                {...name ? { name } : {}}
                placeholder={placeholder}
                className={className ? className : 'w-full p-2 border border-gray-700'}
                style={{ fontSize: `${fontSize}px` }}
                maxLength={maxLength}
                rows={rows}
                {...register(formFieldName, {
                    required: required ? requiredMessage : false,
                    maxLength: {
                        value: maxLength,
                        message: `Input field cannot exceed ${maxLength} characters`
                    },
                    onChange: onChange,
                })}
                onBlur={onBlur}
                onFocus={onFocus}
                {...textareaProps}
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
}