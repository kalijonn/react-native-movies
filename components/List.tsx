import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    TouchableHighlight,
    Modal,
    Text,
} from 'react-native';

import Item from './Item';
import {TMDB_TRENDING, TMDB_API_KEY} from './constants';
import Movie from './Movie';

export default function List() {
    const [list, setList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({
        id: '1',
        poster_path: '1',
    });

    useEffect(() => {
        fetch(`${TMDB_TRENDING}${TMDB_API_KEY}`)
            .then((res) => res.json())
            .then((json) => {
                setList(json.results);
                setIsLoaded(true);
            })
            .catch((e) => {
                console.log(e);
            });
    });

    function handlePress(item: any) {
        setModal(true);
        setSelectedMovie({id: item.id, poster_path: item.poster_path});
    }

    const renderItem = ({item}: any) => {
        return (
            <>
                <Modal
                    animationType="slide"
                    onRequestClose={() => setModal(false)}
                    transparent={false}
                    visible={modal}>
                    <Movie
                        id={selectedMovie.id}
                        poster_path={selectedMovie.poster_path}
                    />
                    <TouchableHighlight
                        onPress={() => {
                            setModal(false);
                        }}>
                        <Text style={styles.close}>X</Text>
                    </TouchableHighlight>
                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        handlePress(item);
                    }}>
                    <Item id={item.poster_path} />
                </TouchableHighlight>
            </>
        );
    };

    if (isLoaded) {
        return (
            <SafeAreaView style={styles.View}>
                <Text style={styles.Text}>Trending Now</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.poster_path}
                />
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.View}>
            <ActivityIndicator size="large" color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    View: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    Text: {
        color: 'white',
        backgroundColor: 'black',
        fontSize: 25,
        fontFamily: 'Futura',
        fontWeight: 'bold',
    },
    close: {
        textAlign: 'center',
        paddingBottom: '20%',
        backgroundColor: 'black',
        color: 'white',
    },
});
