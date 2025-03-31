import React from "react";
import { PaperProvider } from "react-native-paper";
import AppNavigation from "./src/navigation/AppNavigation";
import Toast from 'react-native-toast-message';
//import { toastConfig } from './toastConfig';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <AppNavigation />
      <Toast />
    </PaperProvider>
  );
};

export default App;
