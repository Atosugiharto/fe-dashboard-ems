import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Chwp = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyCHWP"}
        apiMonthly={"chartMonthlyCHWP"}
        apiHourly={"chartHourlyCHWP"}
        apiTable={"tabelDataEquipmentCHWP"}
        isChwp={true}
        menu={"CHWP"}
      />
    </>
  );
};
