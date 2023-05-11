import React from "react";
import { View, Button } from "react-native";
import { Layout, Text, TopNav, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { theme } = useTheme();
  return (
    <Layout>
      <TopNav
        leftContent={
          <Ionicons name="chevron-back" size={20} color={theme.black} />
        }
        leftAction={() => navigation.goBack()}
        middleContent="Forgot Password"
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>This is the FOrget Passowrd tab</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </Layout>
  );
}
