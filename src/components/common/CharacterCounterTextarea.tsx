'use client'
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

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
    errors,
    control,
    fontSize = 16,
    rows = 4,
    onBlur,
    onFocus,
}: CharacterCounterTextareaProps) {
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
                        <textarea
                            {...field}
                            {...id ? { id } : {}}
                            {...name ? { name } : {}}
                            placeholder={placeholder}
                            className={className ? className : 'w-full p-2 border border-gray-700'}
                            style={{ fontSize: `${fontSize}px` }}
                            maxLength={maxLength}
                            rows={rows}
                            onChange={(e) => {
                                field.onChange(e);
                                onChange?.(e);
                            }}
                            onBlur={(e) => {
                                field.onBlur();
                                onBlur?.(e);
                            }}
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
            }}
        />
    );
}