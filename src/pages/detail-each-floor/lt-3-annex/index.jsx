import { ShareIndexComponent } from "../share-annex-format/ShareIndexComponent";

export const LtAnnex3 = () => {
  return (
    <>
      <ShareIndexComponent
        menu="3rd Annex Floor"
        apiDaily="chartDaily3_Annex"
        apiHourly="chartHourly3_Annex"
        apiThisMonth="chartMonthly3_Annex"
        apiThisMonthComparison="chartEquipment3_Annex"
        apiTable="tabelEachEquipment3_Annex"
      />
    </>
  );
};
