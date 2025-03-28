// import React from "react";
// import { PaperProvider } from "react-native-paper";
// import AppNavigation from "./src/navigation/AppNavigation";

// const App: React.FC = () => {
//   return (
//     <PaperProvider>
//       <AppNavigation />
//     </PaperProvider>
//   );
// };

// export default App;

import React from "react";
import { Text, View } from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
} from "@expo-google-fonts/dm-sans";
import {
  Taviraj_400Regular,
} from "@expo-google-fonts/taviraj";
import AppNavigation from "./src/navigation/AppNavigation";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    Taviraj_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return <AppNavigation />;
}
