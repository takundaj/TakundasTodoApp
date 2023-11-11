import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import GroupCard, { AddGroupCard } from "../components/GroupCard";

type Props = {};

const GroupsScreen = (props: Props) => {
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Lists</Text>
          <Image
            source={{
              uri: "https://gdurl.com/X6TbO",
            }}
            style={styles.profileImage}
          />
        </View>
        {/* List container */}
        <View style={styles.list}>
          {groups.map((group, index) =>
            index !== groups.indexOf(groups[groups.length - 1]) ? (
              <GroupCard key={group} />
            ) : (
              <AddGroupCard />
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  profileImage: { height: 50, width: 50, borderRadius: 25 },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
});

export default GroupsScreen;
