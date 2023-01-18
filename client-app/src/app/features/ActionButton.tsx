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
}

export default function ActionButton({
  color,
  name,
  marginTop,
}: ActionButtonProps) {
  return (
    <Button variant="contained" color={color} sx={{ mt: marginTop }}>
      {name}
    </Button>
  );
}
