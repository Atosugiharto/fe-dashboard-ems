import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const PressFan = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyPressFan"}
        apiMonthly={"chartMonthlyPressFan"}
        apiHourly={"chartHourlyPressFan"}
        apiTable={"tabelDataEquipmentPressFan"}
        menu={"Press Fan"}
        isPressFan={true}
        isHourlyTwoData={true}
      />
    </>
  );
};
