import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';

import {TMDB_IMAGE_URL} from './constants';

export type ItemProp = {
    id: string;
};

export default function Item(props: ItemProp) {
    const [loading, setLoading] = useState(true);
    return (
        <>
            <Image
                style={styles.image}
                onLoadEnd={() => {
                    setLoading(false);
                }}
                source={{
                    width: 250 * 1.25,
                    height: 375 * 1.25,
                    uri: `${TMDB_IMAGE_URL}${props.id}`,
                }}
            />
            {loading && <ActivityIndicator animating={loading} />}
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        marginTop: '5%',
    },
});
