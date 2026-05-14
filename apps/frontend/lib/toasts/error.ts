import { showToast } from "nextjs-toast-notify";
import type { ToastPosition, ToastTransition } from "@/lib/types/toasts";

export function errorToast(
  message: string,
  duration = 4000,
  position: ToastPosition = "top-center",
  transition: ToastTransition = "bounceIn",
) {
  showToast.error(message, {
    duration,
    position,
    transition,
    icon: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="m15 9-6 6"/>
        <path d="m9 9 6 6"/>
      </svg>
    `,
    sound: true,
    progress: true,
  });
}
