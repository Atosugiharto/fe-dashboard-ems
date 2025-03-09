import { ShareIndexComponent } from "../share-annex-format/ShareIndexComponent";

export const LtAnnex2 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="2nd Annex Floor"
        apiDaily="chartDaily2_Annex"
        apiHourly="chartHourly2_Annex"
        apiThisMonth="chartMonthly2_Annex"
        apiThisMonthComparison="chartEquipment2_Annex"
        apiTable="tabelEachEquipment2_Annex"
      />
    </>
  );
};
