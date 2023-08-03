import * as Dialog from "@radix-ui/react-dialog";
import { css } from "@emotion/react";
import { colors } from "src/utils/colors";
import { MdClose } from "react-icons/md";

interface ModalProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
  title,
  description,
  children,
  open,
  onOpenChange,
}: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay
        css={css({
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        })}
      />
      <Dialog.Content
        css={css({
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "16px",
          backgroundColor: colors.gray["200"],
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          width: "600px",
          maxWidth: "95%",
          zIndex: 9999,
        })}
      >
        <Dialog.Title
          css={css({
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "8px",
            color: colors.gray["800"],
          })}
        >
          {title}
        </Dialog.Title>
        <Dialog.Description
          css={css({
            fontSize: "1rem",
            lineHeight: "1.5rem",
            marginBottom: "16px",
            color: colors.gray["600"],
          })}
        >
          {description}
        </Dialog.Description>
        {children}
        <Dialog.Close
          css={css({
            position: "absolute",
            top: "8px",
            right: "8px",
            cursor: "pointer",
            color: colors.gray["600"],

            "&:hover": {
              color: colors.gray["800"],
            },
            padding: "0.25rem",
            border : "none",
            background : "none",
          })}
        >
          <MdClose />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
