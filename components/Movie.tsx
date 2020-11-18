import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image} from 'react-native';

import {TMDB_IMAGE_URL, TMDB_MOVIE_URL, TMDB_API_KEY} from './constants';

export type MovieResponse = {
    original_title: string;
    overview: string;
    vote_average: number;
    vote_count: number;
};

export type MovieProp = {
    poster_path: string;
    id: string;
};

export default function Movie(props: MovieProp) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [movie, setMovie] = useState<MovieResponse>({
        original_title: 'placeholder',
        overview: 'placeholder',
        vote_average: 5,
        vote_count: 5,
    });

    useEffect(() => {
        fetch(`${TMDB_MOVIE_URL.replace('movie_id', props.id)}${TMDB_API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
                setMovie({
                    original_title: json.original_title,
                    overview: json.overview,
                    vote_count: json.vote_count,
                    vote_average: json.vote_average,
                });
                setIsLoaded(true);
            });
    }, [props.id]);

    if (isLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{
                            width: 100 * 1.25,
                            height: 150 * 1.25,
                            uri: `${TMDB_IMAGE_URL}${props.poster_path}`,
                        }}
                    />
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            {movie.original_title}
                        </Text>
                    </View>
                </View>
                <View style={styles.overview}>
                    <View style={styles.randv}>
                        <Text style={styles.randvtext}>
                            Rating: {movie.vote_average} {'\u2605'}
                        </Text>
                        <Text style={styles.randvtext}>
                            Votes: {movie.vote_count}
                        </Text>
                    </View>

                    <Text style={styles.text}>Overview: {movie.overview}</Text>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 50,
    },
    title: {
        width: 150,
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'Futura',
        color: 'orange',
        fontSize: 30,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    overview: {
        width: '70%',
    },
    randv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '10%',
    },
    randvtext: {
        color: 'yellow',
        fontSize: 27,
    },
});
