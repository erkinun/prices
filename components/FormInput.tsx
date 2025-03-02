"use client";

// TODO this feels wrong : )
export function FormInput({
  field,
  labelText,
}: {
  field: any;
  labelText: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={field.name}>{labelText}</label>
      <input
        className="text-black p-2 rounded-sm dark:bg-neutral-800 dark:text-neutral-100"
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(Number(e.target.value))}
      />
    </div>
  );
}
