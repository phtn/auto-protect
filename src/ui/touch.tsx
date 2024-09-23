import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { type LucideIcon } from "lucide-react";
import tw from "tailwind-styled-components";

const touchDefaultClass = `
  text-sm font-semibold tracking-tight border-[0.33px] cursor-pointer space-x-3
  inline-flex items-center justify-center whitespace-nowrap rounded-[8px]
  focus-visible:outline-none focus-visible:ring-1
  focus-visible:ring-ring focus-visible:ring-offset-4
  disabled:pointer-events-none disabled:opacity-70
  transition-all duration-300 ring-offset-background
`;
const defaultClass = `
  bg-white text-clay border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-cyan-600 disabled:hover:text-clay/60
  w-full
`;
const primaryClass = `
  bg-white text-blue-500 border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-blue-600
`;
const darkClass = `
  bg-void text-blue-50 border border-clay/[40%]
  shadow-i-br-dk-hv pointer-events-auto
  hover:text-zap rounded-[8px]
  m-[1px]
`;
const secondaryClass = `
  bg-blue-600 text-blue-100 border border-blue-400
  shadow-i-br-dk-hv m-[0px]
  hover:text-white rounded-[8px]

`;
const destroyClass = `
  bg-white text-red-500/80 border-ash/[30%]
  hover:shadow-i-br-md-hv shadow-i-tl-li
  hover:text-red-500
`;
const ghostClass = `
  text-clay border-0
  hover:text-blue-500 bg-transparent
`;

const tv = cva(touchDefaultClass, {
  variants: {
    variant: {
      default: defaultClass,
      dark: darkClass,
      destroy: destroyClass,
      primary: primaryClass,
      secondary: secondaryClass,
      ghost: ghostClass,
    },
    size: {
      sm: "h-[32px] px-[16px]",
      md: "h-[48px] px-[18px]",
      lg: "h-[50px] w-full px-[22px]",
      icon: "h-[52px] w-[52px]",
      default: "h-[42px] px-[16px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ReUpButtonProps {
  icon?: LucideIcon;
  iconClass?: string;
  iconFill?: string;
  tail?: LucideIcon;
  tailClass?: string;
  tailFill?: string;
}

interface TouchProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tv> {
  asChild?: boolean;
}
export const Touch = forwardRef<
  HTMLButtonElement,
  TouchProps & ReUpButtonProps
>(
  (
    {
      asChild,
      className,
      iconClass,
      iconFill,
      size,
      tailFill,
      tailClass,
      variant,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Case
        className={cn(
          variant === "ghost" ? `shadow-0 border-0 bg-transparent` : "",
          variant === "secondary"
            ? `rounded-[9.77px] border-blue-400 bg-blue-300/30`
            : "",
          size === "icon"
            ? `m-[0px] h-[56px] w-[56px] rounded-[9.77px]`
            : size === "lg"
              ? `rounded-xl`
              : `rounded-[9.77px]`,
        )}
      >
        <Comp
          className={cn(
            tv({ variant, size, className }),
            variant === "secondary"
              ? size === "lg"
                ? "h-[50px] w-full"
                : ""
              : "",
          )}
          ref={ref}
          {...props}
        >
          {props.icon ? (
            <props.icon
              strokeWidth={1.5}
              stroke={
                iconFill
                  ? variant === "secondary"
                    ? "#3b82f6"
                    : "white"
                  : "#aaa"
              }
              fill={`${iconFill ?? "rgba(0, 0, 0, 0.0)"}`}
              className={cn(`size-5`, iconClass)}
            />
          ) : null}

          {children ? <div>{children}</div> : null}
          {props.tail ? (
            <props.tail
              strokeWidth={1.5}
              stroke={
                tailFill
                  ? variant === "secondary"
                    ? "#3b82f6"
                    : "white"
                  : "#bbb"
              }
              fill={`${tailFill ?? "rgba(0, 0, 0, 0.0)"}`}
              className={cn(`size-5 text-cyan-600`, tailClass)}
            />
          ) : null}
        </Comp>
      </Case>
    );
  },
);

Touch.displayName = "Touch";

const Case = tw.div`
  flex items-center justify-center w-full
  bg-white p-[2px]
  border-[0.33px] border-ash

  shadow-i-br-li
  drop-shadow-sm
  hover:shadow-i-tl-li-hv

  transition-all duration-300
  active:scale-[95%] active:border-ash
`;

export const DarkTouch = forwardRef<
  HTMLButtonElement,
  TouchProps & ReUpButtonProps
>(
  (
    {
      asChild,
      className,
      iconClass,
      iconFill,
      size,
      tailClass,
      tailFill,
      variant = "dark",
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <DarkCase
        className={cn(
          className,
          variant === "secondary" ? `border-0 bg-blue-200 pt-[0px]` : ``,
          size === "icon" ? `m-[0px] h-[56px] w-[56px]` : ``,
        )}
      >
        <Comp
          className={cn(
            tv({ variant, size, className }),
            variant === "secondary" ? `h-[38px]` : ``,
          )}
          ref={ref}
          {...props}
        >
          {props.icon ? (
            <props.icon
              strokeWidth={1.5}
              // fill={`${iconFill}`}
              className={cn(`size-5`, iconClass, iconFill ? `${iconFill}` : ``)}
            />
          ) : null}

          {children ? <div>{children}</div> : null}
          {props.tail ? (
            <props.tail
              strokeWidth={1.5}
              fill={`${tailFill}`}
              className={cn(`size-5`, tailClass)}
            />
          ) : null}
        </Comp>
      </DarkCase>
    );
  },
);

DarkTouch.displayName = "DarkTouch";

const DarkCase = tw.div`
  flex items-center justify-center bg-void pt-[1px]
  rounded-[9px] border-[0.75px] border-void/[20%]
  shadow-i-tl-dk-hv
  transition-all duration-300
  drop-shadow-sm
  active:scale-[95%] active:border-ash
`;
