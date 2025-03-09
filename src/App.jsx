import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import NotFoundPage from "./pages/404/NotFoundPage";
import { DashboardOperator } from "./pages/dashboard/operator";
import InputSetting from "./pages/input-setting";
import Layout from "./share-components/MenuDate";
import { DashboardManagement } from "./pages/dashboard-new-concept/management";
import { Emission } from "./pages/emission";
import { Cost } from "./pages/cost";
import { Pln } from "./pages/pln";
import { SolarPv } from "./pages/solar-pv";
import { SummaryAllFloors } from "./pages/summary-all-floors";
import { SummaryAllEquipments } from "./pages/summary-all-equipment";
import { FirtsFloor } from "./pages/detail-each-floor/1st-floor";
import { Chiller } from "./pages/detail-each-equipment/chiller";
import { Lampu } from "./pages/detail-each-equipment/lampu";
import { Socket } from "./pages/detail-each-equipment/socket";
import { Ahu } from "./pages/detail-each-equipment/ahu";
import { Lift } from "./pages/detail-each-equipment/lift";
import { Mezzanine } from "./pages/detail-each-equipment/mezzanine";
import { AcServer } from "./pages/detail-each-equipment/ac-server";
import { Chwp } from "./pages/detail-each-equipment/chwp";
import { MotorPump } from "./pages/detail-each-equipment/motor-pump";
import { PressFan } from "./pages/detail-each-equipment/press-fan";
import { Pabx } from "./pages/detail-each-equipment/pabx";
import { Eksternal } from "./pages/detail-each-equipment/eksternal";
import { Floor2 } from "./pages/detail-each-floor/lt-2";
import { Floor3 } from "./pages/detail-each-floor/lt-3";
import { Floor4 } from "./pages/detail-each-floor/lt-4";
import { Floor5 } from "./pages/detail-each-floor/lt-5";
import { Floor6 } from "./pages/detail-each-floor/lt-6";
import { Floor7 } from "./pages/detail-each-floor/lt-7";
import { LtAnnex1 } from "./pages/detail-each-floor/lt-1-annex";
import { Lt8 } from "./pages/detail-each-floor/lt-8";
import { LtAnnex2 } from "./pages/detail-each-floor/lt-2-annex";
import { LtAnnex3 } from "./pages/detail-each-floor/lt-3-annex";
import { LtEksternal } from "./pages/detail-each-floor/lt-eksternal";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard-management" />} />
          <Route path="/" element={<Layout />}>
            <Route
              path="dashboard-management"
              element={<DashboardManagement />}
            />
            <Route path="dashboard-operator" element={<DashboardOperator />} />
            <Route path="input-setting" element={<InputSetting />} />
            <Route path="emission" element={<Emission />} />
            <Route path="cost" element={<Cost />} />
            <Route path="pln" element={<Pln />} />
            <Route path="solar-pv" element={<SolarPv />} />
            <Route path="summary-all-floors" element={<SummaryAllFloors />} />
            <Route
              path="summary-all-equipment"
              element={<SummaryAllEquipments />}
            />

            <Route path="detail-each-equipment/chiller" element={<Chiller />} />
            <Route path="detail-each-equipment/lampu" element={<Lampu />} />
            <Route path="detail-each-equipment/socket" element={<Socket />} />
            <Route path="detail-each-equipment/ahu" element={<Ahu />} />
            <Route path="detail-each-equipment/lift" element={<Lift />} />
            <Route
              path="detail-each-equipment/mezzanine"
              element={<Mezzanine />}
            />
            <Route
              path="detail-each-equipment/ac-server"
              element={<AcServer />}
            />
            <Route path="detail-each-equipment/chwp" element={<Chwp />} />
            <Route
              path="detail-each-equipment/motor-pump"
              element={<MotorPump />}
            />
            <Route
              path="detail-each-equipment/press-fan"
              element={<PressFan />}
            />
            <Route path="detail-each-equipment/pabx" element={<Pabx />} />
            <Route
              path="detail-each-equipment/eksternal"
              element={<Eksternal />}
            />

            <Route
              path="detail-each-floor/1st-floor"
              element={<FirtsFloor />}
            />
            <Route
              path="detail-each-floor/1st-floor-annex"
              element={<LtAnnex1 />}
            />
            <Route path="detail-each-floor/2nd-floor" element={<Floor2 />} />
            <Route
              path="detail-each-floor/2nd-floor-annex"
              element={<LtAnnex2 />}
            />
            <Route path="detail-each-floor/3rd-floor" element={<Floor3 />} />
            <Route
              path="detail-each-floor/3rd-floor-annex"
              element={<LtAnnex3 />}
            />
            <Route path="detail-each-floor/4th-floor" element={<Floor4 />} />
            <Route path="detail-each-floor/5th-floor" element={<Floor5 />} />
            <Route path="detail-each-floor/6th-floor" element={<Floor6 />} />
            <Route path="detail-each-floor/7th-floor" element={<Floor7 />} />
            <Route path="detail-each-floor/8th-floor" element={<Lt8 />} />
            <Route path="detail-each-floor/8th-floor" element={<Lt8 />} />
            <Route
              path="detail-each-floor/external"
              element={<LtEksternal />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
