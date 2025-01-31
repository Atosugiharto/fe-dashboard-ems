import CurrentPln from "./CurrentPln"
import DailyKwhEveryEquipment from "./KwhEveryEquipment"
import KwhFloor from "./KwhFloor"
import KwhPerEquipment from "./KwhPerEquipment"
import KwhPerFloor from "./KwhPerFloor"
import VoltagePln from "./VoltagePln"

export const DashboardOperator = () => {
  return (
    <div className="flex flex-col gap-2 text-gray-300">
        <div className="md:flex md:flex-col bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300">
            <div className="w-full">
                <VoltagePln />
            </div>

            <div className="w-full">
                <CurrentPln />
            </div>
        </div>
        
        <div className="md:flex md:flex-col bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300">
            <div className="w-full">
                <KwhFloor />
            </div>

            <div className="w-full">
                <KwhPerFloor />
            </div>
        </div>
        
        <div className="md:flex md:flex-col bg-black bg-opacity-50 shadow-lg rounded-lg border border-gray-300">
            <div className="w-full">
                <DailyKwhEveryEquipment />
            </div>

            <div className="w-full">
                <KwhPerEquipment />
            </div>
        </div>

    </div>
  )
}
