import { ShareIndexComponent } from "../1st-floor/ShareIndexComponent";

export const Floor7 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="7th Floor"
        apiDaily="chartDaily7"
        apiHourly="chartHourly7"
        apiThisMonth="chartMonthly7"
        apiThisMonthComparison="chartEquipment7"
        apiTable="tabelEachEquipment7"
      />
    </>
  );
};
