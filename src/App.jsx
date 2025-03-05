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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
