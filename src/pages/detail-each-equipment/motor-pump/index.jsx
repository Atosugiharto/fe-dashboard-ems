import { ShareIndexComponent } from "../chiller/ShareIndexComponent";

export const MotorPump = () => {
  return (
    <>
      <ShareIndexComponent
        apiDaily={"chartDailyMotorPump"}
        apiMonthly={"chartMonthlyMotorPump"}
        apiHourly={"chartHourlyMotorPump"}
        apiTable={"tabelDataEquipmentMotorPump"}
        isMotorPump={true}
        menu={"Motor Pump"}
      />
    </>
  );
};
