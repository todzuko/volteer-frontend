import {ActionSheet} from "react-native-ui-lib";

export const OptionSheet = () => {
    return (
        <ActionSheet title={'Title'} message={'Message goes here'} cancelButtonIndex={3} destructiveButtonIndex={0}
                     options={[{label: '121212', onPress:()=>{}}, {label: '2223323', onPress:()=>{}}, {
                         label: 'Cancel',
                         onPress: () => console.log('cancel')
                     }]} visible/>
    )
}