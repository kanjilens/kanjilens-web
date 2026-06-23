import { type PropsWithChildren, useState } from "react";

import styles from "./Item.module.css";
import {
  Typography,
  type TypographyVariant,
} from "@components/ui/Typography";

const Container = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <div
      className="flex justify-between items-center"
      style={{ ...props }}
    >
      {children}
    </div>
  );
};

const Row = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <div className="flex flex-row" style={props}>
      {children}
    </div>
  );
};

type ColProps = PropsWithChildren &
  React.CSSProperties & {
    children: React.ReactNode;
    hasScrollBar?: boolean;
  };

const Col = ({
  children,
  hasScrollBar = false,
  ...props
}: ColProps) => {
  return (
    <div
      className={`flex flex-col items-center ${hasScrollBar && "overflow-auto"}`}
      style={props}
    >
      {children}
    </div>
  );
};

const Link = ({
  children,
  to,
  ...props
}: PropsWithChildren & {
  to: string;
} & React.CSSProperties) => {
  return (
    <a href={to} className={styles.link} style={props}>
      {children}
    </a>
  );
};

const Title = ({
  children,
  style,
  variant = "h1",
}: PropsWithChildren & {
  style?: React.CSSProperties;
  variant?: TypographyVariant;
}) => {
  return (
    <Typography variant={variant} as="h1" style={style}>
      {children}
    </Typography>
  );
};

const Subtitle = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <Typography variant="subtitle" as="h2" style={props}>
      {children}
    </Typography>
  );
};

const Text = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <p className="text-[24px] text-medium" style={props}>
      {children}
    </p>
  );
};

type colorT =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

const Message = ({
  children,
  color = "default",
  ...props
}: PropsWithChildren &
  React.CSSProperties & { color: colorT }) => {
  const colorClass =
    color === "error"
      ? "text-[#e66f6f]"
      : color === "success"
        ? "text-[#6db86b]"
        : color === "warning"
          ? "text-[#d9a644]"
          : "text-[#313030]";

  return (
    <p
      className={`text-[16px] text-normal ${colorClass}`}
      style={props}
    >
      {children}
    </p>
  );
};

const Table = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <table className={styles.table} style={{ ...props }}>
      {children}
    </table>
  );
};

const THead = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <thead className={styles.thead} style={{ ...props }}>
      {children}
    </thead>
  );
};

const TBody = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <tbody className={styles.tbody} style={{ ...props }}>
      {children}
    </tbody>
  );
};

const TH = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <th className={styles.th} style={{ ...props }}>
      {children}
    </th>
  );
};

const TD = ({
  children,
  colSpan,
  ...props
}: PropsWithChildren &
  React.CSSProperties & { colSpan?: number }) => {
  return (
    <td
      className={styles.td}
      style={{ ...props }}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

const TR = ({
  children,
  ...props
}: PropsWithChildren & React.CSSProperties) => {
  return (
    <tr className={styles.tr} style={{ ...props }}>
      {children}
    </tr>
  );
};

const EditButton = ({
  children,
  isSubmitting,
  onClick,
  isDirty,
  ...props
}: PropsWithChildren &
  React.CSSProperties & {
    isSubmitting?: boolean;
    isDirty?: boolean;
    onClick: () => void;
  }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      {isDirty ? (
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ ...props }}
        >
          <button
            type="submit"
            className={styles.button}
            onClick={onClick}
            disabled={isSubmitting}
          >
            {isHover ? (
              <>
                <span
                  className={`material-symbols-outlined light sm`}
                >
                  check
                </span>
              </>
            ) : (
              <>
                <span
                  className={`material-symbols-outlined editnew sm`}
                >
                  check
                </span>
              </>
            )}
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      ) : (
        <div
          style={{ width: "100px" }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <button
            type="submit"
            className={styles.button}
            disabled
          >
            <>
              <span
                className={`material-symbols-outlined light sm`}
              >
                edit
              </span>
              {children}
            </>
          </button>
        </div>
      )}
    </>
  );
};

const Img = ({
  src,
  alt,
  ...props
}: { src: string; alt: string } & React.CSSProperties) => {
  return (
    <img
      className={styles.img}
      src={src}
      alt={alt}
      style={props}
    />
  );
};

const Item = {
  Container,
  Row,
  Col,
  Link,
  Img,
  Title,
  Subtitle,
  Text,
  Message,
  Table,
  THead,
  TBody,
  TH,
  TD,
  TR,
  EditButton,
};

export default Item;
