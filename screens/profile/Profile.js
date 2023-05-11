import React from "react";
import { View } from "react-native";
import { Layout, Text, TopNav, Button } from "react-native-rapi-ui";

export default function ({ navigation }) {
  return (
    <Layout>
      <TopNav middleContent="Profile" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          text="Mark your Tag"
          onPress={() => navigation.navigate("TagAttach")}
        />
      </View>
    </Layout>
  );
}
