import * as dayjs from "dayjs";
import { useTranslation } from "next-i18next";

export default function MiniBio() {
  const birthday = dayjs("1996-04-06");
  const today = dayjs();
  const age = today.diff(birthday, "year");

  const { t } = useTranslation("common");

  return <p>{t("miniBio", { age })}</p>;
}
