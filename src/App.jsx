import Host from "./Host";
import Guest from "./Guest";
import { Tabs } from "antd";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        items={[
          { key: "host", label: "Host", children: <Host /> },
          { key: "guest", label: "Guest", children: <Guest /> },
        ]}
      />
    </div>
  );
}

export default App;
