import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const Eksternal = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyEksternal"}
        apiMonthly={"chartMonthlyEksternal"}
        apiHourly={"chartHourlyEksternal"}
        apiTable={"tabelDataEquipmentEksternal"}
        menu={"Eksternal"}
        isEksternal={true}
        isHourlyTwoData={true}
      />
    </>
  );
};
