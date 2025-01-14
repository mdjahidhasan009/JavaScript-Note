import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidUrl = (url: string) => {
  const urlPattern =
    /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/;
  return urlPattern.test(url);
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    window.location.hash = `#${id}`;
  }
};
