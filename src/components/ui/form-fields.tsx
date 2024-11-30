import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar, CalendarProps } from "./calendar";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";
import { HTMLInputTypeAttribute, useEffect } from "react";
import { Skeleton } from "./skeleton";


export type FormFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string | React.ReactNode;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

function FormFieldInput(props: FormFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      disabled={props.disabled}
      render={({ field }) => (
        <FormItem className="w-full">
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
              type={props.type}
              placeholder={props.placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormFieldSlugInput(props: FormFieldProps & { reference: string }) {
  const form = useFormContext();

  useEffect(() => {
    if (!form.watch(props.reference)) form.setValue(props.name, "");
    else
      form.setValue(
        props.name,
        form.watch(props.reference).toLowerCase().replace(/\s/g, "-")
      );
  }, [form.watch(props.reference)]);

  return (
    <FormField
      control={form.control}
      name={props.name}
      disabled={props.disabled}
      render={({ field }) => (
        <FormItem className="w-full">
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input placeholder={props.placeholder} {...field} />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormFieldCheckBox(props: FormFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {props.label && (
              <FormLabel className="text-sm">{props.label}</FormLabel>
            )}
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

function FormFieldDatePicker(
  props: FormFieldProps & { options?: CalendarProps }
) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal h-10 flex",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP", { locale: it })
                  ) : (
                    <pre className="text-xs">Seleziona Data</pre>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                {...props.options}
              />
            </PopoverContent>
          </Popover>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormFieldSelect(
  props: FormFieldProps & {
    defaultValue?: string;
    options: { label: string; value: string }[];
  }
) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full">
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormFieldTextArea(props: FormFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormFieldSkeleton(props: { label: string }) {
  return (
    <FormItem className="w-full">
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <Skeleton className="h-10 w-full" />
    </FormItem>
  );
}

export const FormFields = {
  Input: FormFieldInput,
  Checkbox: FormFieldCheckBox,
  DatePicker: FormFieldDatePicker,
  Select: FormFieldSelect,
  TextArea: FormFieldTextArea,
  SlugInput: FormFieldSlugInput,
  Skeleton: FormFieldSkeleton,
};
