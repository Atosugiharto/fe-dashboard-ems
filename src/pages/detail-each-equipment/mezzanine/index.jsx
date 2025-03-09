import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Mezzanine = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyMezzanine"}
        apiMonthly={"chartMonthlyMezzanine"}
        apiHourly={"chartHourlyMezzanine"}
        apiTable={"tabelDataEquipmentMezzanine"}
        menu={"Mezzanine"}
        isSingleData={true}
      />
    </>
  );
};
