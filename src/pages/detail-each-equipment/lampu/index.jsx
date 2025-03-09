import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Lampu = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyLampu"}
        apiMonthly={"chartMonthlyLampu"}
        apiHourly={"chartHourlyLampu"}
        apiTable={"tabelDataEquipmentLampu"}
        menu={"Lampu"}
        isSingleData={true}
      />
    </>
  );
};
