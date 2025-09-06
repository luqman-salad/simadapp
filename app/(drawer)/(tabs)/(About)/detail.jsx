import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

//Components
import Accreditation from '../../../../components/Accreditation';
import HistoryAwards from '../../../../components/HistoryAwards';
import LearnAboutSIMAD from '../../../../components/LearnAboutSIMAD';
import RectorsMessage from '../../../../components/RectorsMessage';
import SenateList from '../../../../components/SenateList';
import VisionPurpose from '../../../../components/VisionPurpose';
import useAboutStore from "../../../../store/aboutStore";

const pages = {
    '1': { component: LearnAboutSIMAD, title: 'Learn About SIMAD' },
    '2': { component: RectorsMessage, title: 'the Rector' },
    '3': { component: SenateList, title: 'the senate list' },
    '4': { component: VisionPurpose, title: 'Vission & Mission' },
    '5': { component: HistoryAwards, title: 'History & Awards' },
    '6': { component: Accreditation, title: 'Accreditation' },
};

export default function DynamicDetailsPage() {
    const {selectedAboutItem} = useAboutStore();
    const id = selectedAboutItem.id;
    const page = pages[id];
    const PageComponent = page?.component;

    return (
        <View style={styles.container}>
            {page ? <PageComponent /> : <Text>Page not found.</Text>}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});