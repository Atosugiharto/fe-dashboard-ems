import { ShareIndexComponent } from "../1st-floor/ShareIndexComponent";

export const Floor5 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="5th Floor"
        apiDaily="chartDaily5"
        apiHourly="chartHourly5"
        apiThisMonth="chartMonthly5"
        apiThisMonthComparison="chartEquipment5"
        apiTable="tabelEachEquipment5"
      />
    </>
  );
};
