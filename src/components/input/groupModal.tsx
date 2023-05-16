import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { Button, Image, Picker } from 'react-native-ui-lib';
import Modal from 'react-native-modal';

export const GroupModal = ({data, onPick}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  let groups = data || [];

  const handleAddButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId);
    setIsModalVisible(false);
  };

  return (
      <View style={styles.container}>
        {/*<MapView style={styles.map} />*/}
        <Picker
            value={selectedGroup}
            onChange={handleGroupSelect} // Call the local function that updates the selected group and calls onPick
            style={{margin: 0, padding: 0, backgrounDolor: '#eeefee'}}
            placeholder="Select group"
        >
          {groups.length > 0 && groups.map(group => (
              <Picker.Item label={group.name} value={group._id} key={group._id} />
          ))}
        </Picker>
        <Button style={styles.addButton} onPress={handleAddButtonPress} label={'Add'}>
      </Button>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    marginHorizontal: 15,
  },
  map: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    top: 45,
    height: 40
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
  },
  modalTitle: {
  },
});

