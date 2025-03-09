import { ShareIndexComponent } from "../1st-floor/ShareIndexComponent";

export const Floor4 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="4th Floor"
        apiDaily="chartDaily4"
        apiHourly="chartHourly4"
        apiThisMonth="chartMonthly4"
        apiThisMonthComparison="chartEquipment4"
        apiTable="tabelEachEquipment4"
      />
    </>
  );
};
