import { ShareIndexComponent } from "../share-annex-format/ShareIndexComponent";

export const LtAnnex1 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="1st Annex Floor"
        apiDaily="chartDaily1_Annex"
        apiHourly="chartHourly1_Annex"
        apiThisMonth="chartMonthly1_Annex"
        apiThisMonthComparison="chartEquipment1_Annex"
        apiTable="tabelEachEquipment1_Annex"
      />
    </>
  );
};
