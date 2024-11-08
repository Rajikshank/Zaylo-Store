import { CheckCircle2 } from "lucide-react";

export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className=" bg-teal-400/25 flex my-4 text-xs outline font-medium outline-1 outline-green-500 items-center gap-2 rounded text-secondary-foreground p-3">
      <CheckCircle2 className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
