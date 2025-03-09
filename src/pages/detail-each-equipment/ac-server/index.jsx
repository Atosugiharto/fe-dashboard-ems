import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const AcServer = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyACserver"}
        apiMonthly={"chartMonthlyACserver"}
        apiHourly={"chartHourlyACserver"}
        apiTable={"tabelDataEquipmentACserver"}
        isSingleData={true}
        isPanelAc={true}
        menu={"AC Server"}
      />
    </>
  );
};
