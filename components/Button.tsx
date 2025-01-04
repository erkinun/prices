import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return <button className="border rounded border-gray-500 p-2" {...props} />;
}
