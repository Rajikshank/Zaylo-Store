import { AlertCircle } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className=" bg-destructive/25 text-secondary-foreground p-3   flex my-4 text-xs outline font-medium outline-1 outline-green-500 items-center gap-2 rounded">
      <AlertCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
