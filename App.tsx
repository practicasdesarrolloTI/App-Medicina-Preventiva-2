import React from "react";
import { PaperProvider } from "react-native-paper";
import AppNavigation from "./src/navigation/AppNavigation";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import CustomToast from './src/components/CustomToast';

const App: React.FC = () => {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
      <AppNavigation />
      <Toast
        position="top"
        visibilityTime={1500}
        autoHide={true}
        config={{
          success: (props) => <CustomToast {...{ ...props, text1: props.text1 || "Default success message" }} type="success" />,
          error: (props) => <CustomToast {...{ ...props, text1: props.text1 || "Default error message" }} type="error" />,
          info: (props) => <CustomToast {...{ ...props, text1: props.text1 || "Default info message" }} type="info" />,
        }}
      />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
