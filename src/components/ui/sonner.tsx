import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-main group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-text",
          actionButton:
            "group-[.toast]:bg-main group-[.toast]:text-background",
          cancelButton:
            "group-[.toast]:bg-sub group-[.toast]:text-background",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
