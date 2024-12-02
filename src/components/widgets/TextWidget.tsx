export function TextWidget({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div className="min-h-[160px] flex flex-col">
      <div className="text-lg font-semibold text-gray-900 mb-2">{heading}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{content}</div>
    </div>
  );
}
