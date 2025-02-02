import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import NotFoundPage from "./pages/404/NotFoundPage";
import { DashboardManagement } from "./pages/dashboard/management";
import { DashboardOperator } from "./pages/dashboard/operator";
import InputSetting from "./pages/input-setting";
import Layout from "./share-components/MenuDate";
import EqualizerBarChart from "./pages/percobaan/EqualizerBarChart";

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
            <Route path="equalizer" element={<EqualizerBarChart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
