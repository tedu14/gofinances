import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

type NavigationProps = {
  navigate: (route: string) => void;
  canGoBack: () => boolean;
  goBack: () => void;
  reset: (...args: unknown[]) => void;
};

export function useNavigate() {
  const navigation = useNavigation<NavigationProps>();

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Listagem" }] });
    }
  }, []);

  const handleNavigateTo = useCallback((routeName: string) => {
    navigation.navigate(routeName);
  }, []);

  return {
    handleGoBack,
    handleNavigateTo,
  };
}
