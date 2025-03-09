import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Pabx = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyPABX"}
        apiMonthly={"chartMonthlyPABX"}
        apiHourly={"chartHourlyPABX"}
        apiTable={"tabelDataEquipmentPABX"}
        menu={"PABX"}
        isPabx={true}
        isSingleData={true}
      />
    </>
  );
};
