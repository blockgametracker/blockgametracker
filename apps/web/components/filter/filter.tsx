import Link from "next/link";
import { Icon } from "../icon";
import { URLParams, buildURL } from "@/utils/urlBuilder";

export interface FilterButtonProps {
  children: React.ReactNode;
  updates: Partial<URLParams>;
  URLParams: URLParams;
}

export const FilterButton = ({ children, updates, URLParams }: FilterButtonProps) => {
  // Determine if the button is active based on the provided updates
  const isActive = Object.entries(updates).every(([key, value]) => URLParams[key as keyof URLParams] === value);

  return (
    <Link
      href={buildURL(URLParams, updates)}
      className={`inline-flex gap-4 w-full items-center py-1 ${isActive ? "bg-darkSelected text-mainText" : ""}`}
    >
      <div className={`w-4 h-4 rounded-md border-2 ${isActive ? "border-mainText bg-mainText" : "border-darkOverlay"}`}>
        <Icon iconName="close" className='fill-dark w-3 h-3' />
      </div>
      {children}
    </Link>
  );
};