import React from "react";
import { PaperProvider } from "react-native-paper";
import AppNavigation from "./src/navigation/AppNavigation";

const App: React.FC = () => {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
};

export default App;
