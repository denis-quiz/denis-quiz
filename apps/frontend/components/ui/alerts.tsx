export function TraditionalAlert({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">{title}</strong>{" "}
      <span className="block sm:inline">{text}</span>
    </div>
  );
}

export function BannerAlert({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p className="text-sm">{text}</p>
    </div>
  );
}
