import GenericPrimaryButton from "@components/ui/Button/Primary";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--bg-muted,transparent)] h-full w-full flex flex-col items-center justify-center px-6 py-12 text-center text-[var(--text-color,#333)]">
      <h1 className="mb-2.5 text-6xl font-bold text-[var(--primary,#0D9488)] sm:text-7xl">
        404
      </h1>
      <h2 className="mb-3 text-2xl font-semibold sm:text-3xl">
        Page Not Found — ページが見つかりません
      </h2>
      <p className="text-base text-[var(--muted,#666)]">
        申し訳ありません。要求されたページが見つかりませんでした。
      </p>
      <p className="mt-2 text-lg text-[var(--secondary,#555)]">
        該当: 見つからない (見つかりません)
      </p>
      <GenericPrimaryButton
        onClick={() => navigate("/")}
        text="ホームへ戻る / Go Back Home"
      />
    </div>
  );
};

export default NotFound;
