import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icon } from "../icon";

interface PhotoThumbnailProps {
    uri: string;
    onDelete: () => void;
}

export const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({ uri, onDelete }) => {
    return (
        <View style={{ margin: 8, position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri }} style={{ width: 120, height: 120 }} />
                <TouchableOpacity style={{ position: 'absolute', top: -11, right: -6, zIndex: 111111 }} onPress={onDelete}>
                    <Icon name="x" size={25} color="#f6637e" onPress={onDelete} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
