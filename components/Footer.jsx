import { useTranslation } from "next-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <div className="py-4 container mx-auto max-w-3xl">
      <hr />
      <p className="p-2 text-gray-600 text-sm text-center">
        {t("footer.thanks")}
      </p>
    </div>
  );
}
