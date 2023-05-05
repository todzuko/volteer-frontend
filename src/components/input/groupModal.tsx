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
      <MapView style={styles.map} />

      <Button  onPress={handleAddButtonPress} label={'Add'}>
      </Button>
          <Picker
              value={selectedGroup}
              onChange={onPick}
              hideUnderline
              marginB-20
              placeholder="Select group"
          >
            {groups.map(group => (
                <Picker.Item label={group.name} value={group._id} key={group._id} />
            ))}
          </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

