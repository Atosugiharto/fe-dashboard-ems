import { ShareIndexComponent } from "./ShareIndexComponent";

export const FirtsFloor = () => {
  return (
    <>
      <ShareIndexComponent
        menu="1st Floor"
        apiDaily="chartDaily1"
        apiHourly="chartHourly1"
        apiThisMonth="chartMonthly1"
        apiThisMonthComparison="chartEquipment1"
        apiTable="tabelEachEquipment1"
      />
    </>
  );
};
