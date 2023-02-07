import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

type Props = {
    id: string,
};

const UserView: React.FC<Props> = ({ id }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        roles: undefined,
        password: undefined,
        login: undefined,
        name: undefined
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://your-api.com/form/${id}`);
                const formData = await response.json();

                setData(formData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ padding: 16 }}>
            <Text>Name: {data.name}</Text>
            <Text>Login: {data.login}</Text>
            <Text>Password: {data.password}</Text>
            <Text>Roles: {data.roles}</Text>
        </View>
    );
};

export default UserView;
