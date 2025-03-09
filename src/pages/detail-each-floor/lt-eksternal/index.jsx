import { ShareIndexComponent } from "../share-annex-format/ShareIndexComponent";

export const LtEksternal = () => {
  return (
    <>
      <ShareIndexComponent
        menu="External Floor"
        apiDaily="chartDailyEksternal"
        apiHourly="chartHourlyEksternal"
        apiThisMonth="chartMonthlyEksternal"
        apiThisMonthComparison="chartEquipmentEksternal"
        apiTable="tabelEachEquipmentEksternal"
      />
    </>
  );
};
