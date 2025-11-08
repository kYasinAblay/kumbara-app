import { Image } from 'expo-image';
import { Platform, StyleSheet,Text,View} from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import MoneyBoxListScreen from '@/src/screens/MoneyBoxListScreen';

export default function HomeScreen() {
  return (
   <View style={{ flex: 1, padding: 10 ,paddingTop:50}}>
        <MoneyBoxListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  }
});
