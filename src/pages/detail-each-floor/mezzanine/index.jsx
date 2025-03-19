import { ShareIndexComponent } from "../share-annex-format/ShareIndexComponent";

export const LtMezzanine = () => {
  return (
    <>
      <ShareIndexComponent
        menu="Mezzanine"
        apiDaily="chartDailyMezzanine"
        apiHourly="chartHourlyMezzanine"
        apiThisMonth="chartMonthlyMezzanine"
        apiThisMonthComparison="chartEquipmentMezzanine"
        apiTable="tabelEachEquipmentMezzanine"
      />
    </>
  );
};
