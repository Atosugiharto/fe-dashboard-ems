import { ShareIndexComponent } from "../1st-floor/ShareIndexComponent";

export const Floor3 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="3rd Floor"
        apiDaily="chartDaily3"
        apiHourly="chartHourly3"
        apiThisMonth="chartMonthly3"
        apiThisMonthComparison="chartEquipment3"
        apiTable="tabelEachEquipment3"
      />
    </>
  );
};
