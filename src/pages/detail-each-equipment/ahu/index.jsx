import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Ahu = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyAHU"}
        apiMonthly={"chartMonthlyAHU"}
        apiHourly={"chartHourlyAHU"}
        apiTable={"tabelDataEquipmentAHU"}
        menu={"AHU"}
        isSingleData={true}
      />
    </>
  );
};
