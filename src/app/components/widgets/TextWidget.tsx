export function TextWidget({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div>
      <div className="text-xl text-gray-600">{heading}</div>
      <div className="text">{content}</div>
    </div>
  );
}
