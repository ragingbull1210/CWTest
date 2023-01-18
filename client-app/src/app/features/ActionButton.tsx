import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";

interface ActionButtonProps {
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  name: string;
  marginTop?: number;
  marginLeft?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export default observer(function ActionButton({
  color,
  name,
  marginTop,
  marginLeft,
  onClick,
  type,
}: ActionButtonProps) {
  return (
    <Button
      variant="contained"
      color={color}
      sx={{ mt: marginTop, ml: marginLeft }}
      onClick={onClick}
      type={type}
    >
      {name}
    </Button>
  );
});
