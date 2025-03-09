import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Socket = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailySocket"}
        apiMonthly={"chartMonthlySocket"}
        apiHourly={"chartHourlySocket"}
        apiTable={"tabelDataEquipmentSocket"}
        menu={"Socket"}
        isSingleData={true}
      />
    </>
  );
};
