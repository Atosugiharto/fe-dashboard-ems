import { ShareIndexComponent } from "../1st-floor/ShareIndexComponent";

export const Floor6 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="6th Floor"
        apiDaily="chartDaily6"
        apiHourly="chartHourly6"
        apiThisMonth="chartMonthly6"
        apiThisMonthComparison="chartEquipment6"
        apiTable="tabelEachEquipment6"
      />
    </>
  );
};
