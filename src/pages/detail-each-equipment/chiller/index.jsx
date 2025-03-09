import { ShareIndexComponent } from "./ShareIndexComponent";

export const Chiller = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyChiller"}
        apiMonthly={"chartMonthlyChiller"}
        apiHourly={"chartHourlyChiller"}
        apiTable={"tabelDataEquipmentChiller"}
        menu={"Chiller"}
      />
    </>
  );
};
