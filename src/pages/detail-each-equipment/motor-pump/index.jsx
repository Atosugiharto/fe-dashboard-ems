import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const MotorPump = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyMotorPump"}
        apiMonthly={"chartMonthlyMotorPump"}
        apiHourly={"chartHourlyMotorPump"}
        apiTable={"tabelDataEquipmentMotorPump"}
        isMotorPomp={true}
        menu={"Motor Pump"}
      />
    </>
  );
};
