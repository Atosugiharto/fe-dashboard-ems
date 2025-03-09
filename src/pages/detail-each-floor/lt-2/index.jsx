import { ShareIndexComponent } from "../1st-floor/ShareIndexComponent";

export const Floor2 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="2nd Floor"
        apiDaily="chartDaily2"
        apiHourly="chartHourly2"
        apiThisMonth="chartMonthly2"
        apiThisMonthComparison="chartEquipment2"
        apiTable="tabelEachEquipment2"
      />
    </>
  );
};
