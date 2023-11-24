import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GroupCard from "../../components/GroupCard";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigationTypes";
import styles from "./groupScreen.styles";
import { size } from "../../utils/helpers";

type Props = {};

type GroupsScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "AddGroupScreen"
>;

const GroupsScreen = (props: Props) => {
  const [groups, setGroups] = useState<
    FirebaseFirestoreTypes.DocumentData[] | []
  >([]);
  const navigation = useNavigation<GroupsScreenNavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      let data: FirebaseFirestoreTypes.DocumentData[] = [];

      const subscriber = firestore()
        .collection("TodoGroups")
        .onSnapshot(
          (collectionSnapshot) => {
            collectionSnapshot.forEach((group) => {
              data.push({ ...group.data(), groupId: group.id });
            });
            setGroups(data);
            console.log(groups);
          },
          () => {}
        );

      return () => subscriber();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Lists</Text>
          <Ionicons name={"person-circle"} size={size(11)} color={"grey"} />
        </View>
        {/* List container */}
        <View style={styles.list}>
          {groups.map((group, index) => {
            console.log(groups.length);
            return (
              <GroupCard
                key={group?.title + `${index}`}
                title={group?.title}
                groupId={group?.groupId}
                groupColor={group?.color}
                numberOfTodos={group?.todos?.length}
              />
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          backgroundColor: "turquoise",
          width: 64,
          height: 64,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        }}
        onPress={() => navigation.navigate("AddGroupScreen")}
      >
        <Ionicons name={"add"} size={40} color={"white"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GroupsScreen;
