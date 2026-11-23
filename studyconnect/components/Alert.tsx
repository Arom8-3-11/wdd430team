interface AlertProps {
  kind: "error" | "success" | "info";
  children: React.ReactNode;
}

const styles: Record<AlertProps["kind"], string> = {
  error: "border-red-300 bg-red-50 text-red-800",
  success: "border-emerald-300 bg-emerald-50 text-emerald-800",
  info: "border-blue-300 bg-blue-50 text-blue-800",
};

export default function Alert({ kind, children }: AlertProps) {
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`mb-4 rounded-lg border px-4 py-3 text-sm ${styles[kind]}`}
    >
      {children}
    </div>
  );
}
