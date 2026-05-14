import { showToast } from "nextjs-toast-notify";
import type { ToastPosition, ToastTransition } from "@/lib/types/toasts";

export function successToast(
  message: string,
  duration = 4000,
  position: ToastPosition = "top-center",
  transition: ToastTransition = "bounceIn",
) {
  showToast.success(message, {
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
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    `,
    sound: true,
    progress: true,
  });
}
