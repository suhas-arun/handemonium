import Button from "@/components/Button";

export default function Home() {
  const logoPath: string = "/handemonium-logo.png";
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-white">
      <img src={logoPath} alt="Handemonium Logo" className="max-w-96" />
      <div className="flex gap-4 mt-8">
        <Button label="PLAY" redirectUrl="/quiz" />
        <Button label="SETTINGS" />
        <Button label="TEST" redirectUrl="test" />
      </div>
    </div>
  );
}
