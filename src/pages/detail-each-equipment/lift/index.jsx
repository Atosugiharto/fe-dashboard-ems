import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Lift = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyLift"}
        apiMonthly={"chartMonthlyLift"}
        apiHourly={"chartHourlyLift"}
        apiTable={"tabelDataEquipmentLift"}
        menu={"Lift"}
        isSingleData={true}
      />
    </>
  );
};
