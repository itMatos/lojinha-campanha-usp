import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

export default function ImageViewer({
    placeholderImageSource,
    selectedImage,
}: {
    placeholderImageSource: ImageSourcePropType;
    selectedImage: string;
}) {
    const imageSource: ImageSourcePropType = selectedImage ? ({ uri: selectedImage } as ImageSourcePropType) : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
