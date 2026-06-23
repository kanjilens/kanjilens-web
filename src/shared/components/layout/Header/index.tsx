import Item from "@components/ui/Item";
import type { TypographyVariant } from "@components/ui/Typography";
import type { PropsWithChildren } from "react";

const Header = ({
  name,
  description,
  children,
  titleVariant = "h1",
}: PropsWithChildren & {
  name?: string;
  description?: string;
  titleVariant?: TypographyVariant;
}) => {
  return (
    <Item.Row
      justifyContent="space-between"
      flexWrap="wrap"
      alignItems="center"
      width={"100%"}
      paddingBottom={"4px"}
      gap={"10px"}
    >
      <Item.Col alignItems="start">
        {name && (
          <Item.Title variant={titleVariant}>
            {name}
          </Item.Title>
        )}
        {description && (
          <Item.Subtitle>{description}</Item.Subtitle>
        )}
      </Item.Col>
      <Item.Row gap={"15px"}>{children}</Item.Row>
    </Item.Row>
  );
};

export default Header;
