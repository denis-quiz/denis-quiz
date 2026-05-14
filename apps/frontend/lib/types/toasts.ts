export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastTransition =
  | "fadeIn"
  | "swingInverted"
  | "bounceIn"
  | "popUp"
  | "topBounce"
  | "bounceInDown"
  | "slideInUp";

export type ToastSettings = {
  duration?: number | null;
  position?: ToastPosition;
  transition?: ToastTransition;
  sound?: boolean;
  progress?: boolean;
};
