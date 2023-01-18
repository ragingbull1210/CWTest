import { Button } from "@mui/material";

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
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function ActionButton({
  color,
  name,
  marginTop,
  onClick,
  type,
}: ActionButtonProps) {
  return (
    <Button
      variant="contained"
      color={color}
      sx={{ mt: marginTop }}
      onClick={onClick}
      type={type}
    >
      {name}
    </Button>
  );
}
